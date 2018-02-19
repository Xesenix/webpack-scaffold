const path = require('path');
const pathExists = require('path-exists');
const webpack = require('webpack');

// TODO: find a better way to configure projectRoot
const projectRoot = path.resolve(__dirname, '../..');

/**
 * Handling page template.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Minify production build.
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/**
 * Add secret configuration options via .env file.
 */
const DotenvWebpackPlugin = require('dotenv-webpack');

/**
 * Clean up destinition directory.
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * Copy assets and fonts.
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Analyze project size.
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * Merge any additional project specific webpack configuration.
 */
const merge = require('webpack-merge');

/**
 * Preconfigured webpack configuration elements.
 */

const cssPluginFactory = require('./plugins/css');
const fontsRulesFactory = require('./rules/fonts');
const assetsRulesFactory = require('./rules/assets');
const babelRulesFactory = require('./rules/babel');
const stylesRulesFactory = require('./rules/styles');

const packageConfig = require('../../package.json');

const retrivePackageAppConfig = (key, defaultValue) => packageConfig.app && packageConfig.app[key] ? packageConfig.app[key] : defaultValue;

module.exports = (env) => {
	const isProd = !!env.prod;
	const isTest = !!env.test;
	const isDev = !!env.dev;
	const hmr = !!env.hmr;
	const analyze = !!env.analyze;

	const appConfig = {};

	appConfig.rootDir = retrivePackageAppConfig('rootDir', 'src');
	appConfig.outDir = retrivePackageAppConfig('outDir', 'dist');
	appConfig.main = retrivePackageAppConfig('main', [ './main.js' ]);
	appConfig.assets = retrivePackageAppConfig('assets', [ './assets' ]);
	appConfig.fonts = retrivePackageAppConfig('fonts', [ './fonts' ]);
	appConfig.styles = retrivePackageAppConfig('styles', [ './styles/styles.scss' ]);
	appConfig.vendor = retrivePackageAppConfig('vendor', []);
	appConfig.template = retrivePackageAppConfig('template', 'index.html');
	appConfig.templateData = retrivePackageAppConfig('templateData', {});
	appConfig.appWebpackPath = retrivePackageAppConfig('webpack', null);

	appConfig.rootPath = path.normalize(path.resolve(projectRoot, appConfig.rootDir));
	appConfig.outPath = path.normalize(path.resolve(projectRoot, appConfig.outDir));

	const extractCssPlugin = cssPluginFactory();
	const htmlPlugin = new HtmlWebpackPlugin({
		packageConfig,
		data: {
			title: `${packageConfig.name} - ${packageConfig.version}`,
			...appConfig.templateData
		},
		template: `!!ejs-loader!${appConfig.rootDir}/${appConfig.template}`,
		inject: true,
		minify: {
			removeComments: true,
			preserveLineBreaks: true
		},
		xhtml: false,
		mobile: true,
		showErrors: true,
	});

	const entry = {};

	['main', 'styles', 'vendor']
		.filter((key) => appConfig[key].length > 0)
		.forEach((key) => entry[key] = appConfig[key]);

	const webpackConfig = {
		entry,
		output: {
			path: appConfig.outPath,
			filename: '[name].boundle.js',
		},
		devServer: {
			contentBase: [
				appConfig.outPath, // assets needs project to be build before they load from that path
			],
			hot: hmr,
		},
		devtool: isProd ? 'none' : 'cheap-eval-source-map', // https://webpack.js.org/configuration/devtool/
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
			modules: [
				appConfig.rootPath,
				'node_modules',
			],
		},
		module: {
			rules: [
				...fontsRulesFactory(appConfig.rootPath),
				...assetsRulesFactory(appConfig.rootPath),
				...stylesRulesFactory(extractCssPlugin, isProd),
				...babelRulesFactory(),
			]
		},
		plugins: [
			isTest ? null : htmlPlugin,
			isTest ? null : extractCssPlugin,
			new webpack.LoaderOptionsPlugin({
				minimize: isProd,
				debug: !isProd,
				sourceMap: !isProd,
				options: {
					tslint: {
						emitErrors: true,
						failOnHint: true
					},
				},
			}),
			isTest ? null : new CopyWebpackPlugin([
					...appConfig.assets,
					...appConfig.fonts,
				]
				.filter(p => !!p)
				.filter(p => pathExists.sync(path.join(appConfig.rootDir, p)))
				.map(
					from => typeof from === 'string'
					? { from: path.join(appConfig.rootDir, from), to: path.join(appConfig.outPath, from) }
					: from
				),
				{
					debug: isProd ? 'warning' : 'info',
				}
			),
			isTest ? null : new CleanWebpackPlugin([ appConfig.outPath ]),
			new DotenvWebpackPlugin({ path: '.env', silent: true }),
			new webpack.EnvironmentPlugin({
				NODE_ENV: isProd ? 'production' : isTest ? 'test' : 'development',
			}),
			new webpack.DefinePlugin({
				'process.env.PRODUCTION': JSON.stringify(isProd),
				'process.env.DEVELOPMENT': JSON.stringify(isDev),
				'process.env.TEST': JSON.stringify(isTest),
				'process.env.PACKAGE': JSON.stringify(packageConfig),
				'process.env.APP': JSON.stringify(appConfig),
			}),
			analyze ? new BundleAnalyzerPlugin({
				analyzerMode: 'server',
				openAnalyzer: true,
				// statsFilename: path.join(appConfig.outPath, 'stats.json'),
				generateStatsFile: true,
			}) : null,
			isProd ? new UglifyJsPlugin() : null,
			// This plugin will cause the relative path of the module to be displayed when HMR is enabled. Suggested for use in development.
			// https://webpack.js.org/plugins/named-modules-plugin/
			isDev && hmr ? new webpack.NamedModulesPlugin() : null,
			isDev && hmr ? new webpack.HotModuleReplacementPlugin() : null,
			// Use the NoEmitOnErrorsPlugin to skip the emitting phase whenever there are errors while compiling.
			// This ensures that no assets are emitted that include errors. The emitted flag in the stats is false for all assets.
			new webpack.NoEmitOnErrorsPlugin(),
		].filter(p => !!p)
	};

	let appWebpack = () => {};
	if (appConfig.appWebpackPath) {
		appWebpack = require(appConfig.appWebpackPath);
	}

	return merge(webpackConfig, typeof appWebpack === 'function' ? appWebpack(env, webpackConfig, appConfig) : appWebpack);
};

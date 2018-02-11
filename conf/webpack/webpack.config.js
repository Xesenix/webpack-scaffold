const path = require('path');
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

const package = require('../../package.json');

const retrivePackageAppConfig = (key, defaultValue) => package.app && package.app[key] ? package.app[key] : defaultValue;

module.exports = (env) => {
	const isProd = !!env.prod;
	const isTest = !!env.test;
	const isDev = !!env.dev;

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
		package,
		data: {
			title: `${package.name} - ${package.version}`,
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
			hot: true,
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
			htmlPlugin,
			extractCssPlugin,
			new webpack.LoaderOptionsPlugin({
				minimize: isProd,
				debug: !isProd,
				sourceMap: !isProd,
				options: {
					tslint: {
						emitErrors: true,
						failOnHint: true
					}
				},
			}),
			new CopyWebpackPlugin([
					...appConfig.assets,
					...appConfig.fonts,
				]
				.filter(p => !!p)
				.map(
					from => typeof from === 'string'
					? { from: path.join(appConfig.rootDir, from), to: path.join(appConfig.outPath, from) }
					: from
				), {
					debug: 'info',
				}
			),
			new CleanWebpackPlugin([ appConfig.outPath ]),
			new DotenvWebpackPlugin({ path: '.env' }),
			new webpack.EnvironmentPlugin({
				NODE_ENV: isProd ? 'production' : isTest ? 'test' : 'development',
			}),
			new webpack.DefinePlugin({
				'process.env.PRODUCTION': JSON.stringify(isProd),
				'process.env.DEVELOPMENT': JSON.stringify(isDev),
				'process.env.TEST': JSON.stringify(isTest),
				'process.env.PACKAGE': JSON.stringify(package),
				'process.env.APP': JSON.stringify(appConfig),
			}),
			isProd ? new UglifyJsPlugin() : null,
			isDev ? new webpack.NamedModulesPlugin() : null,
			isDev ? new webpack.HotModuleReplacementPlugin() : null,
		].filter(p => !!p)
	};

	let appWebpack = () => {};
	if (appConfig.appWebpackPath) {
		appWebpack = require(appConfig.appWebpackPath);
	}

	return merge(webpackConfig, typeof appWebpack === 'function' ? appWebpack(env, webpackConfig, appConfig) : appWebpack);
};

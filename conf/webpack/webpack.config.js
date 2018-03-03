const appConfig = require('../app/app.config');
const chalk = require('chalk');
const path = require('path');
const pathExists = require('path-exists');
const webpack = require('webpack');

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
 * https://survivejs.com/webpack/styling/eliminating-unused-css/#critical-path-rendering
 */
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");

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
const markdownRulesFactory = require('./rules/markdown');

const scaffoldConfig = () => {
	const isProd = process.env.ENV === 'production';
	const isTest = process.env.ENV === 'test';
	const isDev = process.env.ENV === 'development';
	const hmr = !!process.env.HMR;
	const analyze = !!process.env.ANALYZE;
	const app = appConfig.getEnvApp();
	const { projectRoot, packageConfig } = appConfig;
	const config = appConfig.getAppConfig(app);

	console.log(`Project root path: ${chalk.blue(appConfig.projectRoot)}`);
	console.log(`Running app name: ${chalk.blue(app)}`);
	console.log(`Env isProd: ${chalk.blue(isProd)}`);
	console.log(`Env isTest: ${chalk.blue(isTest)}`);
	console.log(`Env isDev: ${chalk.blue(isDev)}`);
	console.log(`Analyze: ${chalk.blue(analyze)}`);
	console.log('App config:', config);

	const extractCssPlugin = cssPluginFactory();

	// order of chunks is important for style overriding (more specific styles source later)
	const chunks = ['vendor', 'styles', 'main'];

	// https://github.com/jantimon/html-webpack-plugin#configuration
	const htmlPlugin = new HtmlWebpackPlugin({
		packageConfig,
		data: {
			title: `${packageConfig.name} - ${packageConfig.version}`,
			...config.templateData
		},
		template: `!!ejs-loader!${config.rootDir}/${config.template}`,
		inject: true,
		// order of injected style tags
		chunksSortMode: (a, b) => chunks.indexOf(a.names[0]) > chunks.indexOf(b.names[0]) ? 1 : -1,
		minify: {
			removeComments: true,
			preserveLineBreaks: true
		},
		xhtml: false,
		mobile: true,
		showErrors: true,
	});

	const htmlCriticalPlugin = new HtmlCriticalPlugin({
		base: config.outPath,
		src: 'index.html',
		dest: 'index.html',
		inline: true,
		minify: true,
		extract: true,
		width: 375,
		height: 565,
		penthouse: {
			blockJSRequests: false,
		}
	});

	const entry = {};

	// compose entry points
	chunks
		.filter((key) => config[key].length > 0)
		.forEach((key) => entry[key] = config[key]);

	const externals = {
	//	'react': './node_modules/react/umd/react.production.min.js',
	//	'react-dom': './node_modules/react-dom/umd/react-dom.production.min.js',
	};

	const webpackConfig = {
		entry,
		externals,
		output: {
			path: config.outPath,
			filename: '[name].boundle.js',
		},
		devServer: {
			contentBase: [
				config.outPath, // assets needs project to be build before they load from that path
			],
			hot: hmr,
		},
		devtool: isProd ? 'none' : 'cheap-eval-source-map', // https://webpack.js.org/configuration/devtool/
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
			modules: [
				config.rootPath,
				'node_modules',
			],
		},
		module: {
			rules: [
				...fontsRulesFactory(config.rootPath),
				...assetsRulesFactory(config.rootPath),
				...stylesRulesFactory(extractCssPlugin, isProd, config.stylesIncludePaths),
				...babelRulesFactory(),
				...markdownRulesFactory(),
			]
		},
		plugins: [
			isTest ? null : htmlPlugin,
			isTest ? null : extractCssPlugin,
			!isProd ? null : htmlCriticalPlugin,
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
					...config.assets,
					...config.fonts,
				]
				.filter(p => !!p)
				.filter(p => pathExists.sync(path.join(config.rootDir, p)))
				.map(
					from => typeof from === 'string'
					? { from: path.join(config.rootDir, from), to: path.join(config.outPath, from) }
					: from
				),
				{
					debug: isProd ? 'warning' : 'info',
				}
			),
			!isProd ? null : new CleanWebpackPlugin([ config.outPath ], { root: projectRoot, verbos: isDev }),
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
				// statsFilename: path.join(config.outPath, 'stats.json'),
				generateStatsFile: true,
			}) : null,
			isProd ? new UglifyJsPlugin() : null,
			// This plugin will cause the relative path of the module to be displayed when HMR is enabled. Suggested for use in development.
			// https://webpack.js.org/plugins/named-modules-plugin/
			isDev && hmr ? new webpack.NamedModulesPlugin() : null,
			isDev && hmr ? new webpack.HotModuleReplacementPlugin() : null,
			// Use the NoEmitOnErrorsPlugin to skip the emitting phase whenever there are errors while compiling.
			// This ensures that no assets are emitted that include errors. The emitted flag in the stats is false for all assets.
			isTest ? null : new webpack.NoEmitOnErrorsPlugin(),
			isTest ? null : new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				minChunks: ({ resource }) => /node_modules/.test(resource),
			}),
		].filter(p => !!p)
	};

	return webpackConfig;
};

module.exports = {
	scaffoldConfig,
}

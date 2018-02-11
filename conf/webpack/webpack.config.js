const path = require('path');
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
 * Merge any additional project specific webpack configuration.
 */
const merge = require('webpack-merge');

/**
 * Preconfigured webpack configuration elements.
 */

const cssPluginFactory = require('./plugins/css');
const fontsRulesFactory = require('./rules/fonts');
const assetsRulesFactory = require('./rules/assets');
const stylesRulesFactory = require('./rules/styles');

const package = require('../../package.json');

module.exports = (env) => {
	const isProd = !!env.prod;
	const isTest = !!env.test;
	const isDev = !!env.dev;

	const appConfig = {};
	appConfig.rootDir = package.app && package.app.rootDir ? package.app.rootDir : 'src';
	appConfig.outDir = package.app && package.app.outDir ? package.app.outDir : 'dist';
	appConfig.rootPath = path.normalize(path.resolve(__dirname + '/../..', appConfig.rootDir));
	appConfig.outPath = path.normalize(path.resolve(__dirname + '/../..', appConfig.outDir));
	appConfig.main = (package.app && package.app.main ? package.app.main : ['.main.js']).map(p => path.normalize(path.resolve(appConfig.rootPath, p)));
	appConfig.assets = (package.app && package.app.assets ? package.app.assets : []).map(p => path.normalize(path.resolve(appConfig.rootPath, p)));
	appConfig.styles = (package.app && package.app.styles ? package.app.styles : []).map(p => path.normalize(path.resolve(appConfig.rootPath, p)));
	appConfig.template = package.app && package.app.template || '';
	appConfig.templateData = package.app && package.app.templateData || {};
	appConfig.appWebpackPath = package.app && package.app.webpack || null;

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

	const webpackConfig = {
		entry: [
			...appConfig.main,
			...appConfig.assets,
			...appConfig.styles,
		],
		output: {
			path: appConfig.outPath,
			filename: '[name].boundle.js',
		},
		devServer: {
			contentBase: [ appConfig.outPath ], // assets needs project to be build before they load
			hot: true,
		},
		module: {
			rules: [
				...fontsRulesFactory(appConfig.rootPath),
				...assetsRulesFactory(appConfig.rootPath),
				...stylesRulesFactory(extractCssPlugin),
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
			new CleanWebpackPlugin([ appConfig.outDir ]),
			new DotenvWebpackPlugin({ path: '.env' }),
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

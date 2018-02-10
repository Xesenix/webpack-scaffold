const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const cssPluginFactory = require('./webpack/plugins/css');
const fontsRulesFactory = require('./webpack/rules/fonts');
const imagesRulesFactory = require('./webpack/rules/images');
const stylesRulesFactory = require('./webpack/rules/styles');

const styles = require('./styles.json');
const assets = require('./assets.json');

const package = require('../package.json');

module.exports = (env) => {
	const isProd = !!env.prod;
	const isTest = !!env.test;
	const isDev = !!env.dev;

	const extractCssPlugin = cssPluginFactory({
		// disable: !isProd
	});
	const htmlPlugin = new HtmlWebpackPlugin({
		title: `${package.name} - ${package.version}`,
		inject: true,
		template: '!!ejs-loader!src/index.html',
		minify: {
			removeComments: true,
			preserveLineBreaks: true
		},
		xhtml: false,
		mobile: true,
		showErrors: true
	});

	return {
		entry: ['./src/main.js', ...styles, ...assets],
		output: {
			path: path.resolve(__dirname, '../dist'),
			filename: '[name].boundle.js',
			// publicPath: path.resolve(__dirname, '../dist/'),
		},
		module: {
			rules: [
				...stylesRulesFactory(extractCssPlugin),
				...imagesRulesFactory(path.resolve(__dirname, '../src')),
				...fontsRulesFactory(),
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
			isProd ? new UglifyJsPlugin() : null,
		].filter(p => !!p)
	};
};

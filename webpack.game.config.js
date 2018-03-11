const webpackBase = require('webpack');
const { webpack } = require('xes-webpack-core');

/**
 * Copy assets and fonts.
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (config) => {
	config.module.rules.push(...webpack.loaders.shaderRulesFactory());

	if (process.env.ENV === 'test') {
		config.plugins.push(new webpackBase.DefinePlugin({
			// required by Phaser 3
			'WEBGL_RENDERER': JSON.stringify(false),
			'CANVAS_RENDERER': JSON.stringify(true),
		}));
		// bundle Phaser 3 separately
		/*config.plugins.push(new webpackBase.optimize.CommonsChunkPlugin({
			name: 'phaser',
			minChunks: ({ resource }) => /phaser/.test(resource),
		}));*/
	} else {

		config.externals = {
			...config.externals,
			phaser: 'Phaser',
		}

		config.plugins.push(new CopyWebpackPlugin([
			{
				from: './node_modules/phaser/dist/phaser.min.js',
				to: 'phaser.min.js',
			}
		]));
	}

	return config;
}

// const webpack = require('webpack');
const { shaderRulesFactory } = require('xes-webpack-core');

/**
 * Copy assets and fonts.
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (config) => {
	config.module.rules.push(...shaderRulesFactory());
	/*config.plugins.push(new webpack.DefinePlugin({
		// required by Phaser 3
		'WEBGL_RENDERER': JSON.stringify(false),
		'CANVAS_RENDERER': JSON.stringify(true),
	}));*/
	// bundle Phaser 3 seperatly
	/*config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
		name: 'phaser',
		minChunks: ({ resource }) => /phaser/.test(resource),
	}));*/

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

	return config;
}

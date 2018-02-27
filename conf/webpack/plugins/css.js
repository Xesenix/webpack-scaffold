const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (config) => new ExtractTextPlugin({
	filename: 'css/[name].css',
	...config
});

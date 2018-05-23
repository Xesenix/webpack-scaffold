const { karma } = require('xes-webpack-core');

const webpack = require('./webpack.config.js')();

module.exports = function(config) {
	config.set(karma.configure(webpack));
}

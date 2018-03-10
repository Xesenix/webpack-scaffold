const path = require('path');
const webpack =  require('./webpack.config.js')();
const { karmaConfigurator } = require('xes-webpack-core');

module.exports = function(config) {
	karmaConfigurator(config, webpack);
}

require('karma-jasmine-html-reporter');
const chalk = require('chalk');
const { karma } = require('xes-webpack-core');

const webpack = require('./webpack.config.js')();

module.exports = function(config) {
	console.log(chalk.bold.yellow('Starting KARMA...'))
	config.set(karma.configure(webpack));
}

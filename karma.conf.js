const path = require('path');
const webpack =  require('./webpack.config.js')();
const karmaConfig = require('./conf/karma/karma.config.js');

module.exports = function(config) {
	karmaConfig(config, webpack);
}

const path = require('path');
const webpack =  require('./webpack.config.js')({ test: true, app: process.env.APP });
const karmaConfig = require('./conf/karma/karma.config.js');

module.exports = function(config) {
	karmaConfig(config, webpack);
}

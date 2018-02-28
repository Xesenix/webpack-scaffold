const path = require('path');
const webpackConfig = require('./conf/webpack/webpack.config.js');

module.exports = () => {
	return webpackConfig.scaffoldConfig();
}

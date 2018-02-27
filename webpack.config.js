const path = require('path');
const webpackConfig = require('./conf/webpack/webpack.config.js');

module.exports = (env) => {
	return webpackConfig.scaffoldConfig(env);
}

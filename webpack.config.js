const path = require('path');
const fs = require('fs');

const webpackConfig = require('./conf/webpack/webpack.config.js');

const { getEnvApp } = require('./conf/app/app.config');
const app = getEnvApp();
const appWebpack = `./webpack.${app}.config.js`;

if (fs.existsSync(appWebpack)) {
	module.exports = () => require(appWebpack)(webpackConfig.scaffoldConfig());
} else {
	module.exports = () => webpackConfig.scaffoldConfig();
}

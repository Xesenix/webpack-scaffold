const path = require('path');
const fs = require('fs');
const { application, webpack } = require('xes-webpack-core');

const app = application.getEnvApp();
const appWebpack = `./webpack.${app}.config.js`;

if (fs.existsSync(appWebpack)) {
	module.exports = (env) => require(appWebpack)(webpack.webpackConfigFactory());
} else {
	module.exports = (env) => webpack.webpackConfigFactory();
}

const path = require('path');
const fs = require('fs');

const { getEnvApp, scaffoldConfig } = require('xes-webpack-core');
const app = getEnvApp();
const appWebpack = `./webpack.${app}.config.js`;

if (fs.existsSync(appWebpack)) {
	module.exports = (env) => require(appWebpack)(scaffoldConfig(env));
} else {
	module.exports = (env) => scaffoldConfig(env);
}

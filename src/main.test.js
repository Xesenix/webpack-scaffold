/**
 * We need to load all test files to be included in karma. And all others to generate test coverage.
 * https://github.com/webpack-contrib/karma-webpack#alternative-usage
 */
const context = require.context('.', true, /\.(t|j)sx?$/);
context.keys().forEach(context);

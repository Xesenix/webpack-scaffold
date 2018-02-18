const path = require('path');
const webpack = require('./conf/webpack/webpack.config.js')({ test: true });

webpack.devtool = 'inline-source-map';
webpack.module.rules.push({
	test: /\.(j|t)sx?$/,
	use: {
		loader: 'istanbul-instrumenter-loader',
		options: { esModules: true },
	},
	include: path.resolve('./src'),
	exclude: /\.spec\.(j|t)sx?$/,
	enforce: 'post', // important to apply after its ready
});

// Karma configuration
// Generated on Tue Feb 13 2018 21:50:36 GMT+0100 (Środkowoeuropejski czas stand.)

module.exports = function(config) {
	const options = {

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine', 'mocha'],


		// list of files / patterns to load in the browser
		files: [
			'./src/main.test.js'
		],


		// list of files / patterns to exclude
		exclude: [
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			// Alternative usage one entry point https://github.com/webpack-contrib/karma-webpack#alternative-usage
			'./src/main.test.js': ['webpack', 'sourcemap']
		},

		webpack,

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: [
			'progress',
			'kjhtml',
			'coverage',
		],

		coverageReporter: {
			type: 'lcov',
			dir: 'coverage/',
		},


		coverageIstanbulReporter: {
			reports: [ 'text-summary' ],
			fixWebpackSourcePaths: true
		},


		client: {
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		// logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],


		// fix typescript serving video/mp2t mime type
		mime: {
			'text/x-typescript': ['ts','tsx']
		},


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity
	}

	if (process.env.TRAVIS) {
		options.customLaunchers = {
			'Chrome_travis_ci': {
				base: 'Chrome',
				flags: ['--no-sandbox'],
			},
		};
		options.browsers = ['Chrome_travis_ci'];
	}

	config.set(options);
}

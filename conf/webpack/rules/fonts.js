module.exports = () => [
	// handle fonts
	// breaks svg in css do not do that
	/* {
		test: /\.svg$/,
		loader: 'svg-inline-loader',
		exclude: /node_modules/
	},*/
	{
		test: /\.(eot|svg|ttf|woff|woff2)$/,
		use: [{
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
				outputPath: '/fonts/'
			}
		}]
	},
];

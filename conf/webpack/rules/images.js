module.exports = (srcRoot) => [
	{
		test: /\.(png|jpg|gif)$/,
		use: [{
			loader: 'file-loader',
			options: {
				name: '[path][name].[ext]',
				context: srcRoot, // root for path
				outputPath: '/',
			}
		}]
	},
];

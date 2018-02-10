const path = require('path');

module.exports = (srcRoot) => {
	const assetPath = path.normalize(srcRoot + '/assets/');
	const fontsPath = path.normalize(srcRoot + '/fonts/');

	return [
		// handle fonts
		// breaks svg in css do not do that
		/* {
			test: /\.svg$/,
			loader: 'svg-inline-loader',
			exclude: /node_modules/
		},*/
		{
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			exclude: (p) => path.normalize(p).startsWith(assetPath),
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					context: fontsPath, // root path for fonts
					outputPath: '/fonts/'
				}
			}]
		},
	]
};

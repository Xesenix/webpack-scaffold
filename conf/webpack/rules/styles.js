module.exports = (extractCssPlugin, isProd) => [
	{
		test: /\.s?css$/,
		use: isProd ? extractCssPlugin.extract({
			fallback: 'style-loader',
			use: [
				{ loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
				{ loader: 'sass-loader', options: { sourceMap: true } },
			]
		}) : [
			{ loader: 'style-loader', options: { sourceMap: true } }, // required for HMR
			{ loader: 'css-loader', options: { sourceMap: true } },
			{ loader: 'sass-loader', options: { sourceMap: true } },
		]
	}
];

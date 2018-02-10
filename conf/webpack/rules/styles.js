module.exports = (extractCssPlugin) => [
	{
		test: /\.s?css$/,
		use: extractCssPlugin.extract({
			fallback: 'style-loader',
			use: [
				// { loader: 'style-loader', options: { sourceMap: true } },
				{ loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
				// 'resolve-url-loader',
				{ loader: 'sass-loader', options: { sourceMap: true } },
			]
		})
	}
];

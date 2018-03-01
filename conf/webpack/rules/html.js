module.exports = () => {
	return [
		{
			test: /\.html?$/,
			use: [{
				loader: 'html-loader',
			}]
		}
	];
}

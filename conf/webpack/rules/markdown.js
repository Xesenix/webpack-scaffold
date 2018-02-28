module.exports = () => {
	return [
		{
			test: /\.md$/,
			use: [{
				loader: 'html-loader',
			}, {
				loader: 'markdown-loader',
			}]
		}
	];
}

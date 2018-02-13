module.exports = () => {
	return [
		{
			test: /\.(t|j)sx?$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
			}
		}
	];
}

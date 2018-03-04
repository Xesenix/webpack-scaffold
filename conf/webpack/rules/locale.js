module.exports = () => {
	return [
		{
			test: /\.po$/,
			exclude: /(node_modules|bower_components)/,
			use: [
				{ loader: "json-loader" },
				{ loader: "po-gettext-loader" },
			],
		}
	];
}

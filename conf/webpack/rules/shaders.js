module.exports = () => [
	{ test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', },
	{ test: /\.(glsl|frag|vert)$/, loader: 'glslify', }
]

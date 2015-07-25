var path = require('path');

module.exports = {
	devServer: {
		colors: true,
		contentBase: './build',
		hot: true,
		progress: true
	},
	devtool: 'source-map',
	entry: './src/client/main.js',
	externals: {
		react: 'React',
		'rx-lite': 'Rx',
		'socket.io-client': 'io'
	},
	module: {
		loaders: [
			{
				test: /\.js(x)?$/,
				include: [
					path.resolve(__dirname, 'src', 'client')
				],
				loader: 'babel'
			}
		]
	},
	output: {
		path: './build',
		filename: 'bundle.js'
	}
};

var ExtractTextPlugin = require('extract-text-webpack-plugin'),
	path = require('path'),
	webpack = require('webpack');

module.exports = {
	devServer: {
		colors: true,
		contentBase: './build',
		hot: true,
		progress: true
	},
	devtool: 'source-map',
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8080',
		'webpack/hot/only-dev-server',
		'./src/client/main.js'
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, 'src', 'client')
				],
				loaders: ['react-hot', 'babel?optional[]=runtime&stage=2']
			},
			{
				test: /\.json?$/,
				include: [
					path.resolve(__dirname, 'src', 'client')
				],
				loader: 'json'
			},
			{
				test: /\.css$/,
				include: [
					path.resolve(__dirname, 'src', 'client')
				],
				loader: ExtractTextPlugin.extract('css?sourceMap!cssnext')
			}
		]
	},
	externals: {
		'socket.io-client': 'io'
	},
	cssnext: {
		browsers: 'last 2 versions'
	},
	plugins: [
		new ExtractTextPlugin('bundle.css'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	output: {
		path: './build',
		filename: 'bundle.js'
	}
};

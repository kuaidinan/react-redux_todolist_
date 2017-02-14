var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
		path.join(__dirname,'/app/index'),
		'webpack-hot-middleware/client?reload=true'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node-module/,
				include: __dirname
			},
			{
				test:/\.css$/,
				loaders:['style-loader','css-loader']
			},
			{
				test:/\.scss$/,
				loaders:['style-loader','css-loader','sass-loader']
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};
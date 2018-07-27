const path = require('path');
const glob = require('globby');
const webpack = require('webpack'); // to access built-in plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: {
		"portal": [
			path.resolve(__dirname, 'source-bundle/js/global.js'),
			path.resolve(__dirname, 'source-bundle/style.scss')
		],
		"styleguide": path.resolve(__dirname, 'source-bundle/styleguide/styleguide.scss')
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name]-[chunkhash].js',
		path: path.resolve(__dirname, 'public/bundle'),
		publicPath: '/bundle/',
		sourceMapFilename: '[file]-[chunkhash].map'
	},
	externals: {
		jquery: 'jQuery'
	},
	resolve: {
		modules: [
			path.resolve(__dirname, 'source-bundle/js/modules'),
			path.resolve(__dirname, 'node_modules')
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new UglifyJsPlugin({
				test: /\.js($|\?)/i,
				sourceMap: true,
				cache: true
			})
		],
		splitChunks: {
			chunks: 'all'
		}
	},
	plugins: [
		new CleanWebpackPlugin(['export/bundle', 'public/bundle']),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css",
			chunkFilename: "[contenthash].css"
		}),
		new webpack.ProvidePlugin(
			{
				$: 'jquery',
				jQuery: 'jquery'
			}
		)
	],
	module: {
		// @see https://github.com/mapbox/mapbox-gl-js/issues/4359#issuecomment-303880888
		noParse: /(mapbox-gl)\.js$/,
		rules: [
			{
				test: /\.s?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader",
						options: {
							minimize: true,
							sourceMap: true
						}
					},
					{
						loader: "resolve-url-loader"
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(woff2?|ttf|eot|svg|png|gif|jpg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							includePaths: [
								path.resolve(__dirname, "source/"),
								path.resolve(__dirname, "node_modules/")
							]
						}
					}
				]
			}
		]
	}
};


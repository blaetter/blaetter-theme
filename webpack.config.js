const path = require('path');
const glob = require('globby');
const webpack = require('webpack'); // to access built-in plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	entry: {
		"palm": [
			path.resolve(__dirname, 'source-bundle/js/global.js'),
			path.resolve(__dirname, 'source-bundle/style.scss')
		],
		"styleguide": path.resolve(__dirname, 'source-bundle/styleguide/styleguide.scss')
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name]-[chunkhash].js',
		path: path.resolve(__dirname, 'public/themes/contrib/palm/bundle/'),
		publicPath: '/themes/contrib/palm/bundle/',
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
			}),
			new OptimizeCssAssetsPlugin({})
		],
		splitChunks: {
			chunks: 'all'
		}
	},
	plugins: [
		new CleanWebpackPlugin(['export/bundle', 'public/themes/contrib/palm/bundle']),
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
		//noParse: /(mapbox-gl)\.js$/,
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
							sourceMap: true
						}
					},
					// {
					// 	loader: "resolve-url-loader",
					// 	options: {
					// 		engine: 'rework',
					// 		debug: true
					// 	}
					// },
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			},
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/,
                    /source/
                ],
                loader: 'eslint-loader',
                options: {
                    // eslint options (if necessary)
                }
            },
            {
                test: /\.js$/, // Check for all js files
                exclude: [
                    /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
                    /source-bundle/
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
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


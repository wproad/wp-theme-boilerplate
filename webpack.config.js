const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	mode: isProd ? 'production' : 'development',
	entry: {
		single: './assets/js/pages/single.js',
		home: './assets/js/pages/home.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist/js'),
		filename: '[name].min.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', {
								targets: '> 0.25%, not dead', // Modern browsers only
								useBuiltIns: 'usage',
								corejs: false // No polyfills needed for modern browsers
							}]
						]
					}
				}
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true,
						drop_debugger: true,
						pure_funcs: ['console.log'], // Remove console.logs
						passes: 2, // Multiple optimization passes
					},
					mangle: {
						safari10: true, // Better Safari compatibility
					},
					output: {
						comments: false,
						beautify: false,
					},
				},
				extractComments: false,
			})
		],
		splitChunks: false
	},
	devtool: isProd ? false : 'source-map',
	watchOptions: {
		ignored: /node_modules/,
	},
	performance: {
		hints: 'warning',
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	}
};



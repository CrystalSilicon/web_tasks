const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry:  __dirname + "/app/entry.js",
	output: {
		path: __dirname + "/build",
		filename: "main.js"
	},
	devtool: 'none',
	devServer: {
		contentBase: "./public",
		historyApiFallback: true,
		inline: true,
		hot: true
	},
	module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
					options: {
                        "presets": ["react", "env"],
						"env": {
							"development": {
								"plugins": [["react-transform", {
									"transforms": [{
										"transform": "react-transform-hmr",
										"imports": ["react"],
										"locals": ["module"]
									}]
								}]]
							}
						}
                    }
                },
                exclude: /node_modules/
            },
			{
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
						options: {
                            modules: true
						}
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            },{
				test: /\.scss$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, {
					loader: 'sass-loader'
				}]
			},{
				test:/\.json$/,
				loader:'json-loader'
			}
        ]
    },
    plugins: [
		new webpack.ProvidePlugin({
          "$": "jquery",
          "jQuery": "jquery",
          "window.jQuery": "jquery"
		}),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
		new webpack.HotModuleReplacementPlugin(),
    ]
}

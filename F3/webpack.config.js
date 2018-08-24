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
                    loader: "babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0",
					options: {
                        "presets": ["react", "env","es2015","stage-0"],
						"env": {
							"development": {
								"plugins": [
									["react-transform", {
										"transforms": [{
											"transform": "react-transform-hmr",
											"imports": ["react"],
											"locals": ["module"]
										}]	
									}],"transform-class-properties",
									["import", {
										"libraryName": "antd",
										"style": true
									}]
								]
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
				test: /\.less$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, {
					loader: 'less-loader'
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
		new webpack.HotModuleReplacementPlugin()
    ]
}

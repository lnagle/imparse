"use strict";

const webpack = require("webpack");

module.exports = {
    entry: {
        app: [
            "webpack/hot/dev-server",
            "./javascript/app.js"
        ]
    },
    output: {
        path: __dirname + "/public/built",
        filename: "bundle.js",
        publicPath: "http://localhost:8080/built/"
    },
    devServer: {
        contentBase: "./public",
        publicPath: "http://localhost:8080/built/"
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: [
                        "env",
                        "react"
                    ]
                }
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    },
    target: "electron",
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

var path = require("path");
var webpack = require("webpack");

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify("'development'")
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map"
        })
    ],
    entry: "./client/index.js",
    output: {
        path: path.join(__dirname, "client"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"]
                }
            }
        ]
    }
};

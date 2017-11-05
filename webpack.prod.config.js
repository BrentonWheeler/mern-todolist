var path = require("path");
var webpack = require("webpack");

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            "process.env.ENV": JSON.stringify("production")
        }),
        new webpack.DefinePlugin({
            "process.env.BASE_URL": JSON.stringify("")
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
            },
            {
                test: /\.sass$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    }
};

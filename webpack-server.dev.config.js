var path = require("path");
var webpack = require("webpack");

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            "process.env.BASE_URL": JSON.stringify("")
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
            },
            {
                test: /\.s?css$/,
                loaders: ["style-loader", "css-loader", "sass-loader"],
                include: path.join(__dirname, "client/styles")
            }
        ]
    }
};

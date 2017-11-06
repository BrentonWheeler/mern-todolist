var path = require("path");
var webpack = require("webpack");

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            "process.env.BASE_URL": JSON.stringify("")
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
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
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader?limit=100000"
            }
        ]
    }
};

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const config = {
    entry: { app: "./src/index.js" },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist"
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     loader: "babel-loader", // для fetch нужен polyfill
            //     exclude: "/node_modules"
            // },
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] }
        ]
    },
    devServer: {
        overlay: true
    },
    plugins: [new MiniCssExtractPlugin({ filename: "[name].css" })]
};

module.exports = config;

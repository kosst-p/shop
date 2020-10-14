const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebPackPlugin = require("copy-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, "./src"),
    dist: path.join(__dirname, "./dist"),
    assets: "assets/"
};

const config = {
    externals: {
        paths: PATHS.src
    },
    entry: { app: PATHS.src },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: "/"
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
    plugins: [
        new MiniCssExtractPlugin({ filename: `${PATHS.assets}css/[name].css` }),
        // new CopyWebPackPlugin({
        // patterns: [
        // {
        //     from: `${PATHS.src}/static/*`,
        //     to: `${PATHS.dist}`
        // }
        // {
        //     from: `${PATHS.src}/data.json`,
        //     to: `${PATHS.dist}`
        // }
        // ]
        // }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: "./index.html"
        })
    ]
};

module.exports = config;

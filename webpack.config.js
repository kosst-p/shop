const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const PATHS = {
    src: path.resolve(__dirname, "src"),
    dist: path.resolve(__dirname, "dist"),
    assets: "assets/"
};

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = ext => {
    return isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
};

const optimization = () => {
    const conf = {
        splitChunks: {
            chunks: "all"
        }
    };

    if (conf) {
        conf.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin()
        ];
    }
    return conf;
};

const config = {
    module: "development",
    entry: {
        main: ["whatwg-fetch", "@babel/polyfill", PATHS.src]
    },
    output: {
        filename: `${PATHS.assets}js/${filename("js")}`,
        path: PATHS.dist
    },
    devServer: {
        port: 8081
        // hot: isDev
    },
    optimization: optimization(),
    plugins: [
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/assets/static/favicon.png`,
                    to: `${PATHS.assets}static/`
                },
                {
                    from: `${PATHS.src}/data.json`,
                    to: PATHS.dist
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/${filename("css")}`
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true
                        }
                    },
                    {
                        loader: "css-loader"
                        // --> для подключения CSS модулей <--
                        // options: {
                        //     modules: {
                        //         localIdentName: "[name]__[local]--[hash]"
                        //     }
                        // }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: {
                    loader: "babel-loader",
                    options: { presets: ["@babel/preset-env"] }
                },
                exclude: "/node_modules"
            }
        ]
    }
};

module.exports = config;

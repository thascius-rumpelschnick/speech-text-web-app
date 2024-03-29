/* eslint-disable no-undef,@typescript-eslint/no-var-requires,@typescript-eslint/no-unused-vars */
const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

const getEntry = (pageName) => `./tsx/pages/${pageName}/entry.tsx`;
const entry = {
    about: getEntry("about"),
    edit: getEntry("edit"),
    index: getEntry("index"),
    settings: getEntry("settings"),
    upload: getEntry("upload"),
};

const config = {
    entry,
    output: {
        path: path.resolve(__dirname, "static/dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            mimetype: "image/png"
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.svg$/,
                use: "file-loader"
            },
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new LodashModuleReplacementPlugin(),
        new MiniCssExtractPlugin(),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/)
    ],
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    resolve: {
        extensions: [
            ".tsx",
            ".ts",
            ".js"
        ]
    }
};

module.exports = config;
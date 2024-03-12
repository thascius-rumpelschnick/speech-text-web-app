/* eslint-disable no-undef,@typescript-eslint/no-var-requires,@typescript-eslint/no-unused-vars */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");

const config = merge(common, {
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            }),
        ],
    },
});

module.exports = config;
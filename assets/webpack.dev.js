/* eslint-disable no-undef,@typescript-eslint/no-var-requires,@typescript-eslint/no-unused-vars */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const config = merge(common, {
    mode: "development",
    devtool: "source-map",
});

module.exports = config;

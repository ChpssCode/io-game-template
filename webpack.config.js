const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dirname } = require('path');
const { fileURLToPath } = require('url');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const rootPath = "src/client/";
//const rootPath = "src/editor";

module.exports = {
    mode: 'development',
    entry: {
        index: "./" + rootPath + "/index.ts",
    },
    module: {
        rules: [
            {
                test: /\.m?ts$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    // Use `.swcrc` to configure swc
                    loader: "swc-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, rootPath, "index.html"),
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "static", to: "", noErrorOnMissing: true },
            ]
        }),
        /*new TerserPlugin({
            // sourceMap: false,
            extractComments: false, // To avoid separate file with licenses.
            terserOptions: {
                mangle: {
                    properties: true
                },
                sourceMap: false,
                //keep_classnames: false,
                keep_fnames: false,
                toplevel: true,
            },
        })*/
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
        allowedHosts: "diep.nomogame.com"
    },
    optimization: {
        minimize: false
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};

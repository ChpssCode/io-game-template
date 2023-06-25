const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dirname } = require('path');
const { fileURLToPath } = require('url');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const rootPath = "src/client/";

module.exports = {
    mode: 'production',
    entry: {
        index: "./" + rootPath + "/index.ts",
    },
    target: ['web'],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
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
        esModuleInterop
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, rootPath, "index.html"),
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "static", to: "" },
            ]
        }),
    ],
    optimization: {
        minimizer: [new TerserPlugin({
            // sourceMap: false,
            extractComments: false, // To avoid separate file with licenses.
            terserOptions: {
                mangle: {
                    properties: {
                        reserved: [
                            "i8",
                            "ui8",
                            "ui8c",
                            "i16",
                            "ui16",
                            "i32",
                            "ui32",
                            "f32",
                            "f64",
                            "eid",
                        ]
                    }
                },
                compress: true,
                sourceMap: false,
                toplevel: true,
                ecma: "2015",

            },
        })]
    },
    output: {
        filename: '[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};

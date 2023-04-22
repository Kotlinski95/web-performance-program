const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(scss)$/,
                use: [
                    miniCss.loader,
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new miniCss({
            filename: 'style.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: 'src/service-worker.js', to: 'service-worker.js' },
            ],
          }),
        // new GenerateSW({
        //     clientsClaim: true,
        //     skipWaiting: true,
        //     swDest: 'service-worker.js',
        // }),
    ],
};

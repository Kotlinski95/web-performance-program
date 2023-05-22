const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        page1: {
            import: './src/js/page1.js',
            dependOn: 'shared',
        },
        page2: {
            import: './src/js/page2.js',
            dependOn: 'shared',
        },
        shared: './src/js/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
          name: 'shared',
        },
      },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['page1', 'shared'],
            template: "./src/page1.html",
            filename: `page1.html`
        }),
        new HtmlWebpackPlugin({
            chunks: ['page2', 'shared'],
            template: "./src/page2.html",
            filename: `page2.html`
        }),
    ],
};

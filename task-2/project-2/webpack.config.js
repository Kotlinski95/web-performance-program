const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
    const isModern = env && env.modern
    return {
        entry: path.resolve(__dirname, 'src/index.js'),
        output: {
            filename: isModern ? 'bundle.modern.js' : 'bundle.legacy.js',
        },
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: 'html-loader'
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images'
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ],
        mode: 'production',
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    default: false,
                    vendors: false,
                    moderns: {
                        name: 'moderns',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 1,
                        minChunks: 2,
                        enforce: true,
                        chunks: isModern ? 'all' : 'async',
                        reuseExistingChunk: true,
                        enforceSizeThreshold: 50000,
                        filename: '[name].modern.js'
                    },
                    legacys: {
                        name: 'legacys',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 2,
                        minChunks: 2,
                        enforce: true,
                        chunks: 'async',
                        reuseExistingChunk: true,
                        filename: '[name].legacy.js'
                    }
                }
            }
        }
    }
}

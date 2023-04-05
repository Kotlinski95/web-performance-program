const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
    const isModern = env && env.modern;
    const filenamePrefix = isModern ? 'modern' : 'legacy';
    return {
        entry: path.resolve(__dirname, 'src/index.js'),
        output: {
            filename: `[name].bundle.${filenamePrefix}.js`,
            chunkFilename: `[name].${filenamePrefix}.js`
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
                        loader: 'babel-loader',
                        options: {
                            presets: [
                              [
                                '@babel/preset-env',
                                {
                                  modules: false,
                                  useBuiltIns: 'usage',
                                  corejs: 3,
                                  targets: isModern ? {
                                    esmodules: true,
                                    browsers: [
                                        "last 2 versions",
                                        "not dead"
                                    ]
                                  } : {
                                    browsers: 'ie >= 6'
                                  },
                                },
                              ],
                            ],
                            plugins: ['@babel/plugin-transform-runtime'],
                        },
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

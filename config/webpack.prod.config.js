const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const autoprefixer = require('autoprefixer')
const path = require('path')

const resolve = (...args) => path.join(__dirname, '..', ...args)

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        'rql-editor': resolve('src/index.tsx')
    },
    output: {
        path: resolve('dist'),
        publicPath: '/dist/',
        filename: '[name].js',
        libraryTarget: 'umd', // 采用通用模块定义
        libraryExport: 'default' // 兼容 ES6 的模块系统、CommonJS 和 AMD 模块规范
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
                include: resolve('src')
            },
            {
                test: /\.(tsx|ts)$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/,
                include: resolve('src')
            },
            {
                test: /\.css$/,
                loader: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                loader: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(jpe?g|png|ico|gif|woff|woff2|eot|ttf|otf|svg|swf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4000,
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@src': resolve('src'),
            '@components': resolve('src/components'),
            '@utils': resolve('src/utils')
        }
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [autoprefixer]
            }
        }),

        // 限制code splitting不分片
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css' // 提取后的css的文件名
        })

        // new BundleAnalyzerPlugin()
    ],
    externals: {
        // 定义外部依赖，避免把vue, react和react-dom打包进去
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false
            }
        },
        runtimeChunk: false
    }
}

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {VueLoaderPlugin} = require('vue-loader')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const projectConfig = require('./projectConfig')
const {entrys, mode, alias} = projectConfig
const isDev = mode === 'development' ? true : false

module.exports = {
    entry:{
        ...entrys.entry
    } ,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isDev ? 'js/[name].js' : 'js/[name].[hash:8].js',
        chunkFilename: isDev ? 'js/[name].js' : 'js/[name].[hash:8].js'
    },
    mode: mode,
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [{
                    loader: 'vue-loader',
                    options: {
                        compilerOptions: {
                            preserveWhitespace: false
                        }
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [{
                    loader: "thread-loader",
                    options: {
                        workers: 2,
                        workerParallelJobs: 20,
                        workerNodeArgs: ['--max-old-space-size=1024'],
                        poolRespawn: false,
                        poolTimeout: 2000,
                        poolParallelJobs: 100,
                    }
                }, {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }]
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')({
                                overrideBrowserslist: ['last 30 versions', "> 2%", "Firefox >= 10", "ie 6-11"]
                            })]
                        }
                    },
                    'less-loader'
                ] // 从右向左解析原则
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5 * 1024,
                            esModule: false,
                            outputPath: 'img/',
                            publicPath: '../img',
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff?2|eot|ttf|otf|svg)(\?.*)?$/i, // 字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 2,
                            publicPath: '../',
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].min.[ext]'
                                }
                            },
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            ...alias
        },
        extensions: ['*', '.js', '.jsx', '.vue']
    },
    externals: {
        "vue":"Vue",
        'vue-router': 'VueRouter',
        'vuex': 'Vuex'
    },
    plugins: [
        new VueLoaderPlugin(),
        ...entrys.HtmlPlugins,
        new MiniCssExtractPlugin({
            filename: isDev ? 'css/[name].css' : "css/[name].[hash:8].css",
            chunkFilename: isDev ? 'css/[name].css' : "css/[name].[hash:8].css",
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('./static/vendor-manifest.json')
        }),
        // 将 dll 注入到 生成的 html 模板中
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, './static/*.js'),
            outputPath: './static',
            publicPath: 'static',
        })
    ],
}
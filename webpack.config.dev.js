const Webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const projectConfig = require('./projectConfig')
const {port ,host ,proxy} = projectConfig
module.exports = WebpackMerge(webpackConfig,{
    devtool:"source-map",// 开发环境配置
    devServer:{
        port:port,
        host:host,
        open:true,
        hot:true,
        overlay: {
            warnings: false,
            errors: true
        },
        openPage:'/home',
        headers:{
            "Access-Control-Allow-Origin":"*"
        },
        historyApiFallback: {
            index: '/index.html'
        },
        disableHostCheck:true,
        proxy: {
            ...proxy
        }
    },
    plugins:[
        new Webpack.HotModuleReplacementPlugin()
    ]
})

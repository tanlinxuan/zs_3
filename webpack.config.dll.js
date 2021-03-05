/**
 *
 * @author 谭邻宣
 * @date 2020/8/5 14:09
 **/
const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// dll文件存放的目录
const dllPath = 'static'

module.exports = {
    entry: {
        // 需要提取的库文件
        vendor: ['vue','ant-design-vue','axios', 'echarts']
    },
    output: {
        path: path.join(__dirname, dllPath),
        filename: '[name].dll.js',
        library: '[name]_[hash]'
    },
    plugins: [
        // 清除之前的dll文件
        new CleanWebpackPlugin({
            path: './static'
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, dllPath, '[name]-manifest.json'),
            name: '[name]_[hash]',
            context: process.cwd()
        })
    ]
}
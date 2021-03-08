/**
 *  多页面打包入口管理
 * @author 谭邻宣
 * @date 2021/3/4 11:10
 **/
const path = require('path');
const fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENTRANCE = 'more'; // odd 单页面  ， more 多页面
const defaultPage=['login']  // 默认单独打包的页面
let entry = {};
let HtmlPlugins=[];

if(ENTRANCE === 'more'){
    const dirInfo = fs.readdirSync('./src/pages');
    dirInfo.forEach(item=>{
        entry[item]=['babel-polyfill',path.resolve(__dirname, `src/pages/${item}/main.js`)];
        let _html = new HtmlWebpackPlugin({
            template: `./index.html`,
            filename:`${item}.html`,//打包后的文件名
            inject: true,
            hash: true,
            chunks: [`${item}`],
            minify: {
                removeComments: true
            }
        });
        HtmlPlugins.push(_html)
    })
}else{
    entry = {
        main:['babel-polyfill', path.resolve(__dirname, 'src/main.js')]
    }
    HtmlPlugins=[
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
            minify: {
                removeComments: true
            }
        }),
    ]
}


module.exports = { entry, HtmlPlugins }
/**
 *  多页面打包入口管理
 * @author 谭邻宣
 * @date 2021/3/4 11:10
 **/
const path = require('path');
const fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENTRANCE = 'more'; // odd 单页面  ， more 多页面

let entry = {};
let HtmlPlugins=[];

if(ENTRANCE === 'more'){
    const dirInfo = fs.readdirSync('./src/pages');
    dirInfo.forEach(item=>{
        // //复制公共主入口文件  ，打包完成后，将删除该复制文件
        // fs.writeFileSync(`./src/pages/${item}/main.js`,fs.readFileSync(`./src/main.js`));
        // fs.writeFileSync(`./src/pages/${item}/app.vue`,fs.readFileSync(`./src/app.vue`));
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
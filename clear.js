/**
 * 打包完成后删除 webpack 复制的公共文件
 * @author 谭邻宣
 * @date 2021/3/5 9:24
 **/
const fs = require("fs");
const path = require('path');
const baseSrc = './src/pages';
const dirInfo = fs.readdirSync(baseSrc);
dirInfo.forEach(item=>{
    let url = `${baseSrc}/${item}`
    let files = fs.readdirSync(url);
    files.forEach((file,index)=>{
        if(file=='app.vue' || file == 'main.js'){
            let curPath = path.join(url,file);
            fs.unlinkSync(curPath);
        }
    });
})
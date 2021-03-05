## 通用中后台 前端框架

#### 项目介绍
通用 vue 前端项目框架 

CDN 引入 vue vuex vue-router ， dll单独打包 echarts  ant-design-vue （注：CDN 引入antd 在IE 中会引起语法错误）

#### 软件架构
 node 10 +
 webpack 4.X +
 vue 2.X + 
 ant-design-vue 1.6.X  + Echarts 4.X
 
#### 使用说明

1. 安装依赖  npm i
2. 启动项目  npm start , 首次启动项目 ，需先运行 npm run build:dll
3. 生产环境打包 npm run build 
4. 依赖资源单独打包  npm run build:dll ,将 antd 与 echarts 单独打包
#### 目录结构

eg:
* dist-----生产环境打包文件目录  
* src：    
    * components-----通用组件库   
    * httpServer-----API 请求相关    
    * layout-----页面layout容器
    * pages-----主页面目录
    * public-----静态资源目录
    * router-----路由管理
    * utils-----全局方法目录
        * store-----全局状态管理
        * utils.js-----全局通用方法封装
        * dict.js-----全局字典配置
    * app.vue-----页面主入口
    * base.less-----初始化样式
    * common.less-----全局样式表
    * main.js-----项目打包主入口
* static-----dll 静态资源目录
* babel.config.js-----babel 配置
* project.config.js-----项目配置
* webpack.config.dev.js-----开发环境打包入口
* webpack.config.dll.js-----dll 打包入口
* webpack.config.js-----webpack公共配置
* webpack.config.prod.js-----生产环境打包入口

#### 备注

* route中配置路由时 ，需与对应的component name名称保持一致 ，否则无法开启页面缓存

* 页面跳转自动添加tagView标签 ， 同时自动添加页面进缓存队列，保持页面状态
```typescript
    store.dispatch('tagViews/addViewList', view) //添加页面标签
    store.dispatch('tagViews/addCacheView', view.name)  //添加页面到缓存队列
```
* 兼容JSX 语法，需指定text="text/jsx"

```html
<script type="text/jsx">
    export default {
        name:'',
        data(){},
        render(){
            return <div></div>
        }
}
</script>
````

        


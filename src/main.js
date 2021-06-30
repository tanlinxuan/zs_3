import echarts from 'echarts' // 全局注册echarts
import {  message ,Modal } from 'ant-design-vue'; //全局注册 message
import router from '@src/router' // 挂载路由
//import '@src/router/permissions' // 挂载路由权限校验
import store from "@src/store" //加载状态管理
import app from '@src/app'  //主页面


if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}


Vue.config.productionTip = false;
let instance = null;
function render(props = {}) {
    const { container } = props;
    instance = new Vue({
        router,
        store,
        render: (h) => h(app),
    }).$mount(container ? container.querySelector('#zs_app') : '#zs_app');
}
export async function bootstrap() {
    console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
    console.log('[vue] props from main framework', props);
    render(props);
}
export async function unmount() {
    instance.$destroy();
    instance.$el.innerHTML = '';
    instance = null;
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    require('babel-polyfill');
    Vue.prototype.$message = message;
    Vue.prototype.$echarts = echarts;
    Vue.prototype.$confirm = config => {  //全局注册 confirm
        let params={
            title: '提示',
            centered:true,
            okText: '确认',
            cancelText: '取消',
        }
        return Modal.confirm({...params,...config});
    };
    message.config({
        duration: 2,// 持续时间
        top:`150px`, // 到页面顶部距离
        maxCount: 1 // 最大显示数, 超过限制时，最早的消息会被自动关闭
    });
    render();
}else{
    new Vue({
        el:'#zs_app',
        router,
        store,
        render:(h)=>h(app)
    })
}






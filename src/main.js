import echarts from 'echarts' // 全局注册echarts
import {  message ,Modal } from 'ant-design-vue'; //全局注册 message
import store from "@src/store" //加载状态管理
import app from '@src/app'  //主页面
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

export function componentVue (router){
   return  new Vue({
        el:'#app',
        router,
        store,
        render:(h)=>h(app)
    })
}




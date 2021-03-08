import {  message ,Modal } from 'ant-design-vue'; //全局注册 message
import Login from './index'  //主页面
Vue.prototype.$message = message;
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
new Vue({
    el:'#app',
    render:(h)=>h(Login)
})





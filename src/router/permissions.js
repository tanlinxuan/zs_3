/**
 * 路由跳转前 , 校验权限 ，处理tab页签
 * @author 谭邻宣
 * @date 2020/7/4 14:23
 **/
import router from './index'
import store from "@src/store";
import NProgress from 'nprogress' //跳转进度条
import 'nprogress/nprogress.css'
const loginUrl = '/login';

router.beforeEach(async(to, from, next) => {
    NProgress.start();
    //读取本地localStorage 中是否有用户信息
    const tokensInfo= localStorage.getItem("tokensInfo");
    // 判断是否已登录
    if(tokensInfo){
        // const {access_token} = store.getters.tokensInfo; //判断当前页面是否初次加载
        // if(access_token){
        //
        // }else{
        //     store.dispatch('user/setLocalTokens', JSON.parse(tokensInfo)).then(()=>{
        //         next();
        //     })
        // }
        next()
    }else{
        store.dispatch('user/setHistoryPage').then(()=>{
            next({ path: loginUrl })
        })
    }
})
router.afterEach(() => {
    NProgress.done()
})



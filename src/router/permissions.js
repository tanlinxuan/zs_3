/**
 * 路由跳转前 , 校验权限 ，处理tab页签
 * @author 谭邻宣
 * @date 2020/7/4 14:23
 **/
import routers from './index'
import store from "@src/store";
import NProgress from 'nprogress' //跳转进度条
import 'nprogress/nprogress.css'
const origin = window.location.origin
const loginUrl = origin +'/login.html';
const permissions = (router)=>{
    router.beforeEach(async(to, from, next) => {
        NProgress.start();
        const {access_token} = store.getters.tokensInfo;
        if (access_token) { // 判断是否已登录
            next()
        }else{
            const tokensInfo= localStorage.getItem("tokensInfo");
            if(tokensInfo) { // 判断local中是否已经有token（其他页面已登录）
                store.dispatch('user/setLocalTokens', JSON.parse(tokensInfo)).then(()=>{
                    next();
                })
            }else{  // 跳转登录页
                debugger
                store.dispatch('user/setHistoryPage').then(()=>{
                    window.open(loginUrl,'_self')
                })
            }
        }
        // const {access_token} = store.getters.tokensInfo;
        // if (access_token) { // token 是否存在
        //     debugger
        //     if(to.path ===loginUrl){ //登录跳转
        //         next('/index')
        //     }else{
        //         if (to.matched.length !== 0) {  //路由存在 ，下一步 权限校验
        //             setVisitedViews(to);
        //
        //         } else {  // 404判定
        //             next({ path: '/404' })
        //         }
        //     }
        // } else {
        //     debugger
        //
        //     if(tokensInfo){  //账户免登陆  ，获取token 请求 用户信息  ，重新加载路由
        //         let token = JSON.parse(tokensInfo)
        //         if(token.user_id && to.path!==loginUrl){
        //             store.dispatch('user/setLocalTokens', token).then(()=>{
        //                 setVisitedViews(to);
        //                 next();
        //             })
        //         }else{  // 跳转到登录页
        //             next(loginUrl)
        //         }
        //     }else{  // 跳转到登录页
        //         if (to.path === loginUrl) { // 如果是登录页面的话，直接next()
        //             next();
        //         } else { // 否则 跳转到登录页面
        //             next(loginUrl)
        //         }
        //     }
        // }
    })
    router.afterEach(() => {
        NProgress.done()
    })
}

for(let k  in routers){
    permissions(routers[k])
}



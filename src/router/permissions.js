/**
 * 路由跳转前 , 校验权限 ，处理tab页签
 * @author 谭邻宣
 * @date 2020/7/4 14:23
 **/
import router from './index'
import store from "@src/store";
import NProgress from 'nprogress' //跳转进度条
import 'nprogress/nprogress.css'

const loginUrl = '/login' ;
router.beforeEach(async(to, from, next) => {
    NProgress.start()
    const {access_token} = store.getters.tokensInfo;
    if (access_token) { // token 是否存在
        if(to.path ===loginUrl){ //登录跳转
            next('/home')
        }else{
            if (to.matched.length !== 0) {  //路由存在 ，下一步 权限校验
               // setVisitedViews(to);
                next({
                    ...to,
                    replace: true
                })
            } else {  // 404判定
                next({ path: '/404' })
            }
        }
    } else {
        debugger
        if (to.path === loginUrl) { // 如果是登录页面的话，直接next()
            next();
        } else { // 否则 跳转到登录页面
            next(loginUrl)
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
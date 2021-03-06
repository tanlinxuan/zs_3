/**
 * 路由控制
 * @author 谭邻宣
 * @date 2021/03/05 10:13
 **/
import PageLayout from  '@components/layout'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const constantRoutes = [
    {
        path: '/login',
        component: () => import('@pages/login'),
        hidden: true
    },
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@pages/home'),
        meta: { title: '工作台', affix: true }
    }
]


const createRouter = () => new VueRouter({
    mode: 'history',
    base: window.__POWERED_BY_QIANKUN__ ? '/zs3' :process.env.BASE_URL,
    routes: constantRoutes
})
const router = createRouter()


export default router
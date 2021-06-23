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
        path: 'login',
        name: 'login',
        component: () => import('@pages/login'),
        meta: { title: '登录', affix: true }
    },
    {
        path: '/',
        component: PageLayout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@pages/home'),
                meta: { title: '工作台', affix: true }
            },
        ]
    }
]


const createRouter = () => new VueRouter({
    routes: constantRoutes
})
const router = createRouter()


export default router
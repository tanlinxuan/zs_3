/**
 * 路由控制
 * @author 谭邻宣
 * @date 2020/7/4 14:05
 **/
import PageLayout from  '@src/layout'
//import baseRouter from "./modules/baseRouter";
//import mainRouter from "./modules/mainRouter";
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const createRouter = constantRoutes => new VueRouter({
    routes: constantRoutes
})

const modulesFiles = require.context('./modules', true, /\.js$/)

let routers = modulesFiles.keys().reduce((routers, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    const constantRoutes = [
        {
            path: '/',
            component: PageLayout,
            redirect: '/index',
            children: [
                ...value.default
            ]
        }
    ]
    routers[moduleName] = createRouter(constantRoutes)
    return routers
}, {})
export default routers
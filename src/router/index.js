/**
 * 路由控制
 * @author 谭邻宣
 * @date 2020/7/4 14:05
 **/
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
        ...value.default
    ]
    routers[moduleName] = createRouter(constantRoutes)
    return routers
}, {})
export default routers
import { componentVue } from '@src/main'
import '@router/permissions' // 挂载路由权限校验
import routers from '@router/index' // 挂载路由
const {page1} = routers

componentVue(page1)


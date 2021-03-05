/**
 *
 * @author 谭邻宣
 * @date 2020/7/9 17:15
 **/
//import Vue from 'vue'
//import Vuex from 'vuex'
import getters from "./getters";
import createPersistedState from "vuex-persistedstate" //本地化存储

//Vue.use(Vuex)
/****
 * 读取modules 下自定义 state ，mutations ，并暴露给全局 ，
 * 文件名作为 state 字段名 ，例： 读取 user.js 下定义的 userInfo , 取 state.user.userInfo
 */
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

const store = new Vuex.Store({
    modules,
    getters,
    plugins: [createPersistedState({ //本地化存储state 到 sessionStorage
        storage: window.sessionStorage
    })]
})

export default store


import CryptoJS from 'crypto-js'
import HTTP from "@httpServer";
import httpServer from "@httpServer/serverConfig";
import loginCallBack from "../loginCallBack"

const getToken= (params)=>{ //通过用户名密码 ，请求token
  return HTTP.post(httpServer.login.getTokens,params).then(res=>{
    return res.data?res.data:{}
  })
}

const state={ //定义登录用户相关state
  userInfo:{},  //用户信息
  tokensInfo:{}, //token相关
  historyPage:''  // 发生超时 ，记录当前页面 ， 登录后直接跳转该页面
 // perInfo:{} //权限相关
}

const mutations = {
  ['USER_LOGIN'] (state,data) {
    state.userInfo = {...data}
  },
  ['SET_SESSION_TOKEN'] (state,data) {
    state.tokensInfo = {...data}
  },
  ['SET_LOCAL_TOKEN'] (state,token) {
    localStorage.setItem('tokensInfo',JSON.stringify(token))
  },
  ['SET_HISTORY_PAGE'](state , url){
    let history = url!==''?window.location.href:url
    state.historyPage = history
  },
  ['USER_EXIT'] (state) {  //用户登出
    localStorage.removeItem('tokensInfo')
    state.tokensInfo = {}
    state.userInfo = {}
  }
}

const actions = {
  /****
   * 通过用户名密码 ，请求 token ,
   * 获取token , 请求当前登录用户信息 ，当前用户权限  ，缓存所有用户和部门列表
   * @param commit
   * @param data
   * @returns {Promise<boolean>}
   */
  async userLogin ({ commit }, data) {
    let {login_name,password ,rememberPsw} = data,
        params={login_name, password:CryptoJS.MD5(password).toString()} , //组装请求参数 ，密码 md5 加密
        tokens= await getToken(params); //请求token
    if(!tokens.user_id)  return false
    commit('SET_LOCAL_TOKEN',tokens);
    let userDetail =await loginCallBack(commit , tokens)
    return userDetail
  },

  // 账户免登陆 ，直接读取 local 中token
  async setLocalTokens({ commit }, token){
    let userDetail = await loginCallBack(commit , token)
    return userDetail
  },

  setHistoryPage({commit},url){
    if(!url && url===''){  //超时后登录执行跳转，清空 history
      commit('SET_HISTORY_PAGE',url)
      return false
    }
    commit('SET_HISTORY_PAGE') //记录历史页面
    commit('USER_EXIT')  //登出
  },

  userExit({ commit }) {
    commit('USER_EXIT')
  }

}
export default {
  namespaced:true,
  state,
  mutations,
  actions
}

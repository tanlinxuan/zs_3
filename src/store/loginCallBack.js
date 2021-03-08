/**
 *  用户登录后 ，初始化项目数据
 * @author 谭邻宣
 * @date 2020/9/29 11:12
 **/

import HTTP from "@httpServer";
import httpServer from "@httpServer/serverConfig";

const getUserInfo= (userId)=>{ //获取当前用户信息
    return  HTTP.get(httpServer.login.getUserInfo(userId)).then(res=>{
        return res.data?res.data:{}
    })
}

const getUserPer= (userId)=>{ //获取用户权限信息
    return  HTTP.get(httpServer.login.getUserPer).then(res=>{
        return res.data?res.data:{}
    })
}
// const getAllUserList= ()=>{ //获取所有用户列表
//     return  HTTP.get(httpServer.login.getAllUserList).then(res=>{
//         return res.data?res.data:{}
//     })
// }
// const getDepartments= ()=>{ //获取部门信息
//     return  HTTP.get(httpServer.userManage.getDepartments).then(res=>{
//         return res.data?flatten(res.data):[]
//     })
// }
//平铺部门树
const flatten = arr => arr.reduce((prev, next) => {
    let item = {} ;
    for(let k in next){
        if(k !== 'children'){
            item[k] = next[k]
        }
    }
    let arrNew = prev.concat(item);
    if (Array.isArray(next.children) && next.children.length !==0 ){
        return arrNew.concat(flatten(next.children));
    }
    return  arrNew
},[])

/***
 *  定义登录后 执行方法 ， 请求当前登录用户信息 ，当前用户权限  ，缓存所有用户和部门列表
 * @param commit
 * @param data
 * @returns {Promise<unknown>}
 */
const loginCallBack = (commit , data) =>{
    let userPer ;
    //session 存储token
    commit('SET_SESSION_TOKEN',data);
    return Promise.all([
        getUserInfo(data.user_id),  // 请求当前登录用户信息
        getUserPer(),  // 当前登录用户权限
     //   getAllUserList() ,  // 缓存所有用户列表
      //  getDepartments()  //缓存所有部门信息
    ]).then(res=>{
        //session 存储当前登录用户信息
        commit('USER_LOGIN',res[0]);
        userPer = res[1];
       // sessionStorage.setItem('usersList',JSON.stringify(res[2]));
      //  sessionStorage.setItem('departments',JSON.stringify(res[3]));
        return res[0]
    })
}

export default  loginCallBack
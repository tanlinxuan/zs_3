/**
 * Api 路由集合
 * @author 谭邻宣
 * @date 2020/7/6 14:12
 **/
const UC = `/uc/v0.1`,
    FIN = `/fin/v0.1`;
const dark = `?$count=true`
const httpServer = {
    //登录
    login: {
        getTokens: `${UC}/tokens`, //登录前获取token
        getUserInfo: userId => `${UC}/users/${userId}/detail`, //请求用户信息
        getUserPer: `${UC}/privileges/user/my`, //请求用户信息
        getAllUserList: `${UC}/users/org/my` //查询所有用户信息
    }
}
export default httpServer
const getters = {
  userInfo: state => state.user.userInfo, //用户信息
  tokensInfo: state => state.user.tokensInfo, //身份令牌
  historyPage:state=>state.user.historyPage
}
export default getters

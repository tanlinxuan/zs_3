const getters = {
  userInfo: state => state.user.userInfo, //用户信息
  tokensInfo: state => state.user.tokensInfo, //身份令牌
  visitedViews: state => state.tagViews.visitedViews, //views页签信息
  activeView: state => state.tagViews.activeView, //views页签信息
  cachedViews: state => state.tagViews.cachedViews //view 缓存队列
}
export default getters

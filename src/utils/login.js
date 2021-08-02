// 判断是否登录
const isLogin = () => !!localStorage.getItem('token')
// 获取 token
const getToken = () => localStorage.getItem('token')
export {
  isLogin,
  getToken
}

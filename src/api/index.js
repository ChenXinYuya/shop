import request from '../utils/request'

// 定义请求 分类的 model
const fetchCates = (params = {}) => request.get('/shop/goods/category/all', { params })
// 请求首页轮播
const fetchHomeBanner = (params = {}) => request.get('/banner/list', { params })
// 请求商品列表
const fetchItems = (params = {}) => request.post('/shop/goods/list/v2', params)
// 获取固定id商品
const fetchItem = (id) => request.get('/shop/goods/detail', { params: { id } })
// 注册用户
const register = (params = {}) => request.post('/user/username/register', params)
// 用户登录
const userLogin = (params = {}) => request.post('/user/username/login', params)
// 加入购物车
const addCart = (params = {}) => request.post('/shopping-cart/add', params)
// 获取购物车数据
const getCart = (params = {}) => request.get('/shopping-cart/info', { params })
// 修改购物车商品数量
const changeNum = (params = {}) => request.post('/shopping-cart/modifyNumber', params)
// 修改购物车商品选中状态
const changeSelect = (params = {}) => request.post('/shopping-cart/select', params)
// 移除购物车中某个物品
const removeItem = (params = {}) => request.post('/shopping-cart/remove', params)
export {
  fetchCates,
  fetchHomeBanner,
  fetchItems,
  fetchItem,
  register,
  userLogin,
  addCart,
  getCart,
  changeNum,
  changeSelect,
  removeItem
}

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
// 添加收获地址
const addAddress = (params = {}) => request.post('/user/shipping-address/add', params)
// 获取所有收获地址
const getAllAddress = (params = {}) => request.get('/user/shipping-address/list', { params })
// 编辑收获地址
const editAddress = (params = {}) => request.post('/user/shipping-address/update', params)
// 删除联系人
const deleteAddress = (params = {}) => request.post('/user/shipping-address/delete', params)
// 获取默认收获地址
const getDefAddress = (params = {}) => request.get('/user/shipping-address/default/v2', { params })
// 获取地址详情
const getDetailAddress = (params = {}) => request.get('/user/shipping-address/detail/v2', { params })
// 获取当前用户openid,unionid
const getCurrentUser = (params = {}) => request.get('/user/detail', { params })
// 退出出登录
const exit = (params = {}) => request.get('/user/loginout', { params })

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
  removeItem,
  addAddress,
  getAllAddress,
  editAddress,
  deleteAddress,
  getDefAddress,
  getDetailAddress,
  getCurrentUser,
  exit
}

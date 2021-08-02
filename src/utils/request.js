import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { getToken } from './login'
const vm = new Vue()

// 定义默认配置
const request = axios.create({
  baseURL: '/conner',
  timeout: 8000
})

// 请求拦截
request.interceptors.request.use(function (config) {
  if (getToken()) {
    config.headers.token = getToken()
  }
  vm.$showLoading()
  if (config.method === 'post' && config.data) {
    config.data = qs.stringify(config.data)
  }
  return config
}, function (error) {
  vm.$showLoading()
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  vm.$hideLoading()
  return response
}, function (error) {
  vm.$hideLoading()
  return Promise.reject(error)
})

export default request

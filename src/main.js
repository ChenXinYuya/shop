import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import loading from './plugin/loading/index'
import VueRouter from 'vue-router'

import {
  Icon, Tabbar, TabbarItem, Swipe, SwipeItem, Grid, GridItem, PullRefresh, List, NavBar, GoodsAction, GoodsActionIcon,
  GoodsActionButton, Popup, Card, Button, Stepper, Sidebar, SidebarItem, Form, Field, SubmitBar, Checkbox, SwipeCell,
  Empty, ContactCard, AddressList, AddressEdit, Search, Lazyload, Cell, CellGroup
} from 'vant'

import './assets/font/iconfont.css'
import './assets/font/iconfont.ttf'

import './assets/css/base.css'

Vue.use(loading)

Vue.use(Icon)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Grid)
  .use(GridItem)
  .use(PullRefresh)
  .use(List)
  .use(NavBar)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Popup)
  .use(Card)
  .use(Button)
  .use(Stepper)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Form)
  .use(Field)
  .use(SubmitBar)
  .use(Checkbox)
  .use(SwipeCell)
  .use(Empty)
  .use(ContactCard)
  .use(AddressList)
  .use(AddressEdit)
  .use(Search)
  .use(Cell)
  .use(CellGroup)
  .use(Lazyload, {
    loading: require('./assets/img/loading.jpg'),
    error: require('./assets/img/loading.jpg'),
    preload: 1
  })

Vue.config.productionTip = false

// 【添加代码】解决vue-router在3.0版本以上重复点路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function push (location) {
  return originalReplace.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

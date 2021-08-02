import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import loading from './plugin/loading/index'
import {
  Icon, Tabbar, TabbarItem, Swipe, SwipeItem, Grid, GridItem, PullRefresh, List, NavBar, GoodsAction, GoodsActionIcon,
  GoodsActionButton, Popup, Card, Button, Stepper, Sidebar, SidebarItem, Form, Field, SubmitBar, Checkbox, SwipeCell,
  Empty
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

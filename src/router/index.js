import Vue from 'vue'
import VueRouter from 'vue-router'
import { isLogin } from '../utils/login'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      needLogin: false,
      keepAlive: true
    },
    component: Home
  },
  {
    path: '/cate',
    name: 'cate',
    meta: {
      needLogin: false,
      keepAlive: false
    },
    component: () => import('../views/Cate')
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {
      needLogin: true,
      keepAlive: false
    },
    component: () => import('../views/Cart')
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      needLogin: true,
      keepAlive: true
    },
    component: () => import('../views/User')
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      needLogin: false,
      keepAlive: true
    },
    component: () => import('../views/Detail')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      needLogin: false,
      keepAlive: true
    },
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      needLogin: false,
      keepAlive: true
    },
    component: () => import('../views/Register')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/Order')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactList')
  },
  {
    path: '/addcontact',
    name: 'addcontact',
    component: () => import('../views/AddContact')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.needLogin) {
    next()
  } else if (isLogin()) {
    next()
  } else {
    next({
      path: '/login',
      query: {
        from: to.path
      }
    })
  }
})

export default router

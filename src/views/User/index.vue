<template>
  <div id="user">
    <nav-bar title="个人中心"/>
    <van-cell title="用户名" :value="username" />
    <van-cell value="联系人列表" to="/contact"/>
    <van-button round type="danger" @click="exit">退出登录</van-button>
    <common-tab/>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { exit, getCurrentUser } from '../../api'
import CommonTab from '../../components/CommonTab.vue'
import { getToken } from '../../utils/login'
import NavBar from '../Detail/components/NavBar.vue'

export default {
  name: 'User',
  components: { CommonTab, NavBar },
  data () {
    return {
      username: ''
    }
  },
  methods: {
    exit: function () {
      Dialog.confirm({
        title: '退出',
        message: '确定退出吗？'
      }).then(() => {
        exit({
          token: getToken()
        }).then(res => {
          if (res.data.code === 0) {
            localStorage.removeItem('token')
            this.$router.go(0)
          }
        })
      })
    },
    getCurrentUser: function () {
      getCurrentUser({
        token: getToken()
      }).then(res => {
        if (res.data.code === 0) {
          this.username = res.data.data.base.username
        }
      })
    }
  },
  created: function () {
    this.getCurrentUser()
  }
}
</script>

<style lang="scss" scoped>
#user{
  padding-top: 46px;
}
</style>

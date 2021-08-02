<template>
  <div id="login">
    <div class="login">
      <van-field v-model="username" label="用户名" />
        <van-field v-model="pwd" type="password" label="密码" />
        <van-button round size="large" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="onSubmit">
          登录
        </van-button>
        <van-button round type="primary" size="large" to="/register">去注册</van-button>
    </div>
    <common-tab/>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { userLogin } from '../../api'
import CommonTab from '../../components/CommonTab.vue'

export default {
  components: { CommonTab },
  name: 'Login',
  data () {
    return {
      username: '',
      pwd: ''
    }
  },
  methods: {
    onSubmit: function () {
      userLogin({
        deviceId: '111',
        deviceName: '222',
        username: this.username,
        pwd: this.pwd
      }).then(res => {
        if (res.data.code === 0) {
          localStorage.setItem('token', res.data.data.token)
          Toast.success({
            message: '登录成功',
            duration: 2000,
            onClose: () => {
              if (this.$route.query.from) {
                this.$router.replace(this.$route.query.from)
              } else {
                this.$router.replace('/home')
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#login{
  padding-top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .login{
    width: 80%;
    .van-field,.van-button{
      margin-bottom: 10px;
    }
  }
}
</style>

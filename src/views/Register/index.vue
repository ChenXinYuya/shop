<template>
  <div id="register">
    <div class="register">
      <van-field v-model="username" label="用户名" />
        <van-field v-model="pwd" type="password" label="密码" />
        <van-button round size="large" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="onSubmit">
          注册
        </van-button>
        <van-button round type="primary" size="large" to="/login">去登录</van-button>
    </div>
    <common-tab/>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { register } from '../../api'
import CommonTab from '../../components/CommonTab.vue'
export default {
  components: { CommonTab },
  name: 'Register',
  data () {
    return {
      username: '',
      pwd: ''
    }
  },
  methods: {
    onSubmit: function () {
      register({
        username: this.username,
        pwd: this.pwd
      }).then(res => {
        if (res.data.code === 0) {
          Toast.success({
            message: res.data.msg,
            duration: 2000,
            onClose: () => {
              this.$router.replace('/login')
            }
          })
        }
        if (res.data.code === 10000) {
          Toast.fail(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#register{
  padding-top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .register{
    width: 80%;
    .van-field,.van-button{
      margin-bottom: 10px;
    }
  }
}
</style>

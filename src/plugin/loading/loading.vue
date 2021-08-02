<template>
  <div class="mask" v-show="isShow">
        <van-loading type="spinner" color="#1989fa" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Loading } from 'vant'
Vue.use(Loading)

export default {
  data () {
    return {
      isShow: false
    }
  }
}
</script>

<style lang="scss" scoped>
.mask{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>

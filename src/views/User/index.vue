<template>
  <div id="user">
    <nav-bar title="个人中心"/>
    <p>有获取用户信息的接口吗</p>
    <common-tab/>
  </div>
</template>

<script>
import CommonTab from '../../components/CommonTab.vue'
import NavBar from '../Detail/components/NavBar.vue'
export default {
  name: 'User',
  components: { CommonTab, NavBar }
}
</script>

<style lang="scss" scoped>
#user{
  padding-top: 46px;
}
</style>

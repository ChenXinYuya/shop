<template>
  <div id="common-tab">
    <van-tabbar
    route
    active-color="#FF734C"
    inactive-color="#232628">
      <van-tabbar-item icon-prefix="icon"  icon="shouye" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon-prefix="icon"  icon="fenlei" to="/cate">分类</van-tabbar-item>
      <van-tabbar-item icon-prefix="icon"  icon="shopping-cart" to="/cart" :badge="$store.state.cart.items.length||''">购物车</van-tabbar-item>
      <van-tabbar-item icon-prefix="icon"  icon="tubiaolunkuo-" to="/user">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'CommonTab'
}
</script>

<style lang="scss" scoped>
#common-tab{
  /deep/ .icon{
    font-size: 22px;
  }
}
</style>

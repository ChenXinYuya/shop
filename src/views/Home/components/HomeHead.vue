<template>
  <div id="home-head">
    <van-icon class-prefix="icon" name="fenlei" size="26" color="#8f8d8d" @click="$router.push('/cate')"/>
    <div id="search">
      <van-icon name="search" size="20" color="#8f8d8d"/>
      <span>请输入搜索内容</span>
    </div>
    <van-icon class-prefix="icon" name="tubiaolunkuo-" size="26" color="#8f8d8d" @click="$router.push('/user')"/>
  </div>
</template>

<script>
export default {
  name: 'HomeHead'
}
</script>

<style lang="scss" scoped>
.icon,.van-icon{
  margin: 0 5px;
}
#home-head{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  #search{
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 12px;
    border: 1px solid rgb(143, 141, 141);
    height: 25px;
    border-radius: 15px;
    span{
      color: rgb(143, 141, 141);
    }
  }
}
</style>

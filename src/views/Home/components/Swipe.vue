<template>
  <div id="swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="pic in pics" :key="pic.id">
        <img :src="pic.picUrl?pic.picUrl:pic.pic" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: ['pics'],
  name: 'Swipe'
}
</script>

<style lang="scss" scoped>
#swipe{
  img{
    width: 100%;
    display: block;
  }
}
</style>

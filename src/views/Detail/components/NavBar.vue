<template>
  <div class="nav-bar">
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="$router.go(-1)"
    />
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: ['title']
}
</script>

<style lang="scss" scoped>
.nav-bar{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>

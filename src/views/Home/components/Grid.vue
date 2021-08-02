<template>
  <div>
    <van-grid :column-num="3" clickable>
      <van-grid-item v-for="cate in cates"
      :key="cate.id"
      :icon="cate.icon"
      :text="cate.name"
      :to="{
        name: 'cate',
        params:{
          categoryId: cate.id
        }
      }"/>
    </van-grid>
  </div>
</template>

<script>
export default {
  props: ['cates']

}
</script>

<style lang="scss" scoped>

</style>

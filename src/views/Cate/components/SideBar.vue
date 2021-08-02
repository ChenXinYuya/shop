<template>
  <div class="side-bar">
    <van-sidebar v-model="activeKey">
      <van-sidebar-item v-for="cate in cates"
      :key="cate.id"
      :title="cate.name"
      :class="[{'van-sidebar-item--select': categoryId===cate.id}]"
      @click="clickCate(cate.id)" />
    </van-sidebar>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['cates', 'categoryId'],
  data () {
    return {
      activeKey: -1
    }
  },
  methods: {
    clickCate: function (id) {
      this.$emit('clickCate', { id })
    }
  }
}
</script>

<style lang="scss" scoped>
.side-bar{
  position: fixed;
  top:50px;
  left: 0;
  height: 85%;
  z-index: 1000;
  overflow: auto;
}
</style>

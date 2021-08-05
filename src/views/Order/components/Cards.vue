<template>
  <div class="cards">
    <div class="card" v-for="item in items"
    :key="item.id">
      <van-card
        :num="item.number"
        :price="item.price"
        :title="item.name"
        :thumb="item.pic"
      >
      </van-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  name: 'Cards'
}
</script>

<style lang="scss" scoped>

</style>

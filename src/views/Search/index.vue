<template>
  <div class="search">
    <van-search v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
    @focus="onFocus" />
    <div class="history" v-show="!listShow">
      <h4 class="histit">搜索记录</h4>
      <span v-for="(item,index) in his" :key="index" v-html="item" class="his" @click="onSearch(item)"/>
    </div>
    <common-tab/>
    <floor :items="items" v-show="listShow"/>
  </div>
</template>

<script>
import { fetchItems } from '../../api'
import CommonTab from '../../components/CommonTab.vue'
import Floor from '../Home/components/Floor.vue'
export default {
  components: { CommonTab, Floor },
  name: 'Search',
  data () {
    return {
      value: '',
      items: [],
      listShow: false,
      // 历史记录
      his: []
    }
  },
  methods: {
    onSearch: function (k) {
      this.his.unshift(k)
      if (this.his.length >= 3) {
        this.his.length = 3
      }

      this.his = [...new Set(this.his)]
      localStorage.setItem('his', JSON.stringify(this.his))
      fetchItems({
        k
      }).then(res => {
        this.items = []
        if (res.data.code === 0) {
          this.listShow = true
          this.items = res.data.data.result
        }
      })
    },
    onCancel: function () {
      this.listShow = true
      this.value = ''
    },
    onFocus: function () {
      this.listShow = false
    }
  },
  created: function () {
    if (!localStorage.getItem('his')) {
      localStorage.setItem('his', this.his)
    } else {
      this.his = JSON.parse(localStorage.getItem('his'))
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  padding-bottom: 50px;
}

.his{
  padding: 2px 3px;
  margin: 5px;
  background-color: #fff;
  font-size: 14px;
}
.histit{
  margin: 5px;
  color: #666;
  font-size: 16px;
}
</style>

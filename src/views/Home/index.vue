<template>
  <div>
    <home-head/>
    <div class="wrap">
      <!-- 下拉刷新 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 轮播图 -->
      <swipe :pics="banners"/>
      <!-- 宫格 -->
      <grid :cates="cates"/>
      <div class="title">
      <h3>送恋人/鲜花爱情</h3>
    </div>
      <!-- 列表 -->
      <van-list
        :immediate-check="false"
        offset="50"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <floor :items="items" @clickItem="enterDetail" @addCart="addCart"/>
      </van-list>
      </van-pull-refresh>
    </div>
    <common-tab/>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { fetchCates, fetchHomeBanner, fetchItems, addCart } from '../../api/index'
import CommonTab from '../../components/CommonTab.vue'
import { getToken } from '../../utils/login'
import Floor from './components/Floor.vue'
import Grid from './components/Grid.vue'
import HomeHead from './components/HomeHead.vue'
import Swipe from './components/Swipe.vue'
export default {
  components: { CommonTab, HomeHead, Swipe, Grid, Floor },
  name: 'Home',
  data () {
    return {
      cates: [],
      banners: [],
      items: [],
      page: 1,
      pageSize: 6,
      // 下拉刷新参数
      isLoading: false,
      // 上拉增添数据
      loading: false, // 是否上拉触底
      finished: false // 是否最后一页
    }
  },
  methods: {
    addCart: function ({ id }) {
      addCart({
        goodsId: id,
        number: 1,
        token: getToken()
      }).then(res => {
        if (res.data.code === 0) {
          this.$store.commit('cart/set_items', res.data.data.items)
          Toast.success({
            message: '加入购物车成功',
            duration: 1000
          })
        } else {
          Toast.fail({
            message: res.data.msg,
            duration: 1000
          })
        }
      })
    },
    enterDetail: function ({ id }) {
      this.$router.push({
        path: '/detail',
        query: {
          id
        }
      })
    },
    onLoad: function () {
      this.fetchItems()
      this.page++
    },
    onRefresh: function () {
      this.page = 1
      this.items = []
      this.finished = false
      this.fetchItems()
    },
    fetchCates: function () {
      fetchCates().then(res => {
        if (res.data.code === 0) {
          this.cates = res.data.data
        }
      })
    },
    fetchHomeBanner: function () {
      fetchHomeBanner().then(res => {
        if (res.data.code === 0) {
          this.banners = res.data.data
        }
      })
    },
    fetchItems: function () {
      fetchItems({
        categoryId: 72399,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        this.isLoading = false
        if (res.data.code === 700) {
          // 到达最后一页
          this.loading = false
          this.finished = true
        }
        if (res.data.code === 0) {
          this.loading = false
          this.items = [...this.items, ...res.data.data.result]
        }
      })
      this.page++
    }
  },
  created: function () {
    this.fetchCates()
    this.fetchHomeBanner()
    this.fetchItems()
  }
}
</script>

<style lang="scss" scoped>
.title{
  padding: 10px;
  h3{
    font-weight: 700;
    text-align: center;
  }
}
</style>

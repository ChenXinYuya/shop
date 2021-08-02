<template>
  <div>
    <div class="cate">
      <div>
        <ul  class="cate-head">
          <li :class="{tabActive: tabActive===0}" @click="goTab(0)">综合</li>
          <li :class="{tabActive: tabActive===1}" @click="goTab(1)">销量</li>
          <li :class="{tabActive: tabActive===2}" @click="goTab(2)">价格
              <div class="priceUp angle" :class="{priceActive: priceActive && tabActive===2}"></div>
              <div class="priceDown angle" :class="{priceActive: !priceActive && tabActive===2}"></div>
          </li>
          <li :class="{tabActive: tabActive===3}" @click="goTab(3)">时间</li>
        </ul>
      </div>
      <div class="wrap">
          <!--
          左侧导航栏 显示类别
          cates：类别数据
          @clickCate自定义事件  传递 所点击类别的id返回  携带参数 {id}
          categoryId 激活类样式所在的id
        -->
        <side-bar :cates="cates" @clickCate="enterCate" :categoryId="categoryId"/>
        <!--
          items： 展示的商品数据
          @clickItem自定义事件 进入对应的详情页 {id}
        -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            offset="50"
            :immediate-check="false"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="floor">
              <floor :items="items" @clickItem="enterDetail" @addCart="addCart"/>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <common-tab/>
    {{orderBy}}
  </div>
</template>

<script>
import { Toast } from 'vant'
import { addCart, fetchCates, fetchItems } from '../../api'
import CommonTab from '../../components/CommonTab.vue'
import { getToken } from '../../utils/login'
import Floor from '../Home/components/Floor.vue'
import SideBar from './components/SideBar.vue'

export default {
  name: 'Cate',
  components: { CommonTab, SideBar, Floor },
  data () {
    return {
      cates: [],
      items: [],
      categoryId: 72399,
      // tab栏激活类
      tabActive: 0,
      // 价格升降序激活类
      priceActive: true,
      // 分页刷新部分
      page: 1,
      pageSize: 6,
      isLoading: false,
      loading: false,
      finished: false
    }
  },
  methods: {
    addCart: function ({ id }) {
      addCart({
        goodsId: id,
        number: 1,
        token: getToken()
      }).then(res => {
        this.$store.commit('cart/set_items', res.data.data.items)
        if (res.data.code === 0) {
          Toast.success({
            message: '加入购物车成功',
            duration: 1000
          })
        }
      })
    },
    // 进入详情页  没问题
    enterDetail: function ({ id }) {
      this.$router.push({
        path: '/detail',
        query: {
          id
        }
      })
    },
    // 获取所有类别 没问题
    fetchCates: function () {
      fetchCates().then(res => {
        if (res.data.code === 0) {
          this.cates = res.data.data
        }
      })
    },
    // 初始数据还原 刷新时候还原 切换 tab时候还原 页数 加载 判断
    original: function () {
      this.page = 1
      this.items = []
      this.isLoading = false
      this.loading = false
      this.finished = false
    },
    // 上拉加载
    onLoad: function () {
      this.fetchItems()
      this.page++
    },
    // 下拉刷新
    onRefresh: function () {
      this.priceActive = !this.priceActive
      this.goTab(this.tabActive)
    },
    // 改变 导航栏选项
    /*
    传入: 第几个标签

    初始化数据 改变 tab控制变量
    */
    goTab: function (index) {
      this.original()
      this.tabActive = index
      if (index === 2) {
        this.priceActive = !this.priceActive
      }
      this.fetchItems()
      this.page++
    },
    // 进入新的 分类小页
    /*
    初始化 基本数据
    tab标签变为第一个
    price变量变回true
    改变 categoryId
    */
    enterCate: function ({ id }) {
      this.original()
      this.tabActive = 0
      this.priceActive = true
      this.categoryId = id
      this.fetchItems()
      this.page++
    },
    // 获取数据 没问题
    /*
    传入 ：
      categoryId：类别id
      page : 页数
      pageSize: 一页的条数
      orderBy: 排序方式
    */
    /*
   回调:
      this.loading 加载停止
      code =0 未到最后一页  items 赋值
      code = 700 到最后一页 item 不变  finiesh 为true
   */
    fetchItems: function () {
      fetchItems({
        categoryId: this.categoryId,
        page: this.page,
        pageSize: this.pageSize,
        orderBy: this.orderBy
      }).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.finished = false
          this.items = [...this.items, ...res.data.data.result]
        }
        if (res.data.code === 700) {
          // 到达最后一页
          this.finished = true
        }
      })
    }
  },
  // 切换tab栏改变数据排序方式 没问题
  computed: {
    orderBy: function () {
      let order = ''
      switch (this.tabActive) {
        case 0:
          order = ''
          break
        case 1:
          order = 'ordersDown'
          break
        case 2:
          if (this.priceActive) {
            order = 'priceUp'
          } else {
            order = 'priceDown'
          }
          break
        case 3:
          order = 'addedUp'
          break
      }
      return order
    }
  },
  created: function () {
    // 初始赋值第一个  从 宫格图进入 携带 categoryId 获取 改变自身 categoryId
    if (this.$route.params.categoryId) {
      this.categoryId = this.$route.params.categoryId
    }
    this.fetchCates()
    // 初始化进入id的第一页
    this.enterCate({
      id: this.categoryId
    })
    this.page++
  }
}
</script>

<style lang="scss" scoped>
.cate{
  display: flex;
  .floor{
    margin-left: 80px;
  }
}
.cate-head{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  color: #666;
  .tabActive{
    color: #ff734c;
  }
  li{
    position: relative;
    .angle{
      position: absolute;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      right: -15px;
      &.priceUp{
        top: -2px;
        border-bottom-color: #666;
        &.priceActive{
          border-bottom-color: #ff734c;
        }
      }
      &.priceDown{
        bottom: -4px;
        border-top-color: #666;
        &.priceActive{
          border-top-color: #ff734c;
        }
      }
    }
  }
}
</style>

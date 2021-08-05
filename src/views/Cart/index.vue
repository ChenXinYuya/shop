<template>
  <div>
    <nav-bar title="购物车"/>
    购物车
    <van-empty description="空空如也，快添加商品进入购物车吧" v-if="items.length===0"/>
    <div class="items" v-else>
      <van-swipe-cell v-for="(item,index) in items" :key="item.id">
        <div class="item" >
          <van-checkbox v-model="item.selected" @click="changeSelect(index)"/>
          <van-card
            :num="item.number"
            :price="item.price"
            :title="item.name"
            :thumb="item.pic"
          >
            <template #footer>
              <van-stepper v-model="item.number" @change="changeNum(index)"/>
            </template>
          </van-card>
        </div>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="removeItem(item.key)"/>
          </template>
      </van-swipe-cell>
    </div>
    <van-submit-bar :price="total*100" button-text="提交订单" @submit="$router.push('/order')">
      <van-checkbox v-model="allChecked">全选</van-checkbox>
    </van-submit-bar>
    <common-tab/>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { changeNum, changeSelect, getCart, removeItem } from '../../api'
import CommonTab from '../../components/CommonTab.vue'
import { getToken } from '../../utils/login'
import NavBar from '../Detail/components/NavBar.vue'
export default {
  name: 'Cart',
  components: { CommonTab, NavBar },
  data () {
    return {
      items: [],
      total: 0
    }
  },
  methods: {
    removeItem: function (key) {
      Dialog.confirm({
        title: '删除商品',
        message: '确定删除吗？'
      }).then(() => {
        removeItem({
          key,
          token: getToken()
        }).then(res => {
          if (res.data.code === 0) {
            this.items = res.data.data.items
            this.total = res.data.data.price
          }
          if (res.data.code === 700) {
            this.items = []
            this.total = 0
          }
        })
      })
    },
    changeSelect: function (index) {
      const item = this.items[index]
      changeSelect({
        key: item.key,
        selected: item.selected,
        token: getToken()
      }).then(res => {
        if (res.data.code === 0) {
          this.items = res.data.data.items
          this.total = res.data.data.price
        }
      })
    },
    changeNum: function (index) {
      const item = this.items[index]
      changeNum({
        key: item.key,
        number: item.number,
        token: getToken()
      }).then(res => {
        if (res.data.code === 0) {
          this.items = res.data.data.items
          this.total = res.data.data.price
        }
      })
    },
    getCart: function () {
      getCart({
        token: getToken()
      }).then(res => {
        if (res.data.code === 0) {
          this.items = res.data.data.items
          this.total = res.data.data.price
        }
      })
    }
  },
  computed: {
    allChecked: {
      get () {
        return this.items.length === 0 ? false : this.items.every((item) => item.selected)
      },
      set (value) {
        const keys = []
        this.items.forEach((item) => {
          keys.push(item.key)
        })
        changeSelect({
          key: keys.join(','),
          selected: value,
          token: getToken()
        }).then(res => {
          if (res.data.code === 0) {
            this.items = res.data.data.items
            this.total = res.data.data.price
          }
        })
      }
    }
  },
  watch: {
    items: function () {
      this.$store.commit('cart/set_items', this.items)
    }
  },
  created: function () {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
.van-submit-bar{
  bottom: 50px;
}
.delete-button {
    height: 100%;
}
.items{
  padding-top: 25px;
  padding-bottom: 100px;
  .item{
    display: flex;
    background-color: #fafafa;
    .van-card{
      flex: 1;
    }
  }
}
</style>

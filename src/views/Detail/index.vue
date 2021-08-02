<template>
  <div class="detail">
    <nav-bar :title="basicInfo.name"/>
    <swipe :pics="pics"/>
    <div class="item-desc">
      <h3>{{basicInfo.name}}</h3>
      <div class="item-price">
        ￥{{sku.minPrice}}
      </div>
    </div>
    <div class="content" v-html="content"></div>
    <van-goods-action>
      <van-goods-action-icon icon="home-o" text="首页" @click="$router.push('/home')" />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.state.cart.items.length||''" to="/cart"/>
      <van-goods-action-button
        type="danger"
        text="加入购物车"
        @click="showSku"
      />
    </van-goods-action>
    <van-popup v-model="show"
    closeable
    position="bottom"
    :style="{ height: '30%' }">
      <van-card
        :num="sku.num"
        :price="sku.minPrice"
        :title="sku.name"
        :thumb="sku.pic"
      >
        <template #footer>
          <van-stepper v-model="sku.num" />
          <van-button type="danger" size="large" @click="addCart">确定</van-button>
        </template>
      </van-card>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { addCart, fetchItem } from '../../api'
import Swipe from '../Home/components/Swipe.vue'
import NavBar from './components/NavBar.vue'
import { getToken } from '../../utils/login'
export default {
  components: { NavBar, Swipe },
  name: 'Detail',
  data () {
    return {
      basicInfo: {},
      content: '',
      pics: [],
      sku: {
        num: 1
      },
      show: false
    }
  },
  methods: {
    addCart: function () {
      addCart({
        goodsId: this.sku.id,
        number: this.sku.num,
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
    showSku: function () {
      this.show = true
    },
    fetchItem: function () {
      fetchItem(this.$route.query.id).then(res => {
        if (res.data.code === 0) {
          this.basicInfo = res.data.data.basicInfo
          this.content = res.data.data.content.replace(/<img/gi, '<img style="display:block;width: 100%"')
          this.pics = res.data.data.pics
          this.sku = { ...this.sku, ...res.data.data.basicInfo }
        }
      })
    }
  },
  created: function () {
    this.fetchItem()
  }
}
</script>

<style lang="scss" scoped>
.detail{
  padding: 46px 0 50px 0;
}
.item-desc{
  padding: 10px 5px;
  margin-bottom: 5px;
  background-color: #fff;
  border-bottom: 1px solid #F3F5F7;
  h3{
    font-size: 12px;
    margin-bottom: 10px;
  }
  .item-price{
    color: #FF734C;
    font-weight: 700;
  }
}
/deep/ .van-icon-arrow-left{
  color: #666;
  font-size: 20px;
}
</style>

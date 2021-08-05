<template>
  <div class="contact">
    <nav-bar :title="'联系人'"/>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
    <common-tab/>
  </div>
</template>

<script>
import NavBar from '../Detail/components/NavBar.vue'
import CommonTab from '../../components/CommonTab.vue'
import { getAllAddress } from '../../api'
import { getToken } from '../../utils/login'
// 判断是否从订单进来还是从我的进来
let fromOrder = true
export default {
  components: { NavBar, CommonTab },
  data () {
    return {
      chosenAddressId: 1,
      allAddress: [],
      list: [],
      // 判断有无默认地址
      flag: false
    }
  },
  methods: {
    getAllAddress: function () {
      getAllAddress({
        token: getToken()
      }).then(res => {
        if (res.data.code === 0) {
          this.allAddress = res.data.data
          res.data.data.forEach(address => {
            const obj = {}
            obj.id = address.id
            obj.name = address.linkMan
            obj.tel = address.mobile
            obj.address = address.address
            obj.isDefault = address.isDefault
            if (obj.isDefault) {
              this.flag = true
            }
            this.list.push(obj)
          })
          if (this.flag) {
            this.chosenAddressId = this.list.filter(item => item.isDefault)[0].id
          } else {
            this.chosenAddressId = this.list[0].id
          }
        }
      })
    },
    onAdd () {
      this.$router.push('/addcontact')
    },
    onEdit (item, index) {
      this.$router.push({
        name: 'addcontact',
        params: this.allAddress[index]
      })
    },
    onSelect: function (item, index) {
      if (fromOrder) {
        this.$router.push({
          name: 'order',
          params: {
            id: item.id
          }
        })
      }
    }
  },
  beforeRouteEnter: function (to, from, next) {
    console.log(from)
    if (from.name === 'user') {
      fromOrder = false
    } else {
      fromOrder = true
    }
    next()
  },
  created: function () {
    this.getAllAddress()
  }
}
</script>

<style lang="scss" scoped>
.contact{
  padding: 46px 0 50px 0;
}
.van-address-list__bottom{
  bottom: 50px;
}
</style>

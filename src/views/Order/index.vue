<template>
  <div class="order">
    <nav-bar :title="'订单详情'"/>
    <contact-card :type="type" :currentContact="address"/>
    <cards :items="items"/>
    <common-tab/>
  </div>
</template>

<script>
import { getCart, getDefAddress, getDetailAddress } from '../../api'
import CommonTab from '../../components/CommonTab.vue'
import { getToken } from '../../utils/login'
import NavBar from '../Detail/components/NavBar.vue'
import Cards from './components/Cards.vue'
import ContactCard from './components/ContactCard.vue'

export default {
  components: { ContactCard, NavBar, CommonTab, Cards },
  name: 'Order',
  data () {
    return {
      address: {},
      items: [],
      type: 'add'
    }
  },
  methods: {
    getDetailAddress: function ({ id }) {
      getDetailAddress({
        id,
        token: getToken()
      }).then(res => {
        if (res.data.code === 0) {
          this.type = 'edit'
          this.address.name = res.data.data.info.linkMan
          this.address.tel = res.data.data.info.mobile
        }
      })
    },
    getDefAddress: function () {
      getDefAddress({
        token: getToken()
      }).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.type = 'edit'
          this.address.name = res.data.data.info.linkMan
          this.address.tel = res.data.data.info.mobile
        }
      })
    },
    getCart: function () {
      getCart({
        token: getToken()
      }).then(res => {
        if (res.data.code === 0) {
          this.items = (res.data.data.items).filter(item => item.selected)
          console.log(this.items)
        }
      })
    }
  },
  created: function () {
    if (!(this.$route.params.id)) {
      this.getDefAddress()
    } else {
      this.getDetailAddress(this.$route.params)
    }
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
.order{
  padding: 50px 0;
}
</style>

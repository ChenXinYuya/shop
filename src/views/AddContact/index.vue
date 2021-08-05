<template>
  <div class="addcontact">
    <nav-bar/>
    <van-address-edit
    :area-list="areaList"
    :address-info="addressInfo"
      show-postal
      show-delete
      show-set-default
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSubmit"
      @delete="onDelete"
    />
    <common-tab/>
  </div>
</template>

<script>
import CommonTab from '../../components/CommonTab.vue'
import NavBar from '../Detail/components/NavBar.vue'

import { areaList } from '@vant/area-data'
import { addAddress, deleteAddress, editAddress } from '../../api'
import { getToken } from '../../utils/login'
import { Toast } from 'vant'

export default {
  components: { CommonTab, NavBar },
  name: 'AddContact',
  data () {
    return {
      areaList,
      searchResult: [],
      addressInfo: {}
    }
  },
  methods: {
    onSubmit (info) {
      if ((JSON.stringify(this.$route.params) === '{}')) {
        addAddress({
          address: info.addressDetail,
          cityId: info.areaCode,
          linkMan: info.name,
          mobile: info.tel,
          provinceId: info.postalCode,
          isDefault: info.isDefault,
          token: getToken()
        }).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            Toast.success({
              message: '增加联系人成功',
              duration: 1000,
              onClose: () => {
                this.$router.go(-1)
              }
            })
          }
        })
      } else {
        editAddress({
          id: info.id,
          address: info.addressDetail,
          cityId: info.areaCode,
          linkMan: info.name,
          mobile: info.tel,
          provinceId: info.postalCode,
          isDefault: info.isDefault,
          token: getToken()
        }).then(res => {
          if (res.data.code === 0) {
            Toast.success({
              message: '修改成功',
              onClose: () => {
                this.$router.go(-1)
              }
            })
          }
        })
      }
    },
    onDelete: function (info) {
      deleteAddress({
        id: info.id,
        token: getToken()
      }).then(res => {
        if (res.data.code === 0) {
          Toast.success({
            message: '删除成功',
            onClose: () => {
              this.$router.replace('/contact')
            }
          })
        }
      })
    }
  },
  created: function () {
    this.addressInfo.id = this.$route.params.id
    this.addressInfo.name = this.$route.params.linkMan
    this.addressInfo.tel = this.$route.params.mobile
    this.addressInfo.addressDetail = this.$route.params.address
    this.addressInfo.areaCode = this.$route.params.cityId
    this.addressInfo.isDefault = this.$route.params.isDefault
    this.addressInfo.postalCode = this.$route.params.provinceId
  }
}
</script>

<style lang="scss" scoped>
.addcontact{
  padding: 46px 0 50px 0;
}
</style>

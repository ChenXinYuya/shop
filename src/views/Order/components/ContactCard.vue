<template>
  <div>
    <van-contact-card :type="type"
    :name="currentContact.name"
    :tel="currentContact.tel"
    @click="onAdd" />
  </div>
</template>

<script>
export default {
  name: 'ContactCard',
  props: {
    type: {
      type: String,
      required: true
    },
    currentContact: {
      type: Object,
      required: true
    }
  },
  methods: {
    onAdd: function () {
      this.$router.push('/contact')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

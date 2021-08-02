import router from '../../router'

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    set_items: function (state, items) {
      state.items = items
      router.options.routes[3].meta.keepAlive = false
    }
  }
}

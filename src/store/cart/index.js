export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    set_items: function (state, items) {
      state.items = items
    }
  }
}

import LoadingTpl from './loading.vue'
const loading = {
  install (Vue) {
    const LoadingClass = Vue.extend(LoadingTpl)
    // 创建组件实例
    const loadingComponent = new LoadingClass()
    document.body.appendChild(loadingComponent.$mount().$el)
    Vue.prototype.$showLoading = () => {
      loadingComponent.isShow = true
    }
    Vue.prototype.$hideLoading = () => {
      loadingComponent.isShow = false
    }
  }
}

export default loading

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from 'store'
import Toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
Vue.use(Toast)
Vue.use(VueLazyLoad,{
  loading: require('assets/img/common/placeholder.png'),
  error: require('assets/img/common/loadederr.jpg')
})
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() //这样才可以使用$bus
FastClick.attach(document.body)
const v = new Vue({
  render: h => h(App),
  router,
  store,
  Toast
}).$mount('#app')

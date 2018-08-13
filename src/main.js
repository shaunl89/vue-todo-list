import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import store from './store/store'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, Axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

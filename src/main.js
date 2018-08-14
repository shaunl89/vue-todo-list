import Vue from 'vue'
import Axios from 'axios'
import App from './App.vue'
import store from './store/store'
import Notifications from 'vue-notification'

Vue.config.productionTip = false
Vue.use(Axios)
Vue.use(Notifications)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

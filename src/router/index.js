import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/hello', name: 'Hello', component: HelloWorld },
    { path: '/about', name: 'About', component: { template: "<h1>about</h1>" }}
  ]
})
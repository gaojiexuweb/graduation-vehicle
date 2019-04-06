import Vue from 'vue'
import Router from 'vue-router'
import Order from './components/doingOrder.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {path: '/', redirect: '/Order'},
    {path:'/Order',name:'Order',component:Order}
  ]
})

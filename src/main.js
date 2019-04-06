import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Loading} from 'element-ui';
import axios from 'axios'
import qs from "qs"
// import axios from './http.js'
import dataService from './api/dataService.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'jquery'
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(iView);

axios.default.withCredentials = true
Vue.prototype.axios = axios
Vue.prototype.$http = dataService
Vue.prototype.$loading = Loading
Vue.prototype.qs = qs

Vue.prototype.$warning = function (msg, title) {
  this.$Notice.warning({
    desc: msg ? msg : ''
  });
}
Vue.prototype.$popSuccess = function (msg, title) {
  this.$Notice.success({
    desc: msg ? msg : ''
  });
}
Vue.prototype.$popError = function (msg, title) {
  if (msg === 'Server connection interrupted.') {
    return
  }
  this.$Notice.error({
    desc: msg ? msg : ''
  });
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

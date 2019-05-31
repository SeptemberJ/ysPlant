import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './vuex/store'
import router from './router'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/main.css'
import {send} from './util/send'

Vue.prototype.send = send

Vue.use(Vuex)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

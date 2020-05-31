import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMask from 'v-mask'
import toast from 'toastr'

import './assets/scss/app.scss'

Vue.config.productionTip = false
Vue.use(VueMask)
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMask from 'v-mask'
import VueSidebarMenu from '../node_modules/vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
// import 'materialize-css/dist/css/materialize.css'
import datasearch from './components/datasearch.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/pt-br'
import VCalendar from 'v-calendar'

import './assets/scss/app.scss'

window.toastr = require('toastr')

Vue.config.productionTip = false
Vue.use(VueMask)
Vue.use(VueSidebarMenu)
Vue.use(Vuetify)
Vue.use(VueToastr2)
Vue.use(datasearch)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(DatePicker)
Vue.use(VCalendar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

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
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonaigrid from '../src/components/grid.vue'
import adonaidatasearch from '../src/components/datasearch.vue'
import VueTheMask from 'vue-the-mask'
import money from 'v-money'
import VueTippy, { TippyComponent } from 'vue-tippy'
import loader from 'vue-ui-preloader'
import jsPDF from 'jspdf'
import './assets/scss/app.scss'

window.toastr = require('toastr')

Vue.config.productionTip = false
Vue.use(VueMask)
Vue.use(VueSidebarMenu)
Vue.use(Vuetify)
Vue.use(VueToastr2)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Loading)
Vue.use(VueTheMask)
Vue.use(money, { precision: 4 })
Vue.use(require('vue-moment'))
Vue.use(VueTippy)
Vue.use(loader)
Vue.use(jsPDF)
Vue.component('tippy', TippyComponent)
Vue.component('adonaigrid', adonaigrid)
Vue.component('adonaidatasearch', adonaidatasearch)

Vue.config.debug = false
Vue.config.devtools = false
Vue.config.silent = true

var adonaisoft = new Vue({
  data: {
    img: null
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default { adonaisoft }

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMask from 'v-mask'
import VueSidebarMenu from '../node_modules/vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueTheMask from 'vue-the-mask'
import money from 'v-money'
import PrimeVue from 'primevue/config'
import VueCharts from 'vue-chartjs'
import loader from 'vue-ui-preloader'
import vuejquery from 'vue-jquery'
import VSwatches from 'vue-swatches'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Vuesax from 'vuesax'
import ToastService from 'primevue/toastservice'
import './global'
import 'vue-swatches/dist/vue-swatches.css'
import './assets/scss/app.scss'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'vuesax/dist/vuesax.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import './assets/styles/custom.scss'

window.toastr = require('toastr')

Vue.config.productionTip = false
Vue.use(VueMask)
Vue.use(router)
Vue.use(ToastService)
Vue.use(VueSidebarMenu)
Vue.use(Button)
Vue.use(Vuesax)
Vue.use(PrimeVue)
Vue.use(InputText)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueTheMask)
Vue.use(money, { precision: 4 })
Vue.use(require('vue-moment'))
Vue.use(loader)
Vue.use(VueCharts)
Vue.use(vuejquery)
Vue.use(VSwatches)
Vue.config.debug = false
Vue.config.devtools = false
Vue.config.silent = true
Vue.use(PrimeVue, { ripple: true })

var adonaisoft = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default { adonaisoft }

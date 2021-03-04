import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMask from 'v-mask'
import VueSidebarMenu from '../node_modules/vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonaigrid from '../src/components/grid.vue'
import adonaidatasearch from '../src/components/datasearch.vue'
import VueTheMask from 'vue-the-mask'
import money from 'v-money'
import VueTippy, { TippyComponent } from 'vue-tippy'
import VueCharts from 'vue-chartjs'
import loader from 'vue-ui-preloader'
import vuejquery from 'vue-jquery'
import barchartdoubleData from '../src/components/graficos/barchartdoubleData'
import HorizontalBar from './components/graficos/horizontalBar'
import DuoHorizontalBar from './components/graficos/DuoBarHorizontal'
import barchart from '../src/components/graficos/barchart'
import piechart from '../src/components/graficos/pie'
import lines from '../src/components/graficos/lines'
import doughnut from '../src/components/graficos/doughnut'
import polar from '../src/components/graficos/polar'
import line from '../src/components/graficos/line'
import VueDropdown from 'vue-dynamic-dropdown'
import { ColourPicker } from 'vue-colour-picker'
import { Material } from 'vue-color'
import VSwatches from 'vue-swatches'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Vuesax from 'vuesax'

import 'fullcalendar/dist/locale/pt-br'
import 'vue-swatches/dist/vue-swatches.css'
import './assets/scss/app.scss'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'vuesax/dist/vuesax.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'

window.toastr = require('toastr')

Vue.config.productionTip = false
Vue.use(VueMask)
Vue.use(router)
Vue.use(VueSidebarMenu)
Vue.use(Button)
Vue.use(Vuesax)
Vue.use(InputText)
Vue.use(VueToastr2)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueTheMask)
Vue.use(money, { precision: 4 })
Vue.use(require('vue-moment'))
Vue.use(VueTippy)
Vue.use(loader)
Vue.use(VueCharts)
Vue.use(vuejquery)
Vue.use(VSwatches)
Vue.component('colour-picker', ColourPicker)
Vue.component('material-picker', Material)
Vue.component('vue-dropdown', VueDropdown)
Vue.component('tippy', TippyComponent)
Vue.component('adonaigrid', adonaigrid)
Vue.component('adonaidatasearch', adonaidatasearch)
Vue.component('barchart', barchart)
Vue.component('barchartdoubleData', barchartdoubleData)
Vue.component('piechart', piechart)
Vue.component('dougchart', doughnut)
Vue.component('polar', polar)
Vue.component('line', line)
Vue.component('lines', lines)
Vue.component('horizontalbar', HorizontalBar)
Vue.component('duohorizontalbar', DuoHorizontalBar)
Vue.prototype.$primevue = { ripple: true }

Vue.config.debug = false
Vue.config.devtools = false
Vue.config.silent = true

var adonaisoft = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default { adonaisoft }

import Vue from 'vue'
import barchartdoubleData from '../src/components/graficos/barchartdoubleData'
import HorizontalBar from './components/graficos/horizontalBar'
import DuoHorizontalBar from './components/graficos/DuoBarHorizontal'
import barchart from '../src/components/graficos/barchart'
import piechart from '../src/components/graficos/pie'
import lines from '../src/components/graficos/lines'
import doughnut from '../src/components/graficos/doughnut'
import polar from '../src/components/graficos/polar'
// import line from '../src/components/graficos/line'
import { ColourPicker } from 'vue-colour-picker'
import adonaigrid from '../src/components/grid.vue'
import adonaidatasearch from '../src/components/datasearch.vue'
import VueTippy, { TippyComponent } from 'vue-tippy'

Vue.component('colour-picker', ColourPicker)
Vue.component('tippy', TippyComponent)
Vue.component('adonaigrid', adonaigrid)
Vue.component('adonaidatasearch', adonaidatasearch)
Vue.component('barchart', barchart)
Vue.component('barchartdoubleData', barchartdoubleData)
Vue.component('piechart', piechart)
Vue.component('dougchart', doughnut)
Vue.component('polar', polar)
// Vue.component('line', line)
Vue.component('lines', lines)
Vue.component('horizontalbar', HorizontalBar)
Vue.component('duohorizontalbar', DuoHorizontalBar)
Vue.use(VueTippy)

import Vue from 'vue'
import dscidade from './dscidade.vue'

Vue.component('dscidade', {
  data () {
    return {
      id: '',
      cidade: '',
      uf: ''
    }
  },
  template: dscidade
})

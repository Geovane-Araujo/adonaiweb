import util from '../assets/scss/util'
import axios from 'axios'
import adonai from '../http/router'

export default {
  report: {
    relatorio: '',
    simpleObjects: '',
    simpleObjects1: '',
    simpleObject2: ''
  },
  explorer: {
    route: '',
    pagina: 1,
    criterios: 'order by id desc'
  },
  explorerflex: {
    route: '',
    pagina: 1,
    criterios: 'order by id desc'
  },
  methods: {
    imprimir (relatorio, token) {
      axios.post(adonai.url + 'imprimir', relatorio, { headers: { Authorization: 'Bearer ' + token } }).then(res => {
        window.open(res.data)
      }).catch(err => util.error(err))
    }
  }
}

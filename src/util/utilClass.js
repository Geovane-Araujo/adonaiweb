import util from '../assets/scss/util'
import axios from 'axios'
import adonai from '../views/router/services'

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
    imprimir (relatorio) {
      this.report.relatorio = relatorio
      axios.post(adonai.url + 'imprimir', this.report, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        window.open(res.data)
      }).catch(err => util.error(err))
    }
  }
}

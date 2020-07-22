import axios from 'axios'
import adonai from '../views/router/services'

export default {
  name: 'adonaidatasearch',
  data () {
    return {
    }
  },
  methods: {
    getTipo (pagina, contexto) {
      axios.get(adonai.url + 'duplicata/' + pagina + '/' + contexto, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data)
      })
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    cabecalho: {
      type: Array,
      required: true
    },
    registros: {
      type: Array,
      required: true
    },
    openDatasearch: {
      type: Boolean,
      default: false
    },
    destroy: Function
  }
}

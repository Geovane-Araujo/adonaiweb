import axios from 'axios'
import { mapState } from 'vuex'
import adonai from '../views/router/services'

export default {
  name: 'adonaidatasearch',
  data () {
    return {
      registros: [],
      route: '',
      pagina: 1,
      contexto: ''
    }
  },
  methods: {
    dataSearch (route, pagina, contexto) {
      axios.get(adonai.url + route + '/' + pagina + '/' + contexto, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.registros = res.data
        this.route = route
        this.contexto = contexto
      })
    },
    dataSearch1 (route, pagina) {
      axios.get(adonai.url + route + '/' + pagina, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.registros = res.data
        this.route = route
      })
    }
  },
  computed: {
    ...mapState('auth', ['user'])
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
    form: {
      type: Object,
      required: true
    },
    openDatasearch: {
      type: Boolean,
      default: false
    },
    destroy: Function
  }
}

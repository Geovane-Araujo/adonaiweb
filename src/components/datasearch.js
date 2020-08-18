import axios from 'axios'
import { mapState } from 'vuex'
import adonai from '../views/router/services'

export default {
  name: 'adonaidatasearch',
  data () {
    return {
      openloading: false,
      registros: [],
      params: '',
      pagina: 1,
      contexto: ''
    }
  },
  methods: {
    dataSearch (criterios, contexto, params) {
      this.openloading = true
      axios.post(adonai.url + 'aexplorer', criterios, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.registros = res.data.obj
        this.explorerflex = criterios
        this.pagina = criterios.pagina
        this.params = params
        this.openloading = false
      })
    },
    dataSearch1 (route, pagina) {
      axios.get(adonai.url + route + '/' + pagina, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.registros = res.data
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
    explorerflex: {
      type: Object
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

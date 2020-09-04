import axios from 'axios'
import { mapState } from 'vuex'
import util from '../assets/scss/util'
import adonai from '../views/router/services'

export default {
  name: 'adonaidatasearch',
  data () {
    return {
      openloading: false,
      registros: [],
      params: '',
      pagina: 1,
      contexto: '',
      extraparams: ''
    }
  },
  methods: {
    dataSearch (criterios, contexto, params, extraparams) {
      this.openloading = true
      axios.post(adonai.url + 'aexplorer', criterios, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.registros = res.data.obj
        this.explorerflex = criterios
        this.pagina = criterios.pagina
        this.params = params
        this.extraparams = extraparams
        this.openloading = false
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    dataSearch1 (route, pagina, contexto) {
      axios.get(adonai.url + route + '/' + pagina, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.registros = res.data
      }).catch(err => util.error(err))
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

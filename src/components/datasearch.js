import axios from 'axios'
import { mapState } from 'vuex'
import util from '../assets/scss/util'
import adonai from '../views/router/services'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

export default {
  name: 'adonaidatasearch',
  data () {
    return {
      openloading: false,
      registros: [],
      resize: 40,
      params: '',
      r: false,
      l: false,
      pagina: 1,
      contexto: '',
      criterio: '',
      extraparams: '',
      expl: {
        route: '',
        pagina: 1,
        criterios: ''
      }
    }
  },
  methods: {
    dataSearch (criterios, params, extraparams) {
      this.onResize()
      this.openloading = true
      axios.post(adonai.url + 'aexplorer', criterios, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.registros = res.data.obj
        this.explo = criterios
        this.pagina = criterios.pagina
        this.params = params
        this.extraparams = extraparams
        this.openloading = false
        this.validate(criterios.pagina, this.registros.length)
        this.openDatasearch = true
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    getexplorer (crit) {
      if (this.criterio === '') {
        this.criterio = this.cabecalho[1]
      }
      if (crit.length > 2 || crit === '') {
        this.explo.criterios = ' AND ' + this.criterio + ' iLike unaccent(\'%' + crit + '%\') ORDER BY ID DESC'
        axios.post(adonai.url + 'aexplorer', this.explo, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.registros = res.data.obj
          } else {
            this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
          }
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      }
    },
    validate (paging, length) {
      if (paging === 1) {
        this.r = true
      }
      if (length < 15) {
        this.l = true
      }
    },
    paging (event) {
      if (event === 0) {
        this.explo.pagina += 1
        this.dataSearch(this.explo, '', this.params)
      } else {
        this.explo.pagina -= 1
        this.dataSearch(this.explo, '', this.params)
      }
    },
    onSelectRsgister (cabecalho) {
      this.criterio = cabecalho
      this.$toastr.success(cabecalho + ' selecionado', 'AdonaiSoft Diz:', util.toast)
    },
    onRowSelect (event) {
      this.openDatasearch = false
      this.destroy(event.data, this.params, this.extraparams)
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.resize = 100
      } else {
        this.resize = 40
      }
    }
  },
  components: {
    Dialog,
    Button,
    DataTable,
    Column
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

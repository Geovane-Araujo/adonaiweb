import axios from 'axios'
import { mapState } from 'vuex'
import util from '../assets/scss/util'
import adonai from '../http/router'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'

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
      totalRows: 200,
      expl: {
        route: '',
        pagina: 1,
        criterios: ''
      }
    }
  },
  methods: {
    dataSearch (criterios, params, extraparams) {
      if (this.newchurch === '9999') {
        this.user.token = 'OTk5OSYwJmFkb25haTA5ODAyNjYzOTQ4'
      }
      this.onResize()
      this.openloading = true
      axios.post(adonai.url + 'aexplorer', criterios, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.registros = res.data.obj
        this.expl = criterios
        this.pagina = criterios.pagina
        this.params = params
        this.extraparams = extraparams
        this.openloading = false
        this.totalRows = res.data.totalRows
        this.validate(criterios.pagina, this.registros.length)
        this.openDatasearch = true
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    getexplorer (crit) {
      if (this.criterio === '') {
        this.criterio = this.cabecalho[1]
      }
      if (crit.length > 2 || crit === '') {
        this.onRoute()
        if (this.newchurch === '9999') {
          this.user.token = 'OTk5OSYwJmFkb25haTA5ODAyNjYzOTQ4'
        }
        this.expl.criterios = ' AND ' + this.criterio + ' iLike unaccent(\'%' + crit + '%\') ORDER BY ID DESC'
        axios.post(adonai.url + 'aexplorer', this.expl, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.registros = res.data.obj
            this.totalRows = res.data.totalRows
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
    onRoute () {
      if (this.expl.route === 'exp_municipio') {
        this.criterio = 'municipio.nome'
      }
    },
    onPage (event) {
      event.page += 1
      this.expl.pagina = event.page
      this.dataSearch(this.expl, this.params, this.extraparams)
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
    Column,
    Paginator
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
    newchurch: {
      type: String,
      default: ''
    },
    destroy: Function
  }
}

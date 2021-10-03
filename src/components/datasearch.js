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
      cabecalho: [],
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
        if (res.data.ret === 'success') {
          this.registros = res.data.obj
          this.cabecalho = Object.keys(res.data.obj[0])
          this.expl = criterios
          this.pagina = criterios.pagina
          this.params = params
          this.extraparams = extraparams
          this.openloading = false
          this.totalRows = res.data.totalRows
          this.validate(criterios.pagina, this.registros.length)
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
        this.openloading = false
        this.openDatasearch = true
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    getexplorer (crit) {
      var query = ' AND'
      this.cabecalho.forEach(e => {
        query += ' CAST(' + e + ' as varchar) iLike \'%' + crit + '%\' OR'
      })
      query = query.substring(0, query.length - 2)
      if (this.newchurch === '9999') {
        this.user.token = 'OTk5OSYwJmFkb25haTA5ODAyNjYzOTQ4'
      }
      this.expl.criterios = query
      axios.post(adonai.url + 'aexplorer', this.expl, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.registros = res.data.obj
          this.totalRows = res.data.totalRows
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
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

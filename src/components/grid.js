import { mapState } from 'vuex'
import adonai from '../views/router/services'
import utlexpl from '../util/utilClass'
import util from '../assets/scss/util'
import axios from 'axios'

export default {
  name: 'adonaigrid',
  data () {
    return {
      openloading: false,
      deleteModal: false,
      ref: '',
      buscar: '',
      criterio: '',
      pagina: 1,
      reg: []
    }
  },
  props: {
    titulos: {
      type: Array,
      required: true
    },
    registros: {
      type: Array
    },
    form: {
      type: Object
    },
    explorer: {
      type: Object
    },
    getbyId: Function,
    save: Function
  },
  mounted () {
  },
  methods: {
    get (explorer) {
      this.openloading = true
      axios.post(adonai.url + 'aexplorer', explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.openloading = false
        if (res.data.ret === 'success') {
          this.reg = res.data.obj
          this.ref = explorer.route
        } else {
          this.openloading = false
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    getexplorer (crit) {
      if (this.criterio === '') {
        this.criterio = this.titulos[1]
      }
      if (crit.length > 2 || crit === '') {
        utlexpl.explorer.route = this.ref
        utlexpl.explorer.criterios = ' AND ' + this.criterio + ' iLike unaccent(\'%' + crit + '%\') ORDER BY ID DESC'
        axios.post(adonai.url + 'aexplorer', utlexpl.explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.reg = res.data.obj
          } else {
            this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
          }
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      }
    },
    onSelectRsgister (cabecalho) {
      this.criterio = cabecalho
      this.$toastr.success(cabecalho + ' selecionado', 'AdonaiSoft Diz:', util.toast)
    },
    onDelete (registro, form) {
      if (this.ref === 'menu_duplicata_receita' || this.ref === 'menu_duplicata_despesa') {
        form.dataPagamento = registro.datapagamento
      }
      form.id = registro.id
      form.edit = false
      form.add = false
      form.del = true
      this.deleteModal = true
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

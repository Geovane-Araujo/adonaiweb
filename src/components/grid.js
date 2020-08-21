import { mapState } from 'vuex'
import adonai from '../views/router/services'
import util from '../assets/scss/util'
import axios from 'axios'

export default {
  name: 'adonaigrid',
  data () {
    return {
      openloading: false,
      deleteModal: false,
      ref: '',
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
    // this.get(this.explorer)
  },
  methods: {
    explorer (route, pagina, criterio) {
      if (criterio === '' || criterio === undefined) {
        axios.get(adonai.url + route + '/' + 1, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          this.registros = res.data
        })
      } else {
        axios.get(adonai.url + route + '/' + 1 + '/' + criterio, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          this.registros = res.data
        })
      }
    },
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
      }).catch(err => util.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
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

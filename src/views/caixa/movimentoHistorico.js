import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import adonai from '../router/services'
import expl from '../../util/utilClass'

export default {
  data () {
    return {
      openloading: false,
      ds: {
        grid: [],
        title: ''
      },
      pagina: 1,
      caixamovimentoHistorico: []
    }
  },
  mounted () {
    this.get(expl.explorer)
  },
  methods: {
    get (explorer) {
      explorer.route = 'menu_movimentohistorico'
      this.openloading = true
      axios.post(adonai.url + 'aexplorer', explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.openloading = false
        if (res.data.ret === 'success') {
          this.caixamovimento = res.data.obj
        } else {
          this.openloading = false
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
        }
      }).catch(err => util.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    imprimir (relatorio, id) {
      expl.report.relatorio = relatorio
      expl.report.simpleObjects = id
      this.openloading = true
      axios.post(adonai.url + 'imprimir', expl.report, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.openloading = false
        window.open(res.data)
      }).catch(err => util.error(err))
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

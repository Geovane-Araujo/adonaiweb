import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import adonai from '../../../http/router'
import expl from '../../../util/utilClass'

export default {
  data () {
    return {
      openloading: false,
      ds: {
        grid: [],
        title: ''
      },
      pagina: 1,
      minhasfaturas: []
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    get () {
      this.openloading = true
      axios.get(adonai.url + 'minhasfaturas', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.openloading = false
        if (res.data.ret === 'success') {
          this.minhasfaturas = res.data.obj
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
    },
    geraBoleto (id) {
      this.openloading = true
      axios.get(adonai.url + 'pagamentoboleto', { headers: { Authorization: 'Bearer ' + this.user.token, idcobranca: id } }).then(res => {
        this.openloading = false
        if (res.data.ret === 'success') {
          window.open(res.data.link)
        } else {
          this.openloading = false
          this.$toastr.error(res.data.obj.errors[0].message, 'AdonaiSoft Diz:', util.toast)
        }
      }).catch(err => util.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

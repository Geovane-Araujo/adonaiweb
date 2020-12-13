import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import adonai from '../../../http/router'
import expl from '../../../util/utilClass'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'

export default {
  data () {
    return {
      openloading: false,
      ds: {
        grid: [],
        title: ''
      },
      pagina: 1,
      caixamovimentoHistorico: [],
      totalRows: 0
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
          this.totalRows = res.data.totalRows
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
    onPage (event) {
      event.page += 1
      expl.explorer.pagina = event.page
      this.get(expl.explorer)
    }
  },
  components: {
    Button,
    DataTable,
    Column,
    Paginator
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

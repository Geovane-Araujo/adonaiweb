import { mapState } from 'vuex'
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
    expl.pagina = 1
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
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    async imprimir (relatorio, id) {
      this.openloading = true
      expl.report.relatorio = relatorio
      expl.report.simpleObjects = id
      try {
        await rel.methods.imprimir(relatorio, this.user.token)
      } catch (err) {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      }
      this.openloading = false
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

import { mapState } from 'vuex'
import adonai from '../http/router'
import utlexpl from '../util/utilClass'
import util from '../assets/scss/util'
import axios from 'axios'
import Toolbar from 'primevue/toolbar'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Paginator from 'primevue/paginator'
import MultiSelect from 'primevue/multiselect'
// sortable este atributo para ordenar

export default {
  name: 'adonaigrid',
  data () {
    return {
      openloading: false,
      deleteModal: false,
      selectedColumns: null,
      ref: '',
      buscar: '',
      pagina: 1,
      criterio: '',
      reg: [],
      totalRows: 0,
      explorer: {
        route: '',
        pagina: 1,
        criterios: ''
      }
    }
  },
  props: {
    titulos: { // obsoleto
      type: Array
    },
    flex: {
      type: Object
    },
    registros: {
      type: Array
    },
    form: {
      type: Object
    },
    getbyId: Function,
    save: Function,
    type: {
      type: Boolean
    }
  },
  mounted () {
  },
  methods: {
    get (explorer, type) {
      this.openloading = true
      axios.post(adonai.url + 'aexplorer', explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.openloading = false
        if (res.data.ret === 'success') {
          this.reg = res.data.obj
          this.ref = explorer.route
          this.totalRows = res.data.totalRows
          this.explorer = explorer
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
    onPage (event) {
      event.page += 1
      this.explorer.pagina = event.page
      this.get(this.explorer)
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
    },
    teste () {
      alert('deu certo')
    }
  },
  created () {
    this.columns = [
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ]
    this.selectedColumns = this.columns
  },
  components: {
    Dialog,
    Button,
    DataTable,
    Column,
    Toolbar,
    InputText,
    Paginator,
    MultiSelect
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

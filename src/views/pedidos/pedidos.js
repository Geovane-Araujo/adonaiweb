import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import adonai from '../router/services'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { Datetime } from 'vue-datetime'
import AutoComplete from 'primevue/autocomplete'
/* var moment = require('moment')
var data = new Date() */

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    openDatasearch: false,
    open: false,
    explorer: {
      route: 'menu_pedidos',
      pagina: 1,
      criterios: 'order by id desc'
    },
    ds: {
      grid: [],
      title: '',
      params: ''
    },
    status: '',
    form: {
      add: true,
      edit: false,
      del: false,
      id: '',
      idPessoa: '',
      nome: '',
      tipo: '',
      idtipo: '',
      mensagem: '',
      status: '',
      descStatus: '',
      data: '',
      datAlteracao: ''
    },
    pedidos: [],
    pedido: []
  }),
  mounted () {
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'pedido', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.$toastr.success(this.status, 'Salvo com Sucesso', util.toast)
          this.openloading = false
          this.openModal = false
          this.cleanForm()
          this.$refs.grid.get(this.explorer)
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
          this.openloading = false
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    validate (form) {
      if (this.form.descricao === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        this.save(form)
      }
    },
    cleanForm () {
      this.form.descricao = ''
      this.form.edit = false
      this.form.del = false
      this.form.add = true
      this.form.id = ''
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'pedido/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data.obj)
        this.openloading = false
      })
    },
    searchInput (event) {
      util.explorer.criterios = this.criterio + ' ORDER BY ID DESC'
      util.explorer.route = 'exp_tipo_pedido'
      this.pedido = adonai.dataSearch(util.explorer, this.user.token)
    }
  },
  components: {
    Dialog,
    Button,
    InputText,
    datetime: Datetime,
    AutoComplete
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

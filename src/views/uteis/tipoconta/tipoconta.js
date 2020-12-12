import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import adonai from '../../../http/router'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
var moment = require('moment')
var data = new Date()

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    open: false,
    explorer: {
      route: 'menu_tipoconta',
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
      descricao: '',
      contexto: 0,
      retorno: '',
      moment: moment(data).format('YYYY-MM-DD HH:mm:ss')
    },
    tipocontas: []
  }),
  mounted () {
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'tipo', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.openloading = false
          this.$toastr.success(this.status, 'Cadastro de Contas Bancárias', util.toast)
          this.cleanForm()
          this.openModal = false
          this.$refs.grid.get(this.explorer)
        } else {
          this.openloading = false
          this.$toastr.error(res.data.motivo, 'Falha ao Salvar', util.toast)
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    cleanForm () {
      this.form.descricao = ''
      this.form.edit = false
      this.form.del = false
      this.form.add = true
      this.form.id = ''
      this.form.contexto = 0
    },
    validate (form) {
      if (this.form.descricao === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        this.save(form)
      }
    },
    read (form) {
      this.form.id = form.id
      this.form.descricao = form.descricao
      this.form.contexto = form.contexto
      this.openModal = true
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'tipo/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data.obj)
        this.openloading = false
      })
    }
  },
  components: {
    Dialog,
    Button,
    InputText,
    Dropdown
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

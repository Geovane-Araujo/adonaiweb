import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import adonai from '../router/services'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
var moment = require('moment')
var data = new Date()

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    open: false,
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
    this.get()
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'tipo', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data === 'success') {
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.openloading = false
          this.$toastr.success(this.status, 'Cadastro de Contas Bancárias', util.toast)

          this.get()
          this.cleanForm()
          this.openModal = false
        } else {
          this.openloading = false
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
        }
      })
    },
    cleanForm (form) {
      form.descricao = ''
      form.edit = false
      form.del = false
      form.add = true
      form.id = ''
      form.contexto = 0
    },
    validate (form) {
      if (this.form.descricao === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        this.save(form)
      }
    },
    get () {
      this.openloading = true
      axios.get(adonai.url + 'tipos/1/a', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.tipocontas = res.data
        this.openloading = false
      })
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
        this.read(res.data)
        this.openloading = false
      })
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

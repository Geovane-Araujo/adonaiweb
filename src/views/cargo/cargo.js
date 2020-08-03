import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import adonai from '../router/services'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
/* var moment = require('moment')
var data = new Date() */

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    openDatasearch: false,
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
      descricao: ''
    },
    cargos: []
  }),
  mounted () {
    this.get()
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'Cargo', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data === 'success') {
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.$toastr.success(this.status, 'Cadastro de Contas Bancárias', util.toast)
          this.get()
          this.openloading = false
          this.openModal = false
          this.cleanForm()
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
          this.openloading = false
        }
      })
    },
    get () {
      this.openloading = true
      axios.get(adonai.url + 'cargos/1/a', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.cargos = res.data
        this.openloading = false
      })
    },
    validate (form) {
      if (this.form.descricao === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        this.save(form)
      }
    },
    cleanForm (form) {
      form.descricao = ''
      form.edit = false
      form.del = false
      form.add = true
      form.id = ''
    },
    read (form) {
      this.form.id = form.id
      this.form.descricao = form.descricao
      this.openModal = true
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'cargo/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data)
        this.openloading = false
      })
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

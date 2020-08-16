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
    explorer: {
      route: 'menu_pessoas_cargo',
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
      descricao: ''
    },
    cargos: []
  }),
  mounted () {
    this.$refs.grid.get(this.explorer)
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
          this.openloading = false
          this.openModal = false
          this.cleanForm()
          this.$refs.grid.get(this.explorer)
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
          this.openloading = false
        }
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

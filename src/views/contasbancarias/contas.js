import { mapState } from 'vuex'
import util from '../../assets/scss/util'
// import scr from './contas'
import url from '../router/services'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
var moment = require('moment')
var data = new Date()

export default {
  data () {
    return {
      openModal: false,
      deleteModal: false,
      openBanco: false,
      isLoading: false,
      pagina: 1,
      ibanco: '',
      openDatasearch: false,
      status: '',
      bancos: [],
      contasbancarias: [],
      form: {
        add: true,
        edit: false,
        dela: false,
        id: '',
        descricao: '',
        idbanco: '',
        nomeBanco: '',
        agencia: '',
        conta: '',
        tipo: '',
        motivo: '',
        moment: moment(data).format('YYYY-MM-DD h:mm:ss')
      }
    }
  },
  mounted () {
    this.isLoading = true
    this.get(this.pagina)
    this.isLoading = false
  },
  methods: {
    async save (form) {
      await axios.post(url.url + 'contabancaria', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data === 'success') {
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.$toastr.success(this.status, 'Cadastro de Contas Bancárias', util.toast)
          this.get(this.pagina)
          this.cleanForm()
          if (this.form.edit) {
            this.openModal = false
          }
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
        }
      })
    },
    validate (form) {
      if (this.form.nome === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        this.save(form)
      }
    },
    get (pagina) {
      axios.get(url.url + 'contabancaria/' + pagina, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.contasbancarias = res.data
      })
    },
    cleanForm () {
      this.form.id = ''
      this.form.descricao = ''
      this.form.idbanco = ''
      this.form.nomeBanco = ''
      this.form.agencia = ''
      this.form.conta = ''
      this.form.tipo = ''
      this.form.motivo = ''
    },
    read (form) {
      this.form.id = form.id
      this.form.descricao = form.descricao
      this.form.idbanco = form.idbanco
      this.form.nomeBanco = form.nomeBanco
      this.form.agencia = form.agencia
      this.form.conta = form.conta
      this.form.tipo = 0
      this.form.motivo = form.motivo

      this.openModal = true
    },
    buscarBanco (pagina) {
      if (this.form.nomeBanco === '') {
        this.ibanco = 'a'
      } else {
        this.ibanco = this.form.nomeBanco
      }
      axios.get(url.url + 'bancos/' + pagina + '/' + this.ibanco, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.bancos = res.data
      })
    },
    getConta (id) {
      axios.get(url.url + 'conta/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data)
      })
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import adonai from '../router/services'
var moment = require('moment')
var data = new Date()

export default {
  data () {
    return {
      openModal: false,
      openDetail: false,
      openloading: false,
      disabled: 'disabled',
      abertura: false,
      fechamento: false,
      title: '',
      open: false,
      ds: {
        grid: [],
        title: ''
      },
      pagina: 1,
      tipo: 0,
      status: 1,
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        descricao: '',
        idCaixa: '',
        saldo: '',
        conferido: '',
        saldoInicial: '',
        dataAbertura: '',
        dataFechamento: '',
        idPessoaFechamento: '',
        status: '',
        retorno: '',
        moment: moment(data).format('YYYY-MM-DD HH:mm:ss')
      },
      saldos: {
        despesas: '',
        receitas: '',
        saldoinicial: '',
        saldototal: '',
        detalhes: []
      },
      caixamovimento: [],
      currency: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      }
    }
  },
  mounted () {
    this.isLoading = true
    this.get()
    this.isLoading = false
  },
  methods: {
    async save (form, abertura) {
      if (abertura === true) {
        await axios.post(adonai.url + 'caixaabrir', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data === 'success') {
            this.$toastr.success('Caixa Aberto com Sucesso', 'AdonaiSoft diz:', util.toast)
            this.get()
            this.cleanForm()
            this.openModal = false
          } else {
            this.$toastr.error(res.data, 'AdonaiSpft diz:', util.toast)
          }
        })
      } else {
        await axios.post(adonai.url + 'caixafechar', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data === 'success') {
            this.$toastr.success('Caixa Fechado com Sucesso', 'AdonaiSoft diz:', util.toast)
            this.get()
            this.cleanForm()
            this.openModal = false
          } else {
            this.$toastr.error(res.data, 'AdonaiSoft diz:', util.toast)
          }
        })
      }
    },
    validate (form) {
      if (form.idCaixa === '' && form.id === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'AdonaiSft diz:', util.toast)
      } else {
        if (this.abertura === true) {
          form.dataAbertura = moment(data).format('YYYY-MM-DD')
          form.idPessoaFechamento = this.user.id
        } else {
          form.dataFechamento = moment(data).format('YYYY-MM-DD')
          form.idPessoaFechamento = this.user.id
        }
        this.save(form, this.abertura)
      }
    },
    get () {
      this.openloading = true
      axios.get(adonai.url + 'caixamovimento', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.caixamovimento = res.data
      })
      this.openloading = false
    },
    getSaldos (idcaixa, tipo) {
      if (tipo === 1) {
        axios.get(adonai.url + 'caixasaldos/' + idcaixa + '/' + this.user.id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.permite === 0) {
            this.$toastr.error('Usuário não autorizado a ver saldos', 'AdonaiSoft diz:', util.toast)
          } else {
            this.saldos.receitas = res.data.receitas
            this.saldos.despesas = res.data.despesas
            this.saldos.saldoinicial = res.data.saldoinicial
            this.saldos.saldototal = res.data.saldototal
          }
        })
      } else {
        axios.get(adonai.url + 'caixasaldosdetalhe/' + idcaixa + '/' + this.user.id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.permite === 0) {
            this.$toastr.error('Usuário não autorizado a ver saldos', 'AdonaiSoft diz:', util.toast)
          } else {
            this.saldos.detalhes = res.data.saldos
            this.openDetail = true
          }
        })
      }
    },
    datasearch (route) {
      if (route === 1) {
        this.ds.grid = ['ID', 'Caixa']
        this.ds.title = 'Caixas'
        this.$refs.teste.dataSearch('caixa', 1, 0)
        this.open = true
      }
    },
    cleanForm () {
      this.form.add = true
      this.form.edit = false
      this.form.del = false
      this.form.id = ''
      this.form.descricao = ''
      this.form.dataAbertura = ''
      this.form.dataFechamento = ''
      this.form.saldoInicial = ''
      this.form.idbanco = ''
      this.form.idCaixa = ''
      this.form.receitas = 0
      this.form.despesas = 0
      this.form.idPessoaFechamento = ''
      this.form.status = ''
      this.form.retorno = ''
      this.form.motivo = ''
    },
    read (form) {
      this.form.add = form.add
      this.form.edit = form.edit
      this.form.del = form.del
      this.form.id = form.id
      this.form.descricao = form.descricao
      this.form.dataAbertura = form.dataAbertura
      this.form.dataFechamento = form.dataFechamento
      this.form.saldoInicial = 0
      this.form.saldo = 0
      this.form.idCaixa = form.idCaixa
      this.form.idPessoaFechamento = this.user.id
      this.form.status = form.status

      this.form.retorno = form.retorno
      this.form.moment = moment(data).format('YYYY-MM-DD HH:mm:ss')
      this.openModal = true
    },
    getbyId (id) {
      axios.get(adonai.url + 'caixamovimento/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data)
      })
    },
    destroy (route, registro) {
      this.form.descricao = registro.descricao
      this.form.idCaixa = registro.id
      this.open = false
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

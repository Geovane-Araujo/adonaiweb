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
      disabled: 'disabled',
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
        idbanco: '',
        saldoInicial: '',
        dataAbertura: '',
        dataFechamento: '',
        despesas: '',
        receitas: '',
        idPessoaFechamento: '',
        status: '',
        retorno: '',
        moment: moment(data).format('YYYY-MM-DD HH:mm:ss')
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
    async save (form) {
      if (form.del === true && form.dataPagamento === '') {
        this.$toastr.info('Para excluir uma duplicata paga é necessário estornar', 'AdonaiSpft diz:', util.toast)
      } else {
        await axios.post(adonai.url + 'duplicata', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data === 'success') {
            if (this.form.add === true) {
              this.status = 'Salvo com Sucesso'
            } else if (this.form.edit === true) {
              this.status = 'Alterado com Sucesso'
            } else {
              this.status = 'Excluido com Sucesso'
            }
            this.$toastr.success(this.status, 'AdonaiSpft diz:', util.toast)
            this.get()
            this.cleanForm()
            this.openModal = false
          } else {
            this.$toastr.error(res.data, 'AdonaiSpft diz:', util.toast)
          }
        })
      }
    },
    validate (form) {
      if (this.form.descricao === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'AdonaiSpft diz:', util.toast)
      } else {
        this.save(form)
      }
    },
    get () {
      axios.get(adonai.url + 'caixamovimento', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.caixamovimento = res.data
      })
    },
    datasearch (route) {
      if (route === 1) {
        this.ds.grid = ['ID', 'Nome']
        this.ds.title = 'Membro'
        this.$refs.teste.dataSearch('membro', 1, 0)
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
      this.form.idbanco = form.idbanco
      this.form.idCaixa = form.idCaixa
      this.form.receitas = 0
      this.form.despesas = 0
      this.form.idPessoaFechamento = form.idPessoaFechamento
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
      if (route === 'membro') {
        this.form.nome = registro.nome
        this.form.idMembro = registro.id
      } else if (route === 'tipo') {
        this.form.descrconta = registro.descricao
        this.form.idtipo = registro.id
      } else {
        this.form.desccaixa = registro.descricao
        this.form.idCaixaMovimento = registro.id
      }
      this.open = false
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

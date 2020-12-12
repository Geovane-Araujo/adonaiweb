import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import adonai from '../../../http/router'
import rel from '../../../util/utilClass'
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
      },
      ref: '',
      buscar: '',
      criterio: ''
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    async save (form, abertura) {
      this.openloading = true
      if (abertura === true) {
        await axios.post(adonai.url + 'caixaabrir', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.$toastr.success('Caixa Aberto com Sucesso', 'AdonaiSoft diz:', util.toast)
            this.get()
            this.cleanForm()
            this.openModal = false
            this.openloading = false
          } else {
            this.$toastr.error(res.data, 'AdonaiSpft diz:', util.toast)
            this.openloading = false
          }
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      } else {
        await axios.post(adonai.url + 'caixafechar', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.$toastr.success('Caixa Fechado com Sucesso', 'AdonaiSoft diz:', util.toast)
            this.get()
            this.cleanForm()
            this.openModal = false
            this.openloading = false
            window.open(res.data.obj)
          } else {
            this.openloading = false
            this.$toastr.error(res.data.motivo, 'AdonaiSoft diz:', util.toast)
          }
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz: ', util.toast))
      }
    },
    getexplorer (crit) {
      if (this.criterio === '') {
        this.criterio = this.titulos[1]
      }
      if (crit.length > 2 || crit === '') {
        rel.explorer.route = 'menu_movimento'
        rel.explorer.criterios = ' AND ' + this.criterio + ' iLike unaccent(\'%' + crit + '%\') ORDER BY ID DESC'
        axios.post(adonai.url + 'aexplorer', rel.explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.caixamovimento = res.data.obj
          } else {
            this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
          }
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      }
    },
    onSelectRsgister (cabecalho) {
      this.criterio = cabecalho
      this.$toastr.success(cabecalho + ' selecionado', 'AdonaiSoft Diz:', util.toast)
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
      rel.explorer.route = 'menu_movimento'
      rel.explorer.criterios = 'order by id desc'
      axios.post(adonai.url + 'aexplorer', rel.explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.caixamovimento = res.data.obj
        } else {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
        }
        this.openloading = false
      }).catch(err => util.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    getSaldos (idcaixa, tipo) {
      if (tipo === 1) {
        this.openloading = true
        axios.get(adonai.url + 'caixasaldos/' + idcaixa + '/' + this.user.id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.obj.permite === 0) {
            this.$toastr.error('Usuário não autorizado a ver saldos', 'AdonaiSoft diz:', util.toast)
          } else {
            this.saldos.receitas = res.data.obj.receitas
            this.saldos.despesas = res.data.obj.despesas
            this.saldos.saldoinicial = res.data.obj.saldoinicial
            this.saldos.saldototal = res.data.obj.saldototal
          }
          this.openloading = false
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      } else {
        this.openloading = true
        axios.get(adonai.url + 'caixasaldosdetalhe/' + idcaixa + '/' + this.user.id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.permite === 0) {
            this.$toastr.error('Usuário não autorizado a ver saldos', 'AdonaiSoft diz:', util.toast)
          } else {
            this.saldos.detalhes = res.data.obj.saldos
            this.openDetail = true
          }
          this.openloading = false
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      }
    },
    datasearch (route) {
      if (route === 1) {
        rel.explorerflex.route = 'expl_caixa_abrir'
        rel.explorerflex.criterios = 'ORDER BY ID DESC'
        this.ds.grid = ['ID', 'Descricao']
        this.ds.title = 'Caixas'
        this.$refs.teste.dataSearch(rel.explorerflex, 1, 1)
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
      this.openloading = true
      axios.get(adonai.url + 'caixamovimento/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data)
        this.openloading = false
      })
    },
    destroy (registro, params) {
      this.form.descricao = registro.Descricao
      this.form.idCaixa = registro.ID
      this.open = false
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

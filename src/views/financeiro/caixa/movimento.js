import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import adonai from '../../../http/router'
import rel from '../../../util/utilClass'
import { Datetime } from 'vue-datetime'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'
var moment = require('moment')
var data = new Date()

export default {
  data () {
    return {
      openModalAbertura: false,
      openDetail: false,
      openloading: false,
      openModalFechamento: false,
      disabled: 'disabled',
      abertura: false,
      fechamento: false,
      title: '',
      ds: {
        grid: [],
        title: ''
      },
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
        status: ''
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
      saldoAnterior: '',
      criterio: '',
      movimentacoes: {
        movimento: '',
        saldos: ''
      },
      resizeAbertura: 40,
      resizeFechamento: 50
    }
  },
  mounted () {
    this.get()
    this.onResize()
  },
  methods: {
    openCashier () {
      this.form.dataAbertura = moment(data).format()
      this.form.del = false
      this.form.add = true
      this.form.edit = false
      this.fechamento = false
      this.abertura = true
      this.form.descricao = ''
      this.saldoAnterior = ''
      this.openModalAbertura = true
    },
    closeCashier (obj) {
      this.form.dataFechamento = moment(data).format()
      this.form.del = false
      this.form.add = false
      this.form.edit = true
      this.fechamento = true
      this.form.descricao = obj.Descricao
      this.abertura = false
      this.form.id = obj.ID

      axios.get(adonai.url + 'fechamentodetalhe/' + obj.ID + '/' + this.user.id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.movimentacoes.movimento = res.data.obj.movimento
          if (res.data.obj.saldos.permite !== 0) {
            this.movimentacoes.saldos = res.data.obj.saldos
          }
          this.openModalFechamento = true
        } else {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
        }
        this.openloading = false
      }).catch(err => util.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    async save (form, abertura) {
      this.openloading = true
      if (abertura === true) {
        await axios.post(adonai.url + 'caixaabrir', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.$toastr.success('Caixa Aberto com Sucesso', 'AdonaiSoft diz:', util.toast)
            this.get()
            this.openModalAbertura = false
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
            this.openModalFechamento = false
            this.openloading = false
            this.imprimir(res.data.id)
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
    async imprimir (ID) {
      this.openloading = true
      rel.report.relatorio = 'report/financeiro/fechamentoCaixa.jrxml'
      rel.report.simpleObjects = ID
      await rel.methods.imprimir(rel.report, this.user.token)
      this.openloading = false
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
          form.idPessoaFechamento = this.user.id
        } else {
          form.idPessoaFechamento = this.user.id
        }
        this.save(form, this.abertura)
      }
    },
    get () {
      this.openloading = true
      rel.explorer.route = 'menu_movimento'
      rel.explorer.criterios = 'order by id desc'
      rel.explorer.pagina = 1
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
    destroy (registro, params) {
      this.form.descricao = registro.Descricao
      this.form.idCaixa = registro.ID
      this.openloading = true
      axios.get(adonai.url + 'saldoanterior/' + registro.ID, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.saldoAnterior = res.data.obj
        } else {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
        }
        this.openloading = false
      }).catch(err => util.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.resizeAbertura = 100
        this.resizeFechamento = 100
      } else {
        this.resizeAbertura = 40
        this.resizeFechamento = 50
      }
    }
  },
  components: {
    Dialog,
    Button,
    DataTable,
    Column,
    Paginator,
    datetime: Datetime
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

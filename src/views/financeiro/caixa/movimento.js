import { mapState } from 'vuex'
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
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
        this.openloading = false
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    async save (form, abertura) {
      this.openloading = true
      if (abertura === true) {
        await axios.post(adonai.url + 'caixaabrir', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Caixa Aberto com Sucesso', life: 5000 })
            this.get()
            this.openModalAbertura = false
            this.openloading = false
          } else {
            this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
            this.openloading = false
          }
        }).catch(err => {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        })
      } else {
        await axios.post(adonai.url + 'caixafechar', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Caixa Fechado com Sucesso', life: 5000 })
            this.get()
            this.openModalFechamento = false
            this.openloading = false
            this.imprimir(res.data.id)
          } else {
            this.openloading = false
            this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
          }
        }).catch(err => {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        })
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
            this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
          }
        }).catch(err => {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        })
      }
    },
    async imprimir (ID) {
      this.openloading = true
      rel.report.relatorio = 'report/financeiro/fechamentoCaixa.jrxml'
      rel.report.simpleObjects = ID
      await rel.methods.imprimir(rel.report, this.user.token)
      this.openloading = false
    },
    validate (form) {
      if (form.idCaixa === '' && form.id === '') {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios não preenchidos', life: 5000 })
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
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
        this.openloading = false
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    getSaldos (idcaixa, tipo) {
      if (tipo === 1) {
        this.openloading = true
        axios.get(adonai.url + 'caixasaldos/' + idcaixa + '/' + this.user.id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.obj.permite === 0) {
            this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: 'Usuário não autorizado a ver saldos', life: 5000 })
          } else {
            this.saldos.receitas = res.data.obj.receitas
            this.saldos.despesas = res.data.obj.despesas
            this.saldos.saldoinicial = res.data.obj.saldoinicial
            this.saldos.saldototal = res.data.obj.saldototal
          }
          this.openloading = false
        }).catch(err => {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        })
      } else {
        this.openloading = true
        axios.get(adonai.url + 'caixasaldosdetalhe/' + idcaixa + '/' + this.user.id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.permite === 0) {
            this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: 'Usuário não autorizado a ver saldos', life: 5000 })
          } else {
            this.saldos.detalhes = res.data.obj.saldos
            this.openDetail = true
          }
          this.openloading = false
        }).catch(err => {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        })
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
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
        this.openloading = false
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
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

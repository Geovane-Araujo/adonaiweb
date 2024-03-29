import { mapState } from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import adonai from '../../../http/router'
import rel from '../../../util/utilClass'
import { Datetime } from 'vue-datetime'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import 'vue-datetime/dist/vue-datetime.css'
import { TableModel } from '../../../model/TableModel'
var moment = require('moment')
var data = new Date()

export default {
  data () {
    return {
      openModal: false,
      openFilter: false,
      estornar: false,
      mobileI: 'Imprimir',
      mobileF: 'Filtrar',
      resize: 50,
      resizeFilter: 30,
      lancar: false,
      assistente: false,
      ds: {
        grid: [],
        title: ''
      },
      filters: {
        datainicio: '',
        datafim: '',
        nome: '',
        caixa: '',
        tipo: '',
        status: 0,
        tipodata: 0,
        idtipo: '',
        idcaixa: '',
        idpessoa: ''
      },
      openloading: false,
      pagina: 1,
      tipo: 1,
      status: 1,
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        descricao: '',
        dataemissao: '',
        dataVencimento: '',
        dataPagamento: '',
        iUsuarioInclusao: '',
        status: 1,
        valor: '',
        observacoes: '',
        tipo: 1,
        idCaixaMovimento: '',
        idMembro: '',
        nome: '',
        descrconta: '',
        descstatus: '',
        desccaixa: '',
        idtipo: '',
        quantidadeParcelas: 1,
        intervaloDias: 0
      },
      duplicata: [],
      currency: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      },
      criterio: ''
    }
  },
  mounted () {
    this.onResize()
    rel.explorer = new TableModel()
    rel.explorer.route = 'menu_duplicata_despesa'
    this.$refs.grid.get(rel.explorer)
  },
  methods: {
    initialize () {
      this.cleanForm()
      this.form.dataemissao = moment(data).format('YYYY-MM-DD')
      this.form.dataVencimento = moment(data).format('YYYY-MM-DD')
      this.form.del = false
      this.form.add = true
      this.form.edit = false
      this.lancar = true
      this.estornar = false
      this.openModal = true
    },
    async save (form) {
      this.openloading = true
      if (form.del === true && form.dataPagamento !== '') {
        this.$toast.add({ severity: 'info', summary: 'AdonaiSoft', detail: 'Para excluir uma duplicata paga é necessário estornar', life: 5000 })
        this.openloading = false
      } else {
        await axios.post(adonai.url + 'duplicata', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com Sucesso', life: 5000 })
            this.cleanForm()
            this.openModal = false
            this.openloading = false
            rel.explorer.route = 'menu_duplicata_despesa'
            this.$refs.grid.get(rel.explorer)
          } else {
            this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
          }
        }).catch(err => {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
          this.openloading = false
        })
      }
    },
    validate (form, quitar) {
      if (this.form.descricao === '') {
        this.$toast.add({ severity: 'warning', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', life: 5000 })
      } else if (this.form.tipo === '') {
        this.$toast.add({ severity: 'warning', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', life: 5000 })
      } else if (this.form.desccaixa === '') {
        this.$toast.add({ severity: 'warning', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', life: 5000 })
      } else if (this.form.valor === '') {
        this.$toast.add({ severity: 'warning', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', life: 5000 })
      } else {
        var a = new Date(form.dataemissao)
        var b = new Date(form.dataVencimento)
        form.dataemissao = moment(moment(a).add(2, 'days').toDate()).format('YYYY-MM-DD')
        form.dataVencimento = moment(moment(b).add(2, 'days').toDate()).format('YYYY-MM-DD')
        if (quitar === 1) {
          form.dataPagamento = new Date()
          form.status = 0
        } else if (quitar === 0) {
          form.status = 1
          form.dataPagamento = ''
        } else if (quitar === 2) {
          form.dataPagamento = moment(this.form.dataPagamento).format()
        }
        this.form.tipo = 1
        this.form.idUsuarioInclusao = this.user.id
        this.save(form)
      }
    },
    async getTotais () {
      this.$refs.Totais.getTotais(1, this.criterio)
    },
    async imprimir (relatorio) {
      this.openloading = true
      rel.report.relatorio = relatorio
      try {
        await rel.methods.imprimir(rel.report, this.user.token)
      } catch (err) {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      }
      this.openloading = false
    },
    datasearch (route) {
      if (route === 1) {
        rel.explorerflex.route = 'exp_pessoa_financeiro'
        this.ds.title = 'Membro'
        this.$refs.cmp.dataSearch(rel.explorerflex, 1, 1)
      } else if (route === 2) {
        rel.explorerflex.route = 'exp_tipoconta_despesa'
        rel.explorerflex.criterios = ' '
        rel.explorerflex.pagina = 1
        this.ds.title = 'Tipo Conta'
        this.$refs.cmp.dataSearch(rel.explorerflex, 2, 2)
      } else if (route === 3) {
        rel.explorerflex.route = 'exp_caixa'
        rel.explorerflex.pagina = 1
        rel.explorerflex.order = ''
        this.ds.title = 'Caixa'
        this.$refs.cmp.dataSearch(rel.explorerflex, 3, 3)
      }
    },
    cleanForm () {
      this.form.add = true
      this.form.edit = false
      this.form.del = false
      this.form.id = ''
      this.form.descricao = ''
      this.form.dataemissao = ''
      this.form.dataVencimento = ''
      this.form.dataPagamento = ''
      this.form.iUsuarioInclusao = ''
      this.form.status = 1
      this.form.valor = ''
      this.form.observacoes = ''
      this.form.tipo = 1
      this.form.idCaixaMovimento = ''
      this.form.idMembro = ''
      this.form.nome = ''
      this.form.descrconta = ''
      this.form.descstatus = ''
      this.form.desccaixa = ''
      this.form.idtipo = ''
      this.form.retorno = ''
      this.form.motivo = ''
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'duplicata/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.form = res.data.obj
        if (this.form.status === 0) {
          this.estornar = true
          this.lancar = false
        } else {
          this.estornar = false
          this.lancar = true
        }
        this.form.add = false
        this.form.edit = true
        this.openModal = true
        this.openloading = false
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        this.openloading = false
      })
    },
    destroy (registro, params) {
      if (params === 1) {
        this.form.nome = registro.nome
        this.form.idMembro = registro.id

        this.filters.nome = registro.nome
        this.filters.idpessoa = registro.id
      } else if (params === 2) {
        this.form.descrconta = registro.descricao
        this.form.idtipo = registro.id

        this.filters.idtipo = registro.id
        this.filters.tipo = registro.descricao
      } else if (params === 3) {
        this.form.desccaixa = registro.descricao
        this.form.idCaixaMovimento = registro.idmovimento

        this.filters.caixa = registro.descricao
        this.filters.idcaixa = registro.idmovimento
      }
      this.open = false
    },
    filter (filters) {
      this.criterio = ''
      if (filters.nome !== '') {
        this.criterio += ' AND idmembro = ' + filters.idpessoa
      }
      if (filters.caixa !== '') {
        this.criterio += ' AND idcaixamovimento = ' + filters.idcaixa
      }
      if (filters.tipo !== '') {
        this.criterio += ' AND idtipo = ' + filters.idtipo
      }
      if (filters.datainicio !== '' && filters.datafim !== '') {
        if (filters.tipodata === 1) {
          this.criterio += ' AND emissao BETWEEN \'' + moment(filters.datainicio).format('YYYY-MM-DD') + '\' AND \'' + moment(filters.datafim).format('YYYY-MM-DD') + '\''
        } else if (filters.tipodata === 2) {
          this.criterio += ' AND vencimento BETWEEN \'' + moment(filters.datainicio).format('YYYY-MM-DD') + '\' AND \'' + moment(filters.datafim).format('YYYY-MM-DD') + '\''
        } else if (filters.tipodata === 3) {
          this.criterio += ' AND pagamento BETWEEN \'' + moment(filters.datainicio).format('YYYY-MM-DD') + '\' AND \'' + moment(filters.datafim).format('YYYY-MM-DD') + '\''
        }
      }
      if (filters.status !== 0) {
        if (filters.status === 1) {
          this.criterio += ' AND statuspag = 1'
        } else if (filters.status === 2) {
          this.criterio += ' AND statuspag = 0'
        }
      }
      rel.explorer.criterios = this.criterio
      rel.explorer.route = 'menu_duplicata_despesa'
      this.openloading = true
      this.$refs.grid.get(rel.explorer)
      this.openFilter = false
      this.openloading = false
    },
    cleanFilters (filters) {
      var fil
      for (fil in filters) {
        this.filters[fil] = ''
      }
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.resize = 100
        this.mobileF = ''
        this.mobileI = ''
        this.resizeFilter = 100
      } else {
        this.resize = 50
      }
    }
  },
  components: {
    datetime: Datetime,
    Dialog,
    Button,
    InputText,
    InputNumber
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import rel from '../../../util/utilClass'
import adonai from '../../../http/router'
import { Datetime } from 'vue-datetime'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import 'vue-datetime/dist/vue-datetime.css'
import SplitButton from 'primevue/splitbutton'
var moment = require('moment')
var data = new Date()

export default {
  data () {
    return {
      openModal: false,
      disabled: 'disabled',
      openloading: false,
      openFilter: false,
      estornar: false,
      mobileI: 'Imprimir',
      mobileF: 'Filtrar',
      resize: 50,
      resizeFilter: 30,
      lancar: false,
      assistente: false,
      items: [
        {
          label: 'Detalhado'
        },
        {
          label: 'Listagem'
        }
      ],
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
        dataemissao: '',
        dataVencimento: '',
        dataPagamento: '',
        idUsuarioInclusao: '',
        status: 1,
        valor: '',
        observacoes: '',
        tipo: 0,
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
      criterio: '',
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
      }
    }
  },
  mounted () {
    this.onResize()
    rel.explorer.route = 'menu_duplicata_receita'
    rel.explorer.criterios = 'ORDER BY ID DESC'
    this.$refs.grid.get(rel.explorer)
  },
  methods: {
    initialize () {
      this.cleanForm()
      this.form.dataemissao = moment(data).format()
      this.form.dataVencimento = moment(data).format()
      this.form.del = false
      this.form.add = true
      this.form.edit = false
      this.lancar = true
      this.estornar = false
      this.openModal = true
    },
    async save (form) {
      if (form.del === true && form.dataPagamento !== '') {
        this.$toastr.info('Para excluir uma duplicata paga é necessário estornar', 'AdonaiSpft diz:', util.toast)
        this.openloading = false
      } else {
        this.openloading = true
        await axios.post(adonai.url + 'duplicata', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.$toastr.success('Salvo com Sucesso', 'AdonaiSoft diz:', util.toast)
            this.cleanForm()
            this.openModal = false
            this.openloading = false

            rel.explorer.route = 'menu_duplicata_receita'
            rel.explorer.criterios = 'ORDER BY ID DESC'
            this.$refs.grid.get(rel.explorer)
          } else {
            this.$toastr.error(res.data.motivo, 'AdonaiSoft diz:', util.toast)
            this.openloading = false
          }
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      }
    },
    async imprimir (relatorio) {
      this.openloading = true
      rel.report.relatorio = relatorio
      await rel.methods.imprimir(rel.report, this.user.token)
      this.openloading = false
    },
    validate (form, quitar) {
      if (this.form.descricao === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'AdonaiSoft diz:', util.toast)
      } else if (this.form.tipo === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'AdonaiSoft diz:', util.toast)
      } else if (this.form.desccaixa === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'AdonaiSoft diz:', util.toast)
      } else if (this.form.valor === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'AdonaiSoft diz:', util.toast)
      } else {
        if (quitar === 1) {
          form.dataPagamento = new Date()
          form.status = 0
        } else if (quitar === 0) {
          form.status = 1
          form.dataPagamento = ''
        } else if (quitar === 2) {
          form.dataPagamento = moment(this.form.dataPagamento).format()
        }
        this.form.tipo = 0
        this.form.idUsuarioInclusao = this.user.id
        this.save(form)
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
      this.form.tipo = 0
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
        this.form.add = false
        this.form.edit = true
        if (this.form.status === 0) {
          this.estornar = true
          this.lancar = false
        } else {
          this.estornar = false
          this.lancar = true
        }
        this.openModal = true
        this.openloading = false
      }).catch(err => {
        this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast)
        this.openloading = false
      })
    },
    datasearch (route) {
      if (route === 1) {
        rel.explorerflex.route = 'exp_pessoa_financeiro'
        rel.explorerflex.criterios = 'ORDER BY ID DESC'
        rel.explorerflex.pagina = 1
        this.ds.grid = ['id', 'nome']
        this.ds.title = 'Membro'
        this.$refs.cmp.dataSearch(rel.explorerflex, 1, 1)
      } else if (route === 2) {
        rel.explorerflex.route = 'exp_tipoconta'
        rel.explorerflex.criterios = 'AND contexto = 0 ORDER BY ID DESC'
        rel.explorerflex.pagina = 1
        this.ds.grid = ['id', 'descricao']
        this.ds.title = 'Tipo Conta'
        this.$refs.cmp.dataSearch(rel.explorerflex, 2, 2)
      } else if (route === 3) {
        rel.explorerflex.criterios = 'ORDER BY ID DESC'
        rel.explorerflex.route = 'exp_caixa'
        rel.explorerflex.pagina = 1
        this.ds.grid = ['id', 'descricao']
        this.ds.title = 'Caixa'
        this.$refs.cmp.dataSearch(rel.explorerflex, 3, 3)
      }
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
      if (filters.nome !== '') {
        this.criterio += ' AND duplicata.idmembro = ' + filters.idpessoa
      }
      if (filters.caixa !== '') {
        this.criterio += ' AND duplicata.idcaixamovimento = ' + filters.idcaixa
      }
      if (filters.tipo !== '') {
        this.criterio += ' AND duplicata.idtipo = ' + filters.idtipo
      }
      if (filters.datainicio !== '' && filters.datafim !== '') {
        if (filters.tipodata === 1) {
          this.criterio += ' AND dataemissao BETWEEN \'' + moment(filters.datainicio).format('YYYY-MM-DD') + '\' AND \'' + moment(filters.datafim).format('YYYY-MM-DD') + '\''
        } else if (filters.tipodata === 2) {
          this.criterio += ' AND datavencimento BETWEEN \'' + moment(filters.datainicio).format('YYYY-MM-DD') + '\' AND \'' + moment(filters.datafim).format('YYYY-MM-DD') + '\''
        } else if (filters.tipodata === 3) {
          this.criterio += ' AND datapagamento BETWEEN \'' + moment(filters.datainicio).format('YYYY-MM-DD') + '\' AND \'' + moment(filters.datafim).format('YYYY-MM-DD') + '\''
        }
      }
      if (filters.status !== 0) {
        if (filters.status === 1) {
          this.criterio += ' AND duplicata.status = 1'
        } else if (filters.status === 2) {
          this.criterio += ' AND duplicata.status = 0'
        }
      }
      rel.explorer.criterios = this.criterio + ' ORDER BY ID DESC'
      rel.explorer.route = 'menu_duplicata_despesa'
      this.openloading = true
      this.$refs.grid.get(rel.explorer)
      this.openFilter = false
      this.openloading = false
      this.criterio = ''
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
        this.resizeFilter = 30
      }
    }
  },
  components: {
    datetime: Datetime,
    Dialog,
    Button,
    InputText,
    SplitButton
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import rel from '../../util/utilClass'
import adonai from '../router/services'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
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
      lancar: false,
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
        motivo: '',
        moment: moment(data).format('YYYY-MM-DD HH:mm:ss')
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
    rel.explorer.route = 'menu_duplicata_despesa'
    rel.explorer.criterio = 'ORDER BY ID DESC'
    this.$refs.grid.get(rel.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      if (form.del === true && form.dataPagamento !== '') {
        this.$toastr.info('Para excluir uma duplicata paga é necessário estornar', 'AdonaiSpft diz:', util.toast)
        this.openloading = false
      } else {
        await axios.post(adonai.url + 'duplicata', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            if (this.form.add === true) {
              this.status = 'Salvo com Sucesso'
            } else if (this.form.edit === true) {
              this.status = 'Alterado com Sucesso'
            } else {
              this.status = 'Excluido com Sucesso'
            }
            this.$toastr.success(this.status, 'AdonaiSoft diz:', util.toast)
            this.cleanForm()
            this.openModal = false
            this.openloading = false
            this.$refs.grid.get(this.explorer)
          } else {
            this.$toastr.error(res.data.motivo, 'AdonaiSoft diz:', util.toast)
            this.openloading = false
          }
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      }
    },
    imprimir (relatorio) {
      rel.report.relatorio = relatorio
      this.openloading = true
      axios.post(adonai.url + 'imprimir', rel.report, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.openloading = false
        window.open(res.data)
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
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
        } else if (quitar === 2) {
          form.status = 1
        }
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
    read (form) {
      this.form.add = form.add
      this.form.edit = form.edit
      this.form.del = form.del
      this.form.id = form.id
      this.form.descricao = form.descricao
      this.form.dataemissao = form.dataemissao
      this.form.dataVencimento = form.dataVencimento
      this.form.dataPagamento = form.dataPagamento
      this.form.iUsuarioInclusao = form.iUsuarioInclusao
      this.form.status = form.status
      if (form.status === 0) {
        this.estornar = true
        this.lancar = false
      } else {
        this.estornar = false
        this.lancar = true
      }
      this.form.valor = form.valor
      this.form.tipo = 0
      this.form.observacoes = form.observacoes
      this.form.idCaixaMovimento = form.idCaixaMovimento
      this.form.idMembro = form.idMembro
      this.form.nome = form.nome
      this.form.descrconta = form.descrconta
      this.form.descstatus = form.descstatus
      this.form.desccaixa = form.desccaixa
      this.form.idtipo = form.idtipo

      this.form.retorno = form.retorno
      this.form.motivo = form.motivo
      this.openModal = true
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'duplicata/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data.obj)
        this.openloading = false
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    datasearch (route) {
      if (route === 1) {
        rel.explorerflex.route = 'exp_membro'
        rel.explorerflex.criterios = 'ORDER BY ID DESC'
        this.ds.grid = ['ID', 'Nome']
        this.ds.title = 'Membro'
        this.$refs.cmp.dataSearch(rel.explorerflex, 1, 1)
        this.open = true
      } else if (route === 2) {
        rel.explorerflex.route = 'exp_tipoconta'
        rel.explorerflex.criterios = 'AND contexto = 1 ORDER BY ID DESC'
        this.ds.grid = ['ID', 'Descricao']
        this.ds.title = 'Tipo Conta'
        this.$refs.cmp.dataSearch(rel.explorerflex, 1, 2)
        this.open = true
      } else if (route === 3) {
        rel.explorerflex.criterios = 'ORDER BY ID DESC'
        rel.explorerflex.route = 'exp_caixa'
        this.ds.grid = ['ID', 'Descricao']
        this.ds.title = 'Caixa'
        this.$refs.cmp.dataSearch(rel.explorerflex, 1, 3)
        this.open = true
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
    }
  },
  components: {
    datetime: Datetime
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

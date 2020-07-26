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
        dataemissao: '',
        dataVencimento: '',
        dataPagamento: '',
        iUsuarioInclusao: '',
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
      }
    }
  },
  mounted () {
    this.isLoading = true
    this.getDuplicata(this.pagina)
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
            this.getDuplicata(this.pagina)
            this.cleanForm()
            this.openModal = false
          } else {
            this.$toastr.error(res.data, 'AdonaiSpft diz:', util.toast)
          }
        })
      }
    },
    validate (form, quitar) {
      if (this.form.descricao === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'AdonaiSpft diz:', util.toast)
      } else if (this.form.tipo === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'AdonaiSpft diz:', util.toast)
      } else if (this.form.desccaixa === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'AdonaiSpft diz:', util.toast)
      } else if (this.form.valor === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'AdonaiSpft diz:', util.toast)
      } else {
        if (quitar === 1) {
          form.dataPagamento = new Date()
          form.status = 0
        } else if (quitar === 0) {
          form.status = 1
        } else if (quitar === 2) {
          form.status = 1
        }
        this.save(form)
      }
    },
    getDuplicata (pagina) {
      axios.get(adonai.url + 'duplicata/' + pagina + '/' + 0, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.duplicata = res.data
      })
    },
    datasearch (route) {
      if (route === 1) {
        this.ds.grid = ['ID', 'Nome']
        this.ds.title = 'Membro'
        this.$refs.teste.dataSearch('membro', 1, 0)
        this.open = true
      } else if (route === 2) {
        this.ds.grid = ['ID', 'Descricao']
        this.ds.title = 'Tipo Conta'
        this.$refs.teste.dataSearch('tipo', 1, 0)
        this.open = true
      } else if (route === 3) {
        this.ds.grid = ['ID', 'Descricao']
        this.ds.title = 'Caixa'
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
      this.form.valor = form.valor
      this.form.tipo = 0
      this.form.observacoes = form.tipo
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
      axios.get(adonai.url + 'duplicata/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
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
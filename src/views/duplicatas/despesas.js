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
      open: false,
      deleteModal: false,
      isLoading: false,
      campocidade: 0,
      pagina: 1,
      status: '',
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
        status: '',
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
      cidade: [],
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
      await axios.post(adonai.url + 'duplicata', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data === 'success') {
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.$toastr.success(this.status, 'Cadastro de Igrejas', util.toast)
          this.getDuplicata(this.pagina)
          this.cleanForm()
          this.openModal = false
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
        }
      })
    },
    validate (form) {
      if (this.form.descricao === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'Falha ao Salvar', util.toast)
      } else if (this.form.tipo === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'Falha ao Salvar', util.toast)
      } else if (this.form.desccaixa === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'Falha ao Salvar', util.toast)
      } else if (this.form.valor === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'Falha ao Salvar', util.toast)
      } else {
        this.save(form)
      }
    },
    getDuplicata (pagina) {
      axios.get(adonai.url + 'duplicata/' + pagina + '/' + 1, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.duplicata = res.data
      })
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
      this.form.status = ''
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
      this.form.observacoes = form.tipo
      this.form.tipo = 1
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
    destroy () {
      this.open = false
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

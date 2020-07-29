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
      caixa: [],
      ds: {
        grid: [],
        title: ''
      },
      tipo: 1,
      status: 1,
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        nome: '',
        codigo: '',
        idbanco: '',
        descricao: '',
        idusuario: '',
        usuariospermissoes: [
          {
            id: '',
            idusuario: '',
            idcaixa: '',
            permissao: '',
            nome: ''
          }
        ],
        retorno: '',
        moment: moment(data).format('YYYY-MM-DD HH:mm:ss')
      },
      selected: [
        {
          id: '',
          idUsuario: '',
          idcaixa: '',
          permissao: '',
          nome: ''
        }
      ]
    }
  },
  mounted () {
    this.isLoading = true
    this.get(1)
    this.isLoading = false
  },
  methods: {
    async save (form) {
      form.moment = moment(data).format('YYYY-MM-DD HH:mm:ss')
      await axios.post(adonai.url + 'caixa', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data === 'success') {
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.$toastr.success(this.status, 'Cadastro de Igrejas', util.toast)
          this.get(1)
          this.cleanForm()
          this.openModal = false
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
        }
      })
    },
    validate (form, quitar) {
      if (this.form.descricao === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao)', 'AdonaiSoft diz:', util.toast)
      } else {
        for (this.selected in form.usuariospermissoes) {
          if (form.usuariospermissoes[this.selected].permissao === false) {
            form.usuariospermissoes[this.selected].permissao = 0
          } else if (form.usuariospermissoes[this.selected].permissao === true) {
            form.usuariospermissoes[this.selected].permissao = 1
          }
        }
        form.moment = moment(data).format('YYYY-MM-DD HH:mm:ss')
        this.save(form)
      }
    },
    get (pagina) {
      axios.get(adonai.url + 'caixaloadbypg/' + pagina, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.caixa = res.data
      })
    },
    getusers () {
      axios.get(adonai.url + 'users', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.form.usuariospermissoes = res.data
      })
    },
    datasearch (route) {
      this.ds.grid = ['ID', 'Descricao']
      this.ds.title = 'Contas Bancárias'
      this.$refs.teste.dataSearch1('searchconta', 1)
      this.open = true
    },
    cleanForm () {
      this.form.add = true
      this.form.edit = false
      this.form.del = false
      this.form.id = ''
      this.form.descricao = ''
      this.form.nome = ''
      this.form.codigo = ''
      this.form.idbanco = ''
      this.form.descricao = ''
      this.form.idusuario = ''
      this.form.usuariospermissoes = []
      this.form.retorno = ''
      this.form.moment = ''
    },
    read (form) {
      this.form.add = false
      this.form.edit = true
      this.form.del = false
      this.form.id = form.id
      this.form.descricao = form.descricao
      this.form.nome = form.nome
      this.form.codigo = form.codigo
      this.form.idbanco = form.idbanco
      this.form.descricao = form.descricao
      this.form.idusuario = form.idusuario
      this.form.usuariospermissoes = form.usuariospermissoes
      this.form.retorno = form.retorno
      this.form.moment = moment(data).format('YYYY-MM-DD HH:mm:ss')
      this.openModal = true
    },
    getbyId (id) {
      axios.get(adonai.url + 'caixabyid/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data)
      })
    },
    destroy (route, registro) {
      this.form.nome = registro.descricao
      this.form.idbanco = registro.id
      this.open = false
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

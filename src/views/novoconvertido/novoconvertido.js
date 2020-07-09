import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../router/services'
import axios from 'axios'
var moment = require('moment')
var data = new Date()

export default {
  data () {
    return {
      openModal: false,
      openCidade: false,
      deleteModal: false,
      isLoading: false,
      campocidade: 0,
      pagina: 1,
      openDatasearch: false,
      status: '',
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        nome: '',
        idPessoa: '',
        observacoes: '',
        dataConversao: '',
        endereco: [
          {
            id: '',
            idPessoa: '',
            endereco: '',
            bairro: '',
            idCidade: 0,
            cidade: '',
            numero: '',
            uf: '',
            cep: '',
            complemento: '',
            tipo: 0
          }
        ],
        telefone: [
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 0
          },
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 1
          }
        ],
        email: [
          {
            id: '',
            iPpessoa: '',
            email: '',
            tipo: 0
          }
        ],
        motivo: '',
        moment: moment(data).format('YYYY-MM-DD HH:mm:ss')
      },
      cidade: [],
      visitantes: []
    }
  },
  mounted () {
    this.isLoading = true
    this.get(this.pagina)
    this.isLoading = false
  },
  methods: {
    async save (form) {
      await axios.post(adonai.url + 'novoconvertido', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data === 'success') {
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.$toastr.success(this.status, 'Cadastro de Membros', util.toast)
          this.get(this.pagina)
          this.cleanForm()
          if (this.form.edit) {
            this.openModal = false
          }
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
        }
      })
    },
    validate (form) {
      if (this.form.nome === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'AdonaiSoft', util.toast)
      } else {
        this.save(form)
      }
    },
    get (pagina) {
      axios.get(adonai.url + 'novoconvertido/' + pagina, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.visitantes = res.data
      })
    },
    cleanForm () {
      this.form.id = ''
      this.form.nome = ''
      this.form.idPessoa = ''
      this.form.observacoes = ''
      this.form.dataConversao = ''

      this.form.endereco[0].id = ''
      this.form.endereco[0].idPessoa = ''
      this.form.endereco[0].endereco = ''
      this.form.endereco[0].bairro = ''
      this.form.endereco[0].idCidade = ''
      this.form.endereco[0].cidade = ''
      this.form.endereco[0].numero = ''
      this.form.endereco[0].uf = ''
      this.form.endereco[0].cep = ''
      this.form.endereco[0].complemto = ''
      this.form.endereco[0].tipo = 0

      this.form.telefone[0].id = ''
      this.form.telefone[0].idPessoa = ''
      this.form.telefone[0].telefone = ''
      this.form.telefone[0].tipo = 0

      this.form.telefone[1].id = ''
      this.form.telefone[1].idPessoa = ''
      this.form.telefone[1].telefone = ''
      this.form.telefone[1].tipo = 1

      this.form.email[0].id = ''
      this.form.email[0].idPessoa = ''
      this.form.email[0].email = ''
      this.form.email[0].tipo = 0

      this.form.retorno = ''
      this.form.motivo = ''
    },
    read (form) {
      this.form.id = form.id
      this.form.nome = form.nome
      this.form.idPessoa = form.idPessoa
      this.form.observacoes = form.observacoes
      this.form.dataConversao = form.dataConversao

      this.form.endereco[0].id = form.endereco[0].id
      this.form.endereco[0].idPessoa = form.endereco[0].idPessoa
      this.form.endereco[0].endereco = form.endereco[0].endereco
      this.form.endereco[0].bairro = form.endereco[0].bairro
      this.form.endereco[0].idCidade = form.endereco[0].idCidade
      this.form.endereco[0].cidade = form.endereco[0].cidade
      this.form.endereco[0].numero = form.endereco[0].numero
      this.form.endereco[0].uf = form.endereco[0].uf
      this.form.endereco[0].cep = form.endereco[0].cep
      this.form.endereco[0].complemento = form.endereco[0].complemento
      this.form.endereco[0].tipo = 0

      this.form.telefone[0].id = form.telefone[0].id
      this.form.telefone[0].idPessoa = form.telefone[0].idPessoa
      this.form.telefone[0].telefone = form.telefone[0].telefone
      this.form.telefone[0].tipo = 0

      this.form.telefone[1].id = form.telefone[1].id
      this.form.telefone[1].idPessoa = form.telefone[1].idPessoa
      this.form.telefone[1].telefone = form.telefone[1].telefone
      this.form.telefone[1].tipo = 1

      this.form.email[0].id = form.email[0].id
      this.form.email[0].idPessoa = form.email[0].idPessoa
      this.form.email[0].email = form.email[0].email
      this.form.email[0].tipo = 0

      this.form.retorno = form.retorno
      this.form.motivo = form.motivo
      this.openModal = true
    },
    buscarcep (cep, form, local) {
      if (cep === '') {
        this.$toastr.warning('Por Favor preencha o campo cep', 'Aviso', util.toast)
      } else {
        cep = cep.replace('-', '')
        axios.get('https://viacep.com.br/ws/' + cep + '/json').then(function (response) {
          form.endereco[0].endereco = response.data.logradouro
          form.endereco[0].bairro = response.data.bairro
          form.endereco[0].cidade = response.data.localidade
          form.endereco[0].uf = response.data.uf
        })
      }
    },
    buscarCidade (pagina) {
      axios.get(adonai.url + 'cidade/' + pagina, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.cidade = res.data
      })
    },
    buscarCidadeKey (cidade) {
      axios.get(adonai.url + 'cidadekey/' + cidade, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.cidade = res.data
      })
    },
    getNovoCById (id) {
      axios.get(adonai.url + 'novoconvertidobyid/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.motivo === 'success') {
          this.read(res.data)
        } else {
          this.$toastr.error(res.data, 'AdonaiSoft', util.toast)
        }
      })
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

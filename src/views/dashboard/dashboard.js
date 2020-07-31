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
      openloading: false,
      open: false,
      ds: {
        grid: [],
        title: '',
        params: ''
      },
      status: '',
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        nome: '',
        idPessoa: '',
        observacoes: '',
        imagem: [],
        cnpjcpf: '',
        pastorResponsavel: '',
        secretario: '',
        tesoureiro: '',
        tipo: 0,
        igrejaSede: '',
        textoRelatorio: '',
        smtp: '',
        porta: '',
        emailmala: '',
        senha: '',
        usuario: '',
        autenticacao: 'Não Requer',
        fone: '',
        vice: '',
        presidente: '',
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
          },
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
            tipo: 1
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
          },
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 2
          },
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 3
          },
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 4
          },
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 5
          }
        ],
        email: [
          {
            id: '',
            iPpessoa: '',
            email: '',
            tipo: 0
          },
          {
            id: '',
            iPpessoa: '',
            email: '',
            tipo: 1
          },
          {
            id: '',
            iPpessoa: '',
            email: '',
            tipo: 2
          },
          {
            id: '',
            iPpessoa: '',
            email: '',
            tipo: 3
          }
        ],
        motivo: '',
        moment: moment(data).format('YYYY-MM-DD HH:mm:ss')
      },
      igreja: []
    }
  },
  mounted () {
    this.openloading = true
    this.get(1)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'igreja', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data === 'success') {
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.$toastr.success(this.status, 'Cadastro de Igrejas', util.toast)
          this.get(this.pagina)
          this.cleanForm()
          this.openloading = true
          this.openModal = false
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
          this.openloading = true
        }
      })
    },
    validate (doc, tipo, form) {
      if (this.form.nome === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        this.save(form)
      }
    },
    get (pagina) {
      axios.get(adonai.url + 'igrejagrid/' + 1, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.igreja = res.data
        this.openloading = false
      })
      /* this.$refs.expl.explorer('igrejagrid',1,'') */
    },
    cleanForm () {
      this.form.id = ''
      this.form.nome = ''
      this.form.idPessoa = ''
      this.form.observacoes = ''
      this.form.imagem = []
      this.form.cnpjcpf = ''
      this.form.pastorResponsavel = ''
      this.form.secretario = ''
      this.form.tesoureiro = ''
      this.form.tipo = 0
      this.form.igrejaSede = ''
      this.form.textoRelatorio = ''
      this.form.smtp = ''
      this.form.porta = ''
      this.form.emailmala = ''
      this.form.senha = ''
      this.form.usuario = ''
      this.form.autenticacao = ''
      this.form.vice = ''
      this.form.presidente = ''

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

      this.form.endereco[1].id = ''
      this.form.endereco[1].idPessoa = ''
      this.form.endereco[1].endereco = ''
      this.form.endereco[1].bairro = ''
      this.form.endereco[1].idCidade = ''
      this.form.endereco[1].cidade = ''
      this.form.endereco[1].numero = ''
      this.form.endereco[1].uf = ''
      this.form.endereco[1].cep = ''
      this.form.endereco[1].complemto = ''
      this.form.endereco[1].tipo = 1

      this.form.telefone[0].id = ''
      this.form.telefone[0].idPessoa = ''
      this.form.telefone[0].telefone = ''
      this.form.telefone[0].tipo = 0

      this.form.telefone[1].id = ''
      this.form.telefone[1].idPessoa = ''
      this.form.telefone[1].telefone = ''
      this.form.telefone[1].tipo = 1

      this.form.telefone[2].id = ''
      this.form.telefone[2].idPessoa = ''
      this.form.telefone[2].telefone = ''
      this.form.telefone[2].tipo = 2

      this.form.telefone[3].id = ''
      this.form.telefone[3].idPessoa = ''
      this.form.telefone[3].telefone = ''
      this.form.telefone[3].tipo = 3

      this.form.telefone[4].id = ''
      this.form.telefone[4].idPessoa = ''
      this.form.telefone[4].telefone = ''
      this.form.telefone[4].tipo = 4

      this.form.telefone[5].id = ''
      this.form.telefone[5].idPessoa = ''
      this.form.telefone[5].telefone = ''
      this.form.telefone[5].tipo = 5

      this.form.email[0].id = ''
      this.form.email[0].idPessoa = ''
      this.form.email[0].email = ''
      this.form.email[0].tipo = 0

      this.form.email[1].id = ''
      this.form.email[1].idPessoa = ''
      this.form.email[1].email = ''
      this.form.email[1].tipo = 1

      this.form.email[3].id = ''
      this.form.email[3].idPessoa = ''
      this.form.email[3].email = ''
      this.form.email[3].tipo = 3

      this.form.retorno = ''
      this.form.motivo = ''
    },
    read (form) {
      this.form.id = form.id
      this.form.nome = form.nome
      this.form.idPessoa = form.idPessoa
      this.form.observacoes = form.observacoes
      this.form.imagem = form.imagem
      this.form.cnpjcpf = form.cnpjcpf
      this.form.pastorResponsavel = form.pastorResponsavel
      this.form.secretario = form.secretario
      this.form.tesoureiro = form.tesoureiro
      this.form.tipo = 0
      this.form.igrejaSede = form.igrejaSede
      this.form.textoRelatorio = form.textoRelatorio
      this.form.smtp = form.smtp
      this.form.porta = form.porta
      this.form.emailmala = form.emailmala
      this.form.senha = form.senha
      this.form.usuario = form.usuario
      this.form.autenticacao = form.autenticacao
      this.form.vice = form.vice
      this.form.presidente = form.presidente

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

      this.form.endereco[1].id = form.endereco[1].id
      this.form.endereco[1].idPessoa = form.endereco[1].idPessoa
      this.form.endereco[1].endereco = form.endereco[1].endereco
      this.form.endereco[1].bairro = form.endereco[1].bairro
      this.form.endereco[1].idCidade = form.endereco[1].idCidade
      this.form.endereco[1].cidade = form.endereco[1].cidade
      this.form.endereco[1].numero = form.endereco[1].numero
      this.form.endereco[1].uf = form.endereco[1].uf
      this.form.endereco[1].cep = form.endereco[1].cep
      this.form.endereco[1].complemento = form.endereco[1].complemento
      this.form.endereco[1].tipo = 1

      this.form.telefone[0].id = form.telefone[0].id
      this.form.telefone[0].idPessoa = form.telefone[0].idPessoa
      this.form.telefone[0].telefone = form.telefone[0].telefone
      this.form.telefone[0].tipo = 0

      this.form.telefone[1].id = form.telefone[1].id
      this.form.telefone[1].idPessoa = form.telefone[1].idPessoa
      this.form.telefone[1].telefone = form.telefone[1].telefone
      this.form.telefone[1].tipo = 1

      this.form.telefone[2].id = form.telefone[2].id
      this.form.telefone[2].idPessoa = form.telefone[2].idPessoa
      this.form.telefone[2].telefone = form.telefone[2].telefone
      this.form.telefone[2].tipo = 2

      this.form.telefone[3].id = form.telefone[3].id
      this.form.telefone[3].idPessoa = form.telefone[3].idPessoa
      this.form.telefone[3].telefone = form.telefone[3].telefone
      this.form.telefone[3].tipo = 3

      this.form.telefone[4].id = form.telefone[4].id
      this.form.telefone[4].idPessoa = form.telefone[4].idPessoa
      this.form.telefone[4].telefone = form.telefone[4].telefone
      this.form.telefone[4].tipo = 4

      this.form.telefone[5].id = form.telefone[5].id
      this.form.telefone[5].idPessoa = form.telefone[5].idPessoa
      this.form.telefone[5].telefone = form.telefone[5].telefone
      this.form.telefone[5].tipo = 5

      this.form.email[0].id = form.email[0].id
      this.form.email[0].idPessoa = form.email[0].idPessoa
      this.form.email[0].email = form.email[0].email
      this.form.email[0].tipo = 0

      this.form.email[1].id = form.email[1].id
      this.form.email[1].idPessoa = form.email[1].idPessoa
      this.form.email[1].email = form.email[1].email
      this.form.email[1].tipo = 1

      this.form.email[2].id = form.email[2].id
      this.form.email[2].idPessoa = form.email[2].idPessoa
      this.form.email[2].email = form.email[2].email
      this.form.email[2].tipo = 2

      this.form.email[3].id = form.email[3].id
      this.form.email[3].idPessoa = form.email[3].idPessoa
      this.form.email[3].email = form.email[3].email
      this.form.email[3].tipo = 3

      this.form.retorno = form.retorno
      this.form.motivo = form.motivo
      this.openModal = true
    },
    previewFiles (event) {
      console.log(this.$refs)
      // this.form.imagem = this.$refs.myFiles.value
    },
    buscarcep (cep, form, local) {
      if (cep === '') {
        this.$toastr.warning('Por Favor preencha o campo cep', 'Aviso', util.toast)
      } else {
        cep = cep.replace('-', '')
        axios.get('https://viacep.com.br/ws/' + cep + '/json').then(function (response) {
          if (local === 1) {
            form.endereco[0].endereco = response.data.logradouro
            form.endereco[0].bairro = response.data.bairro
            form.endereco[0].cidade = response.data.localidade
            form.endereco[0].uf = response.data.uf
          } else {
            form.endereco[1].endereco = response.data.logradouro
            form.endereco[1].bairro = response.data.bairro
            form.endereco[1].cidade = response.data.localidade
            form.endereco[1].uf = response.data.uf
          }
        })
      }
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'igreja/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data)
        this.openloading = false
      })
    },
    datasearch (params) {
      this.ds.grid = ['ID', 'Nome Cidade', 'UF', '']
      this.ds.title = 'Cidades'
      this.$refs.cmp.dataSearch('cidade', 1, 'a', params)
      this.open = true
    },
    destroy (route, registro, params) {
      if (params === 0) {
        this.form.endereco[0].cidade = registro.cidade
        this.form.endereco[0].idCidade = registro.id
      } else {
        this.form.endereco[1].cidade = registro.cidade
        this.form.endereco[1].idCidade = registro.id
      }
      this.open = false
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

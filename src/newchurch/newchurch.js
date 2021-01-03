import { mapState } from 'vuex'
import util from '../assets/scss/util'
import adonai from '../http/router'
import axios from 'axios'
import utc from '../util/utilClass'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Chips from 'primevue/chips'

export default {
  data () {
    return {
      openModal: false,
      deleteModal: false,
      openloading: false,
      openConfiguration: false,
      open: false,
      ds: {
        grid: [],
        title: ''
      },
      campocidade: 0,
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
        pathimg: '',
        pastorResponsavel: '',
        secretario: '',
        tesoureiro: '',
        tipo: 0,
        igrejaSede: '',
        filiais: [],
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
        campoeclesiastico: [],
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
        ]
      },
      user: {
        add: true,
        edit: false,
        del: false,
        id: '',
        login: '',
        nome: '',
        senha: '',
        confirmarSenha: '',
        pathimg: '',
        idPessoa: '',
        permissaoUsuario: {
          idPessoa: 0,
          membro: 1,
          despesas: 1,
          entradas: 1,
          caixa: 1,
          multiIgreja: 1,
          usuarios: 1,
          relatorios: 1,
          notaversao: 1,
          tipoconta: 1,
          visitante: 1,
          agenda: 1,
          tipoevento: 1,
          aniversariante: 1,
          congregacao: 1,
          novoconvertido: 1,
          contabancaria: 1,
          auditoria: 1,
          biblia: 1,
          termouso: 1,
          politicaprivacidade: 1,
          minhasfaturas: 1,
          cargos: 1
        }
      }
    }
  },
  mounted () {
    this.openModal = true
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'igreja', form, { headers: { Authorization: 'Bearer OTk5OSYwJmFkb25haTA5ODAyNjYzOTQ4' } }).then(res => {
        if (res.data.ret === 'success') {
          this.$toastr.success('Igreja Cadastrada com Sucesso', 'AdonaiSoft Diz:', util.toast)
          this.$toastr.info('Criando Banco de Dados', 'AdonaiSoft Diz:', util.toast)
          this.createDb(res.data.obj, form)
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
          this.openloading = true
        }
      }).catch(err => {
        this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast)
        this.openloading = true
      })
    },
    validate (form) {
      if (this.form.nome === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        this.save(form)
      }
    },
    async createDb (id, form) {
      await axios.post(adonai.url + 'newchurch/' + id, form).then(resp => {
        if (resp.data.ret === 'success') {
          this.$toastr.success('Banco de dadps configurado com Sucesso', 'AdonaiSoft Diz:', util.toast)
          this.$toastr.info('Cadastrando o Usuário', 'AdonaiSoft Diz:', util.toast)
          this.user.nome = this.user.login
          var token = btoa(id + '&0&' + this.user.nome + '111111111111111')
          this.createUser(token, this.user)
        } else {
          this.$toastr.error(resp.data.motivo, 'AdonaiSoft Diz:', util.toast)
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    async createUser (token, user) {
      await axios.post(adonai.url + 'usuario', user, { headers: { Authorization: 'Bearer ' + token } }).then(respo => {
        if (respo.data.ret === 'success') {
          this.$toastr.success('Usuário Cadastrado com Sucesso, agora você tem acesso ao sistema, por favor verifique o email', 'AdonaiSoft Diz:', util.toast)
          this.$router.push('login')
        } else {
          this.$toastr.success(respo.data.motivo, 'AdonaiSoft Diz:', util.toast)
        }
      }).catch(err => this.$toastr.info(err, 'AdonaiSoft Diz:', util.toast))
    },
    previewFiles (e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.form.pathimg = e.target.result
      }
    },
    buscarcep (cep, form, local) {
      cep = cep.replace('-', '')
      axios.get(adonai.url + 'cep/' + cep, { headers: { Authorization: 'Bearer OTk5OSYwJmFkb25haTA5ODAyNjYzOTQ4' } }).then(res => {
        if (res.data.ret === 'unsuccess') {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz: ', util.toast)
        } else {
          if (local === 1) {
            form.endereco[0].endereco = res.data.obj.logradouro
            form.endereco[0].bairro = res.data.obj.bairro
            form.endereco[0].cidade = res.data.obj.localidade
            form.endereco[0].uf = res.data.obj.uf
            form.endereco[0].idCidade = res.data.obj.idCidade
          } else {
            form.endereco[1].endereco = res.data.obj.logradouro
            form.endereco[1].bairro = res.data.obj.bairro
            form.endereco[1].cidade = res.data.obj.localidade
            form.endereco[1].uf = res.data.obj.uf
            form.endereco[1].idCidade = res.data.obj.idCidade
          }
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz: ', util.toast))
    },
    datasearch (route, params) {
      if (route === 1) {
        utc.explorerflex.route = 'exp_municipio'
        utc.explorerflex.criterios = 'ORDER BY ID DESC'
        this.ds.grid = ['id', 'nome', 'uf', '']
        this.ds.title = 'Cidades'
        this.$refs.expl.dataSearch(utc.explorerflex, params, '')
        this.open = true
      }
    },
    destroy (registro, params) {
      this.form.endereco[params].cidade = registro.nome
      this.form.endereco[params].idCidade = registro.id
      this.open = false
    },
    async onsearchCnpj (cnpj) {
      if (cnpj.length === 14) {
        this.openloading = true
        await axios.get(adonai.url + 'cnpj/' + cnpj).then(res => {
          if (res.data.ret === 'success') {
            this.openloading = false
            this.onPovoar(res.data.obj)
          } else {
            this.$toastr.error(res.data.obj, 'AdonaiSoft Diz:', util.toast)
          }
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      }
    },
    onPovoar (params) {
      this.form.nome = params.nome
      this.form.endereco[0].cidade = params.municipio
      this.form.endereco[0].endereco = params.logradouro
      this.form.endereco[0].bairro = params.bairro
      this.form.endereco[0].numero = params.numero
      this.form.endereco[0].complemento = params.complemento
      this.form.email[0].email = params.email
      this.form.telefone[0].telefone = params.telefone
      this.form.presidente = params.qsa[0].nome
      this.form.pastorResponsavel = params.qsa[0].nome
      this.form.endereco[0].cep = params.cep
    }
  },
  components: {
    Dialog,
    Button,
    InputText,
    Chips
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

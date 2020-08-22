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
      deleteModal: false,
      openloading: false,
      open: false,
      explorer: {
        route: 'menu_pessoas_igreja',
        pagina: 1,
        criterios: 'order by id desc'
      },
      explorerflex: {
        route: '',
        pagina: 1,
        criterios: 'order by id desc'
      },
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
        moment: moment(data).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  mounted () {
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'igreja', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret !== undefined && res.data.ret === 'success') {
          this.cleanForm(form)
          this.openloading = false
          this.openModal = false
          this.$refs.grid.get(this.explorer)
          this.$toastr.success('Salvo com Sucesso', 'AdonaiSoft Diz:', util.toast)
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
          this.openloading = true
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    cleanForm (form) {
      form.id = ''
      form.nome = ''
      form.idPessoa = ''
      form.observacoes = ''
      form.imagem = []
      form.cnpjcpf = ''
      form.pathimg = ''
      form.pastorResponsavel = ''
      form.secretario = ''
      form.tesoureiro = ''
      form.tipo = 0
      form.igrejaSede = ''
      form.textoRelatorio = ''
      form.smtp = ''
      form.porta = ''
      form.emailmala = ''
      form.senha = ''
      form.usuario = ''
      form.autenticacao = ''
      form.vice = ''
      form.presidente = ''

      form.endereco[0].id = ''
      form.endereco[0].idPessoa = ''
      form.endereco[0].endereco = ''
      form.endereco[0].bairro = ''
      form.endereco[0].idCidade = ''
      form.endereco[0].cidade = ''
      form.endereco[0].numero = ''
      form.endereco[0].uf = ''
      form.endereco[0].cep = ''
      form.endereco[0].complemto = ''
      form.endereco[0].tipo = 0

      form.endereco[1].id = ''
      form.endereco[1].idPessoa = ''
      form.endereco[1].endereco = ''
      form.endereco[1].bairro = ''
      form.endereco[1].idCidade = ''
      form.endereco[1].cidade = ''
      form.endereco[1].numero = ''
      form.endereco[1].uf = ''
      form.endereco[1].cep = ''
      form.endereco[1].complemto = ''
      form.endereco[1].tipo = 1

      form.telefone[0].id = ''
      form.telefone[0].idPessoa = ''
      form.telefone[0].telefone = ''
      form.telefone[0].tipo = 0

      form.telefone[1].id = ''
      form.telefone[1].idPessoa = ''
      form.telefone[1].telefone = ''
      form.telefone[1].tipo = 1

      form.telefone[2].id = ''
      form.telefone[2].idPessoa = ''
      form.telefone[2].telefone = ''
      form.telefone[2].tipo = 2

      form.telefone[3].id = ''
      form.telefone[3].idPessoa = ''
      form.telefone[3].telefone = ''
      form.telefone[3].tipo = 3

      form.telefone[4].id = ''
      form.telefone[4].idPessoa = ''
      form.telefone[4].telefone = ''
      form.telefone[4].tipo = 4

      form.telefone[5].id = ''
      form.telefone[5].idPessoa = ''
      form.telefone[5].telefone = ''
      form.telefone[5].tipo = 5

      form.email[0].id = ''
      form.email[0].idPessoa = ''
      form.email[0].email = ''
      form.email[0].tipo = 0

      form.email[1].id = ''
      form.email[1].idPessoa = ''
      form.email[1].email = ''
      form.email[1].tipo = 1

      form.email[3].id = ''
      form.email[3].idPessoa = ''
      form.email[3].email = ''
      form.email[3].tipo = 3

      form.retorno = ''
      form.motivo = ''
    },
    read (form) {
      this.form.id = form.id
      this.form.nome = form.nome
      this.form.idPessoa = form.idPessoa
      this.form.observacoes = form.observacoes
      this.form.imagem = form.imagem
      this.form.pathimg = form.pathimg
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
    validate (doc, tipo, form) {
      if (this.form.nome === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        this.save(form)
      }
    },
    previewFiles (e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.form.pathimg = e.target.result
      }
    },
    imprimir (relatorio) {
      this.openloading = true
      axios.post(adonai.url + 'imprimir', relatorio, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.openloading = false
        var winparams = 'dependent=yes,locationbar=no,scrollbars=yes,menubar=yes,resizable,screenX=50,screenY=50,width=850,height=1050'
        var a = '<embed width=100% height=100% type="application/pdf" src="data:application/pdf;base64,' + escape(res.data) + ' "></embed>'
        var print = window.open('', 'PDF', winparams)
        print.document.write(a)
      }).catch(err => util.error(err))
    },
    buscarcep (cep, form, local) {
      axios.get(adonai.url + 'cep/' + cep, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
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
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'igreja/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data.obj)
        this.openloading = false
      }).catch(err => util.error(err))
    }, // params serve pra qualquer coisa que precisa mandar seja um id ou um critério
    datasearch (params) {
      this.explorerflex.route = 'exp_municipio'
      this.explorerflex.criterios = 'ORDER BY ID DESC'
      this.ds.grid = ['ID', 'Nome Cidade', 'UF', '']
      this.ds.title = 'Cidades'
      this.$refs.expl.dataSearch(this.explorerflex, 1, 1, params)
      this.open = true
    },
    destroy (registro, params, e) {
      if (params === 1) {
        this.form.endereco[e].cidade = registro.nome
        this.form.endereco[e].idCidade = registro.id
      }
      this.open = false
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

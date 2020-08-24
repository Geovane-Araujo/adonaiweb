import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../router/services'
import axios from 'axios'
import rel from '../../util/utilClass'
var moment = require('moment')
var data = new Date()

export default {
  data () {
    return {
      openModal: false,
      openloading: false,
      open: false,
      explorer: {
        route: 'menu_pessoas_congregacao',
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
        responsavel: '',
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
      }
    }
  },
  mounted () {
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'congregacao', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.$toastr.success(this.status, 'AdonaiSoft', util.toast)
          this.cleanForm()
          this.openModal = false
          this.openloading = false
          this.$refs.grid.get(this.explorer)
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
          this.openloading = false
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
    cleanForm () {
      this.form.id = ''
      this.form.nome = ''
      this.form.idPessoa = ''
      this.form.observacoes = ''
      this.form.responsavel = ''

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
      this.form.responsavel = form.responsavel

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
      axios.get(adonai.url + 'cep/' + cep, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'unsuccess') {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz: ', util.toast)
        } else {
          form.endereco[0].endereco = res.data.obj.logradouro
          form.endereco[0].bairro = res.data.obj.bairro
          form.endereco[0].cidade = res.data.obj.localidade
          form.endereco[0].uf = res.data.obj.uf
          form.endereco[0].idCidade = res.data.obj.idCidade
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz: ', util.toast))
    },
    imprimir (relatorio) {
      rel.report.relatorio = relatorio
      this.openloading = true
      axios.post(adonai.url + 'imprimir', rel.report, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.openloading = false
        window.open(res.data)
      }).catch(err => util.error(err))
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'congregacaobyid/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.read(res.data.obj)
          this.openloading = false
        } else {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft', util.toast)
          this.openloading = false
        }
      })
    },
    datasearch (route, params) {
      this.explorerflex.route = 'exp_municipio'
      this.explorerflex.criterios = 'ORDER BY ID DESC'
      this.ds.grid = ['ID', 'Nome Cidade', 'UF', '']
      this.ds.title = 'Cidades'
      this.$refs.expl.dataSearch(this.explorerflex, 1, 1, params)
      this.open = true
    },
    destroy (registro, params) {
      if (params === 1) {
        this.form.endereco[0].cidade = registro.nome
        this.form.endereco[0].idCidade = registro.id
      } else {
        this.form.endereco[1].cidade = registro.nome
        this.form.endereco[1].idCidade = registro.id
      }
      this.open = false
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../../../http/router'
import axios from 'axios'
import rel from '../../../util/utilClass'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

export default {
  data () {
    return {
      openModal: false,
      openloading: false,
      open: false,
      resize: 50,
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
        ]
      }
    }
  },
  mounted () {
    this.onResize()
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'congregacao', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.$toastr.success('Salvo com Sucesso', 'AdonaiSoft', util.toast)
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
    buscarcep (cep, form, local) {
      rel.methods.onSearchCep(cep, form, local, this.user.token)
    },
    async imprimir (relatorio) {
      this.openloading = true
      rel.report.relatorio = relatorio
      await rel.methods.imprimir(rel.report, this.user.token)
      this.openloading = false
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'congregacaobyid/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.form = res.data.obj
          this.form.add = false
          this.form.edit = true
          this.openModal = true
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
      this.ds.grid = ['ID', 'nome', 'uf', '']
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
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.resize = 100
      } else {
        this.resize = 60
      }
    }
  },
  components: {
    Dialog,
    Button,
    InputText
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

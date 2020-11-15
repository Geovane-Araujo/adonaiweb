import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../../router/services'
import axios from 'axios'
import rel from '../../../util/utilClass'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

export default {
  data () {
    return {
      openModal: false,
      deleteModal: false,
      openloading: false,
      resize: 50,
      explorer: {
        route: 'menu_pessoas_visitantes',
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
      },
      cidade: []
    }
  },
  mounted () {
    this.onResize()
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'visitantes', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.$toastr.success(this.status, 'Cadastro de Membros', util.toast)
          this.cleanForm()
          this.openloading = false
          this.openModal = false
          this.$refs.grid.get(this.explorer)
          if (this.form.edit) {
            this.openModal = false
            this.openloading = false
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
    cleanForm () {
      this.form.id = ''
      this.form.nome = ''
      this.form.idPessoa = ''
      this.form.observacoes = ''

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
      cep = cep.replace('-', '')
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
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'visitante/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.form = res.data.obj
          this.form.add = false
          this.form.edit = true
          this.openModal = true
          this.openloading = false
        } else {
          this.$toastr.error(res.data, 'AdonaiSoft', util.toast)
          this.openloading = false
        }
      })
    },
    imprimir (relatorio) {
      rel.report.relatorio = relatorio
      this.openloading = true
      axios.post(adonai.url + 'imprimir', rel.report, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.openloading = false
        window.open(res.data)
      }).catch(err => util.error(err))
    },
    datasearch (route, params) {
      if (route === 1) {
        this.explorerflex.route = 'exp_municipio'
        this.explorerflex.criterios = 'ORDER BY ID DESC'
        this.ds.grid = ['id', 'nome', 'uf']
        this.ds.title = 'Cidades'
        this.$refs.expl.dataSearch(this.explorerflex, 1, params)
      }
    },
    destroy (registro) {
      this.form.endereco[0].cidade = registro.nome
      this.form.endereco[0].idCidade = registro.id
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
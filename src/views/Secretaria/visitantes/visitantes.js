import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../../../http/router'
import axios from 'axios'
import { Datetime } from 'vue-datetime'
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
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        nome: '',
        idPessoa: '',
        observacoes: '',
        dataNascimento: '',
        sexo: 0,
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
      await axios.post(adonai.url + 'visitantes', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.$toastr.success('Salvo com Sucesso', 'Cadastro de Membros', util.toast)
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
          if (id === -100) {
            this.form = res.data.obj
          } else {
            this.form = res.data.obj
            this.form.add = false
            this.form.edit = true
          }
          this.openModal = true
          this.openloading = false
        } else {
          this.$toastr.error(res.data, 'AdonaiSoft', util.toast)
          this.openloading = false
        }
      })
    },
    async imprimir (relatorio) {
      this.openloading = true
      rel.report.relatorio = relatorio
      await rel.methods.imprimir(rel.report, this.user.token)
      this.openloading = false
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
    InputText,
    Datetime
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

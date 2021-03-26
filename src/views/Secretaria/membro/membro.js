import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../../../http/router'
import axios from 'axios'
import rel from '../../../util/utilClass'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FileUpload from 'primevue/fileupload'

export default {
  data () {
    return {
      openModal: false,
      deleteModal: false,
      resize: 50,
      mobileI: 'Imprimir',
      mobileF: 'Filtrar',
      openloading: false,
      openFilter: false,
      mapsModal: false,
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
        dataNascimento: '',
        ativo: '',
        idCargo: '',
        cargo: '',
        foto: '',
        observacoes: '',
        dataBatismo: '',
        idEstadoCivil: 0,
        pathimg: '',
        batizado: '',
        membroDesde: new Date(),
        cpf: '',
        rg: '',
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
          }
        ],
        criterios: {
          criterios: ''
        }
      },
      filters: {
        idcargo: '',
        cargo: '',
        criterio: ''
      },
      flex: [{ tamanho: 10, name: 'id' }, { tamanho: 100, name: 'nome' }, { tamanho: 30, name: 'endereco' }, { tamanho: 30, name: 'bairro' }, { tamanho: 20, name: 'numero' }, { tamanho: 20, name: 'telefone' }
      ],
      img: ''
    }
  },
  mounted () {
    this.onResize()
    rel.explorer.route = 'menu_pessoa_membros'
    rel.explorer.criterios = 'order by id desc'
    this.$refs.grid.get(rel.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'membro', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret !== undefined && res.data.ret === 'success') {
          this.openModal = false
          this.openloading = false
          rel.explorer.route = 'menu_pessoa_membros'
          rel.explorer.criterios = 'order by id desc'
          this.$refs.grid.get(rel.explorer)
          this.$toastr.success(this.status, 'AdonaiSoft Diz: ', util.toast)
        } else {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz: ', util.toast)
          this.openloading = false
        }
      }).catch(err => this.$toastr.success(err, 'AdonaiSoft Diz: ', util.toast))
    },
    validar (form) {
      if (form.nome === '') {
        this.$toastr.error('Por favor preencha o campo Nome Completo', 'Campos Inválidos', util.toast)
      } else if (form.idCargo === '') {
        this.$toastr.error('Por favor preencha o campo Cargo', 'Campos Inválidos', util.toast)
      } else {
        if (form.endereco[0].endereco === '' || form.endereco[0].bairro === '' || form.endereco[0].numero === '' || form.endereco[0].cidade === '') {
          this.mapsModal = true
        } else {
          this.save(form)
        }
      }
    },
    getImg (e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.form.pathimg = e.target.result
      }
    },
    async imprimir (relatorio) {
      rel.report.relatorio = relatorio
      await rel.methods.imprimir(rel.report, this.user.token)
      this.openloading = false
    },
    async buscarcep (cep, form, local) {
      this.openloading = true
      await rel.methods.onSearchCep(cep, form, local, this.user.token)
      this.openloading = false
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'membro/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (id === -100) {
          this.form = res.data.obj
          this.img = adonai.urli + this.form.foto
          this.form.membroDesde = new Date()
        } else {
          this.form = res.data.obj
          this.form.add = false
          this.form.edit = true
          this.img = adonai.urli + this.form.foto
        }
        this.openModal = true
        this.openloading = false
      })
    }, // params serve pra qualquer coisa que precisa mandar seja um id ou um critério
    datasearch (route, params) {
      if (route === 1) {
        rel.explorerflex.route = 'exp_municipio'
        rel.explorerflex.criterios = 'ORDER BY ID DESC'
        this.ds.grid = ['id', 'nome', 'uf', '']
        this.ds.title = 'Cidades'
        this.$refs.expl.dataSearch(rel.explorerflex, 1, params)
      } else if (route === 2) {
        rel.explorerflex.route = 'exp_cargo'
        rel.explorerflex.criterios = 'ORDER BY ID asc'
        this.ds.grid = ['id', 'descricao']
        this.ds.title = 'Cargos'
        this.$refs.expl.dataSearch(rel.explorerflex, 2, '')
      }
    },
    destroy (registro, params, e) {
      if (params === 1) {
        this.form.endereco[e].cidade = registro.nome
        this.form.endereco[e].idCidade = registro.id
      } else {
        this.form.cargo = registro.descricao
        this.form.idCargo = registro.id

        this.filters.cargo = registro.descricao
        this.filters.idcargo = registro.id
      }
    },
    filter (filters) {
      if (filters.cargo !== '') {
        filters.criterio += ' AND pessoa_membro.idcargo = ' + filters.idcargo
      } else {
        filters.criterio = ''
      }
      rel.explorer.criterios = filters.criterio + ' ORDER BY ID DESC'
      rel.explorer.route = 'menu_pessoa_membros'
      this.openloading = true
      this.$refs.grid.get(rel.explorer)
      this.openFilter = false
      this.openloading = false
      filters.criterio = ''
    },
    cleanFilters (filters) {
      var fil
      for (fil in filters) {
        this.filters[fil] = ''
      }
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.resize = 100
        this.mobileF = ''
        this.mobileI = ''
      } else {
        this.resize = 60
      }
    }
  },
  components: {
    datetime: Datetime,
    Dialog,
    Button,
    InputText,
    FileUpload
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

import { mapState } from 'vuex'
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
import { TableModel } from '../../../model/TableModel'

export default {
  data () {
    return {
      openModal: false,
      deleteModal: false,
      showDocument: false,
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
      urlimg: adonai.arquivos,
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
        naturalidade: '',
        nacionalidade: '',
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
    this.$refs.grid.get(this.onGridInitialize('menu_pessoa_membros'))
  },
  methods: {
    onGridInitialize (route) {
      var filter = new TableModel()
      filter.route = route
      return filter
    },
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'membro', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret !== undefined && res.data.ret === 'success') {
          this.openModal = false
          this.openloading = false
          this.$refs.grid.get(this.onGridInitialize('menu_pessoa_membros'))
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com sucesso', life: 5000 })
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
          this.openloading = false
        }
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        this.openloading = false
      })
    },
    validar (form) {
      if (form.nome === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Por favor preencha o campo Nome Completo', life: 5000 })
      } else if (form.idCargo === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Por favor preencha o campo Cargo', life: 5000 })
      } else {
        if (form.endereco[0].endereco === '' || form.endereco[0].bairro === '' || form.endereco[0].numero === '' || form.endereco[0].cidade === '') {
          this.mapsModal = true
        } else {
          form.dataBatismo = rel.methods.validateData(form.dataBatismo)
          form.membroDesde = rel.methods.validateData(form.membroDesde)
          form.dataNascimento = rel.methods.validateData(form.dataNascimento)
          this.save(form)
        }
      }
    },
    getImg (e) {
      this.openloading = true
      var file = e.target.files[0]
      if (file.size > 500000) {
        this.$toast.add({ severity: 'info', summary: 'AdonaiSoft', detail: 'Imagem muito grande, tamanho máximo 500kb', life: 5000 })
        this.openloading = false
        return
      }
      rel.uploadImg(e, this.form.idPessoa, this.user).then(res => {
        this.form.pathimg = res
        this.openloading = false
      })
    },
    async imprimir (relatorio) {
      rel.report.relatorio = relatorio
      try {
        await rel.methods.imprimir(rel.report, this.user.token)
      } catch (err) {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      }
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
          this.showDocument = true
        }
        this.openModal = true
        this.openloading = false
      })
    },
    getDocument (id) {
      this.openloading = true
      axios.get(adonai.url + 'getdocument/' + parseInt(id) + '/' + this.form.idPessoa, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.openModal = false
          this.$refs.print.printView(res.data.obj.html)
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
        this.openloading = false
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        this.openloading = false
      })
    },
    // params serve pra qualquer coisa que precisa mandar seja um id ou um critério
    datasearch (route, params) {
      switch (route) {
        case 1:
          this.ds.title = 'Cidades'
          this.$refs.expl.dataSearch(this.onGridInitialize('exp_municipio'), 1, params)
          break
        case 2:
          this.ds.title = 'Cargos'
          this.$refs.expl.dataSearch(this.onGridInitialize('exp_cargo'), 2, '')
          break
        case 3:
          this.ds.title = 'Documentos'
          this.$refs.expl.dataSearch(this.onGridInitialize('exp_documentos_editaveis'), 3, '')
          break
        default:
      }
    },
    destroy (registro, params, e) {
      switch (params) {
        case 1:
          this.form.endereco[e].cidade = registro.nome
          this.form.endereco[e].idCidade = registro.id
          break
        case 2:
          this.form.cargo = registro.descricao
          this.form.idCargo = registro.id
          this.filters.cargo = registro.descricao
          this.filters.idcargo = registro.id
          break
        default:
          this.getDocument(registro.id)
          break
      }
    },
    filter (filters) {
      if (filters.cargo !== '') {
        filters.criterio += ' AND pessoa_membro.idcargo = ' + filters.idcargo
      } else {
        filters.criterio = ''
      }
      var filter = this.onGridInitialize('menu_pessoa_membros')
      filter.criterios = filters.criterio + ' '
      this.openloading = true
      this.$refs.grid.get(filter)
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

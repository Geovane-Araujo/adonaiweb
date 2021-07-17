import { mapState } from 'vuex'
import adonai from '../../../http/router'
import axios from 'axios'
import utc from '../../../util/utilClass'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

export default {
  data () {
    return {
      openModal: false,
      deleteModal: false,
      openloading: false,
      resize: 50,
      mobileI: 'Imprimir',
      mobileF: 'Filtrar',
      openConfiguration: false,
      open: false,
      ds: {
        grid: [],
        title: ''
      },
      status: '',
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        nome: '',
        idPessoa: '',
        cpf: '',
        pathimg: '',
        idtipo: 80,
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
      }
    }
  },
  mounted () {
    utc.explorer.route = 'menu_fornecedores'
    utc.explorer.pagina = 1
    utc.explorer.criterios = ' order by id desc'
    this.$refs.grid.get(utc.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'pessoafornecedor', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret !== undefined && res.data.ret === 'success') {
          this.openloading = false
          this.openModal = false
          utc.explorer.route = 'menu_fornecedores'
          utc.explorer.pagina = 1
          utc.explorer.criterios = ' order by id desc'
          this.$refs.grid.get(utc.explorer)
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com sucesso', life: 5000 })
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
          this.openloading = true
        }
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        this.openloading = false
      })
    },
    validate () {
      if (this.form.nome === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios não preenchidos', life: 5000 })
      } else {
        this.save(this.form)
      }
    },
    async imprimir (relatorio) {
      try {
        utc.report.relatorio = relatorio
        await utc.imprimir(utc.report)
      } catch (err) {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      }
    },
    buscarcep (cep, form, local) {
      cep = cep.replace('-', '')
      axios.get(adonai.url + 'cep/' + cep, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'unsuccess') {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
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
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        this.openloading = false
      })
    },
    getbyId (id) {
      this.onResize()
      this.openloading = true
      axios.get(adonai.url + 'pessoafornecedor/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (id === -100) {
          this.form = res.data.obj
        } else {
          this.form = res.data.obj
          this.form.add = false
          this.form.edit = true
        }
        this.openModal = true
        this.openloading = false
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        this.openloading = false
      })
    }, // params serve pra qualquer coisa que precisa mandar seja um id ou um critério
    datasearch (route, params) {
      if (route === 1) {
        utc.explorerflex.route = 'exp_municipio'
        utc.explorerflex.criterios = 'ORDER BY ID DESC'
        this.ds.grid = ['id', 'nome', 'uf']
        this.ds.title = 'Cidades'
        this.$refs.expl.dataSearch(utc.explorerflex, 1, params)
        this.open = true
      }
    },
    destroy (registro, params, e) {
      if (params === 1) {
        this.form.endereco[e].cidade = registro.nome
        this.form.endereco[e].idCidade = registro.id
      }
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.resize = 100
        this.mobileF = ''
        this.mobileI = ''
      } else {
        this.resize = 65
      }
    }
  },
  components: {
    Dialog,
    Button,
    InputText,
    DataTable,
    Column
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

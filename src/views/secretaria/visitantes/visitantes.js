import { mapState } from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../../../http/router'
import axios from 'axios'
import { Datetime } from 'vue-datetime'
import rel from '../../../util/utilClass'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { TableModel } from '../../../model/TableModel'

export default {
  data () {
    return {
      openModal: false,
      deleteModal: false,
      openloading: false,
      resize: 50,
      explorerflex: {
        route: '',
        pagina: 1
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
    this.$refs.grid.get(this.onGridInitialize('menu_pessoas_visitantes'))
  },
  methods: {
    onGridInitialize (route) {
      var filter = new TableModel()
      filter.route = route
      return filter
    },
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'visitantes', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com sucesso', life: 5000 })
          this.openloading = false
          this.openModal = false
          this.$refs.grid.get(this.onGridInitialize('menu_pessoas_visitantes'))
          if (this.form.edit) {
            this.openModal = false
            this.openloading = false
          }
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    validate (form) {
      if (this.form.nome === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios não preenchidos', life: 5000 })
      } else {
        this.save(form)
      }
    },
    buscarcep (cep, form, local) {
      cep = cep.replace('-', '')
      axios.get(adonai.url + 'cep/' + cep, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'unsuccess') {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        } else {
          form.endereco[0].endereco = res.data.obj.logradouro
          form.endereco[0].bairro = res.data.obj.bairro
          form.endereco[0].cidade = res.data.obj.localidade
          form.endereco[0].uf = res.data.obj.uf
          form.endereco[0].idCidade = res.data.obj.idCidade
        }
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
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
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
          this.openloading = false
        }
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    async imprimir (relatorio) {
      this.openloading = true
      rel.report.relatorio = relatorio
      try {
        await rel.methods.imprimir(relatorio, this.user.token)
      } catch (err) {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      }
      this.openloading = false
    },
    datasearch (route, params) {
      if (route === 1) {
        this.explorerflex.route = 'exp_municipio'
        this.ds.title = 'Cidades'
        this.$refs.expl.dataSearch(this.onGridInitialize('exp_municipio'), 1, params)
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

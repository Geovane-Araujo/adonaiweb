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

export default {
  data () {
    return {
      openModal: false,
      openloading: false,
      open: false,
      resize: 0,
      explorer: {
        route: 'menu_pessoas_novoconvertido',
        pagina: 1,
        criterios: '',
        order: 'order by id desc'
      },
      explorerflex: {
        route: '',
        pagina: 1,
        criterios: '',
        order: 'order by id desc'
      },
      ds: {
        grid: [],
        title: '',
        params: ''
      },
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        nome: '',
        idPessoa: '',
        observacoes: '',
        dataConversao: '',
        dataNascimento: '',
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
      img: ''
    }
  },
  mounted () {
    this.onResize()
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'novoconvertido', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com Sucesso', life: 5000 })
          this.openloading = false
          this.openModal = false
          this.$refs.grid.get(this.explorer)
        } else {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
      }).catch(err => {
        this.openloading = false
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
    previewFiles (e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.form.foto = e.target.result
        this.openloading = true
        axios.post(adonai.url + 'base64toimage', this.form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          this.openloading = false
          this.img = adonai.urli + res.data
          this.form.foto = res.data
        }).catch(err => {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        })
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
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'novoconvertidobyid/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          if (id === -100) {
            this.form = res.data.obj
            this.img = adonai.urli + this.form.foto
          } else {
            this.form = res.data.obj
            this.form.add = false
            this.form.edit = true
            this.img = adonai.urli + this.form.foto
          }
          this.openModal = true
          this.openloading = false
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
          this.openloading = false
        }
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    datasearch (route, params) {
      this.explorerflex.route = 'exp_municipio'
      this.ds.title = 'Cidades'
      this.$refs.expl.dataSearch(this.explorerflex, 1, 1, params)
      this.open = true
    },
    destroy (registro, params) {
      if (params === 1) {
        this.form.endereco[0].cidade = registro.nome
        this.form.endereco[0].idCidade = registro.id
      } else {
        this.form.endereco[1].cidade = registro.cidade
        this.form.endereco[1].idCidade = registro.id
      }
      this.open = false
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.resize = 100
      } else {
        this.resize = 70
      }
    }
  },
  components: {
    datetime: Datetime,
    Dialog,
    Button,
    InputText
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

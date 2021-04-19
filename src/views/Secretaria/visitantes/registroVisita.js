import { mapState } from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../../../http/router'
import axios from 'axios'
import rel from '../../../util/utilClass'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Editor from 'primevue/editor'
import { Datetime } from 'vue-datetime'
var moment = require('moment')
var data = new Date()

export default {
  data () {
    return {
      openModal: false,
      deleteModal: false,
      openloading: false,
      resize: 50,
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
        datavisita: ''
      },
      disabled: false
    }
  },
  mounted () {
    this.onResize()
    rel.explorerflex.route = 'menu_pessoa_registro_visitante'
    rel.explorerflex.criterios = 'ORDER BY ID DESC'
    rel.explorerflex.pagina = 1
    this.$refs.grid.get(rel.explorerflex)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'registrovisitante', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Visita registrada com sucesso', life: 5000 })
          this.openloading = false
          this.openModal = false
          rel.explorerflex.route = 'menu_pessoa_registro_visitante'
          rel.explorerflex.criterios = 'ORDER BY ID DESC'
          rel.explorerflex.pagina = 1
          this.$refs.grid.get(rel.explorerflex)
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
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'registrovisitante/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          if (id === -100) {
            this.form = res.data.obj
            this.form.datavisita = moment(data).format()
            this.disabled = false
          } else {
            this.form = res.data.obj
            this.form.add = false
            this.form.edit = true
            this.disabled = true
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
    datasearch (route, params) {
      if (route === 1) {
        rel.explorerflex.route = 'exp_pessoa_visitante'
        rel.explorerflex.criterios = 'ORDER BY ID DESC'
        rel.explorerflex.pagina = 1
        this.ds.grid = ['id', 'nome']
        this.ds.title = 'Visitantes'
        this.$refs.expl.dataSearch(rel.explorerflex, 1, params)
      }
    },
    destroy (registro) {
      this.form.nome = registro.nome
      this.form.idpessoa = registro.id
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.resize = 100
      } else {
        this.resize = 50
      }
    }
  },
  components: {
    Dialog,
    Button,
    InputText,
    Editor,
    datetime: Datetime
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

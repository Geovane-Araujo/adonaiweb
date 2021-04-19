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

export default {
  data () {
    return {
      openModal: false,
      deleteModal: false,
      resize: 50,
      openloading: false,
      openFilter: false,
      mapsModal: false,
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
        dataNascimento: '',
        idpai: '',
        idmae: '',
        nomeMae: '',
        nomePai: '',
        foto: '',
        pathimg: ''
      },
      img: ''
    }
  },
  mounted () {
    this.onResize()
    rel.explorer.route = 'menu_criancas'
    rel.explorer.criterios = 'order by id desc'
    this.$refs.grid.get(rel.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'pessoacriancas', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret !== undefined && res.data.ret === 'success') {
          this.openModal = false
          this.openloading = false
          rel.explorer.route = 'menu_criancas'
          rel.explorer.criterios = 'order by id desc'
          this.$refs.grid.get(rel.explorer)
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com sucesso', life: 5000 })
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
          this.openloading = false
        }
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    validate (form) {
      if (form.nome === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Por favor preencha o campo Nome Completo', life: 5000 })
      } else {
        this.save(form)
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
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'pessoacriancas/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
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
      })
    }, // params serve pra qualquer coisa que precisa mandar seja um id ou um critério
    datasearch (params) {
      rel.explorerflex.route = 'exp_pessoa_financeiro'
      rel.explorerflex.criterios = 'ORDER BY ID DESC'
      rel.explorerflex.pagina = 1
      this.ds.grid = ['id', 'nome']
      this.ds.title = 'Pais'
      this.$refs.expl.dataSearch(rel.explorerflex, params, params)
    },
    destroy (registro, params) {
      if (params === 0) {
        this.form.nomePai = registro.nome
        this.form.idpai = registro.id
      } else {
        this.form.nomeMae = registro.nome
        this.form.idmae = registro.id
      }
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

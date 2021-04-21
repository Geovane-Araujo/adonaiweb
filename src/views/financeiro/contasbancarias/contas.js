import { mapState } from 'vuex'
import adonai from '../../../http/router'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'

export default {
  data () {
    return {
      openModal: false,
      openloading: false,
      open: false,
      explorer: {
        route: 'menu_contas_bancarias',
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
        dela: false,
        id: '',
        descricao: '',
        idbanco: '',
        nomeBanco: '',
        agencia: '',
        conta: '',
        tipo: ''
      }
    }
  },
  mounted () {
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      if (form.del === true && form.id < 0) {
        this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Não é permitido Excluir Registros Padrões do Sistema', life: 5000 })
      } else {
        this.openloading = true
        await axios.post(adonai.url + 'contabancaria', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com Sucesso', life: 5000 })
            this.openloading = false
            this.openModal = false
            this.cleanForm()
            this.$refs.grid.get(this.explorer)
          } else {
            this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
            this.openloading = false
          }
        }).catch(err => {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        })
      }
    },
    validate (form) {
      if (this.form.nome === '') {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios não preenchidos', life: 5000 })
      } else {
        this.save(form)
      }
    },
    cleanForm () {
      this.form.id = ''
      this.form.descricao = ''
      this.form.idbanco = ''
      this.form.nomeBanco = ''
      this.form.agencia = ''
      this.form.conta = ''
      this.form.tipo = ''
    },
    read (form) {
      this.form.id = form.id
      this.form.descricao = form.descricao
      this.form.idbanco = form.idbanco
      this.form.nomeBanco = form.nomeBanco
      this.form.agencia = form.agencia
      this.form.conta = form.conta
      this.form.tipo = 0

      this.openModal = true
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'conta/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.read(res.data.obj)
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
        this.openloading = false
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    datasearch () {
      this.ds.grid = ['ID', 'nome', 'Codigo']
      this.explorerflex.route = 'exp_banco'
      this.ds.title = 'Bancos'
      this.$refs.expl.dataSearch(this.explorerflex, 1, 1)
      this.open = true
    },
    destroy (registro, params) {
      this.form.nomeBanco = registro.nome
      this.form.idbanco = registro.id
      this.open = false
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

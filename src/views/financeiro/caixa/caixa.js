import { mapState } from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import adonai from '../../../http/router'
import rel from '../../../util/utilClass'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Dialog from 'primevue/dialog'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

export default {
  data () {
    return {
      openModal: false,
      open: false,
      openloading: false,
      caixa: [],
      ds: {
        grid: [],
        title: ''
      },
      tipo: 1,
      status: 1,
      explorer: {
        route: 'menu_pessoas_caixa',
        pagina: 1,
        criterios: '',
        order: 'order by id desc'
      },
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        nome: '',
        codigo: '',
        idbanco: '',
        descricao: '',
        idusuario: '',
        usuariospermissoes: [
          {
            id: '',
            idusuario: '',
            idcaixa: '',
            permissao: '',
            nome: ''
          }
        ]
      },
      selected: [
        {
          id: '',
          idUsuario: '',
          idcaixa: '',
          permissao: '',
          nome: ''
        }
      ]
    }
  },
  mounted () {
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      if (form.del === true && form.id < 0) {
        this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Não é permitido Excluir Registros Padrões do Sistema', life: 5000 })
      } else {
        await axios.post(adonai.url + 'caixa', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com Sucesso', life: 5000 })
            this.cleanForm()
            this.openModal = false
            this.openloading = false
            this.$refs.grid.get(this.explorer)
          } else {
            this.openloading = false
            this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
          }
        }).catch(err => {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        })
      }
    },
    validate (form, quitar) {
      if (this.form.descricao === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios (Descricao)', life: 5000 })
      } else {
        for (this.selected in form.usuariospermissoes) {
          if (form.usuariospermissoes[this.selected].permissao === false) {
            form.usuariospermissoes[this.selected].permissao = 0
          } else if (form.usuariospermissoes[this.selected].permissao === true) {
            form.usuariospermissoes[this.selected].permissao = 1
          }
        }
        this.save(form)
      }
    },
    getusers () {
      axios.get(adonai.url + 'users', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.form.usuariospermissoes = res.data.obj
        console.log(this.form)
        this.openModal = true
        this.openloading = false
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    datasearch (route) {
      rel.explorerflex.pagina = 1
      rel.explorerflex.route = 'exp_contabancaria'
      this.ds.title = 'Contas Bancárias'
      this.$refs.cmp.dataSearch(rel.explorerflex, 1, 1)
      this.open = true
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'caixa/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.form = res.data.obj
          if (id === -100) {
            this.getusers()
          } else {
            this.openModal = true
          }
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
        this.openloading = false
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    destroy (registro, params) {
      this.form.nome = registro.descricao
      this.form.idbanco = registro.id
      this.open = false
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  components: {
    TabView,
    TabPanel,
    Dialog,
    Checkbox,
    Column,
    DataTable,
    Button,
    InputText
  }
}

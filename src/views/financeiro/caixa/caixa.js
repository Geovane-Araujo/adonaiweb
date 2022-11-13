import { mapState } from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import adonai from '../../../http/router'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Dialog from 'primevue/dialog'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { TableModel } from '../../../model/TableModel'

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
      form: {},
      removidos: []
    }
  },
  mounted () {
    this.$refs.grid.get(this.onGridInitialize('menu_pessoas_caixa'))
  },
  methods: {
    onGridInitialize (route) {
      var filter = new TableModel()
      filter.route = route
      return filter
    },
    async save (form) {
      this.openloading = true
      if (form.del === true && form.id < 0) {
        this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Não é permitido Excluir Registros Padrões do Sistema', life: 5000 })
      } else {
        await axios.post(adonai.url + 'caixa', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com Sucesso', life: 5000 })
            this.openModal = false
            this.openloading = false
            this.$refs.grid.get(this.onGridInitialize('menu_pessoas_caixa'))
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
        this.removidos.forEach(e => {
          form.usuariospermissoes.push(e)
        })
        this.save(form)
      }
    },
    datasearch (route) {
      switch (route) {
        case 1:
          this.ds.title = 'Contas Bancárias'
          this.$refs.cmp.dataSearch(this.onGridInitialize('exp_contabancaria'), 1, 1)
          break
        case 2:
          this.ds.title = 'Usuario'
          this.$refs.cmp.dataSearch(this.onGridInitialize('exp_caixa_usuarios'), 2, '')
          break
      }
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'caixa/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.removidos = []
          this.form = res.data.obj
          this.openModal = true
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
      if (params === 1) {
        this.form.nome = registro.descricao
        this.form.idbanco = registro.id
      } else if (params === 2) {
        var user = {
          add: true,
          del: false,
          id: '',
          idusuario: '',
          idcaixa: '',
          permissao: '',
          nome: ''
        }
        user.idusuario = registro.id
        user.nome = registro.nome
        this.form.usuariospermissoes.push(user)
      }
    },
    onRemoveArra (data) {
      data.add = false
      data.del = true
      this.removidos.push(data)
      var i = 0
      this.form.usuariospermissoes.forEach(e => {
        if (e.idusuario === data.idusuario) {
          return true
        } else {
          i++
        }
      })
      this.form.usuariospermissoes.splice(i, 1)
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

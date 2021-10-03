import { mapState } from 'vuex'
import adonai from '../../../http/router'
import adExplorer from '../../../util/utilClass'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { Datetime } from 'vue-datetime'
import AutoComplete from 'primevue/autocomplete'

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    openDatasearch: false,
    open: false,
    explorer: {
      route: 'menu_pedidos',
      pagina: 1,
      criterios: '',
      order: 'order by id desc'
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
      del: false,
      id: '',
      idPessoa: '',
      nome: '',
      tipo: '',
      idtipo: 0,
      mensagem: '',
      status: 0,
      descStatus: '',
      data: '',
      datAlteracao: ''
    },
    pedidos: [],
    pedido: []
  }),
  mounted () {
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'pedido', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
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
    },
    validate (form) {
      if (this.form.mensagem === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios não preenchidos', life: 5000 })
      } else if (this.form.nome === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios não preenchidos', life: 5000 })
      } else if (this.form.tipo === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios não preenchidos', life: 5000 })
      } else {
        this.save(form)
      }
    },
    cleanForm () {
      this.form.descricao = ''
      this.form.edit = false
      this.form.del = false
      this.form.add = true
      this.form.id = ''
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'pedido/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.form = res.data.obj
          this.form.add = false
          this.form.edit = true
          this.openloading = false
          this.openModal = true
        } else {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    datasearch (route, params) {
      if (route === 1) {
        adExplorer.explorerflex.route = 'exp_tipo_pedido'
        this.ds.title = 'Tipo Solicitações'
        this.$refs.expl.dataSearch(adExplorer.explorerflex, 1, '')
      } else if (route === 2) {
        adExplorer.explorerflex.route = 'exp_membro'
        this.ds.title = 'Membros'
        this.$refs.expl.dataSearch(adExplorer.explorerflex, 2, '')
      }
    },
    destroy (registro, params) {
      if (params === 1) {
        this.form.tipo = registro.descricao
        this.form.idtipo = registro.id
      } else if (params === 2) {
        this.form.nome = registro.nome
        this.form.idPessoa = registro.id
      }
    }
  },
  components: {
    Dialog,
    Button,
    InputText,
    datetime: Datetime,
    AutoComplete
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

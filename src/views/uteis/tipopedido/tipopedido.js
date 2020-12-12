import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import adonai from '../../../http/router'
import axios from 'axios'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    open: false,
    explorer: {
      route: 'exp_tipo_pedido',
      pagina: 1,
      criterios: 'order by id desc'
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
      descricao: ''
    },
    tipopedido: []
  }),
  mounted () {
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'tipopedido', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.openloading = false
          this.$toastr.success('Salvo com Sucesso', 'AdonaiSoft Diz:', util.toast)
          this.cleanForm()
          this.openModal = false
          this.$refs.grid.get(this.explorer)
        } else {
          this.openloading = false
          this.$toastr.error(res.data.motivo, 'Falha ao Salvar', util.toast)
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    cleanForm () {
      this.form.descricao = ''
      this.form.edit = false
      this.form.del = false
      this.form.add = true
      this.form.id = ''
      this.form.contexto = 0
    },
    validate (form) {
      if (this.form.descricao === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        this.save(form)
      }
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'tipopedido/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.form = res.data.obj
        this.form.add = false
        this.form.edit = true
        this.openloading = false
        this.openModal = true
      })
    }
  },
  components: {
    Dialog,
    Button,
    InputText
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

import { mapState } from 'vuex'
import adonai from '../../../http/router'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import utilClass from '../../../util/utilClass'
import VSwatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.css'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import ColorPicker from 'primevue/colorpicker'
import Card from 'primevue/card'

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    openDatasearch: false,
    open: false,
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
      descricao: '',
      cor: ''
    },
    eventostipo: []
  }),
  mounted () {
    utilClass.explorer.route = 'menu_eventos_tipos'
    this.$refs.grid.get(utilClass.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'eventoagenda', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com Sucesso', life: 5000 })
          this.openloading = false
          this.openModal = false
          this.cleanForm()
          utilClass.explorer.route = 'menu_eventos_tipos'
          this.$refs.grid.get(utilClass.explorer)
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
      form.cor = '#' + form.cor
      if (this.form.descricao === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios (Descricao)', life: 5000 })
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
      this.form.cor = ''
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'eventoagenda/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.form = res.data.obj
          this.form.add = false
          this.form.edit = true
          this.openModal = true
          this.openloading = false
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
  components: {
    VSwatches,
    Dialog,
    Button,
    InputText,
    ColorPicker,
    Card
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

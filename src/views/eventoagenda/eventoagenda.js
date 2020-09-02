import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import adonai from '../router/services'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import utilClass from '../../util/utilClass'
import VSwatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.css'
/* var moment = require('moment')
var data = new Date() */

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
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.$toastr.success(this.status, 'AdonaiSoft Diz:', util.toast)
          this.openloading = false
          this.openModal = false
          this.cleanForm()
          utilClass.explorer.route = 'menu_eventos_tipos'
          this.$refs.grid.get(utilClass.explorer)
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
          this.openloading = false
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    validate (form) {
      if (this.form.descricao === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        form.cor = form.color
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
    read (form) {
      this.form.id = form.id
      this.form.descricao = form.descricao
      this.form.cor = form.cor
      this.openModal = true
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'eventoagenda/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data.obj)
        this.openloading = false
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast), this.openloading = false)
    }
  },
  components: {
    VSwatches
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

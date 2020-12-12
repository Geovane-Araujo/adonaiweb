import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import adonai from '../../../http/router'
import axios from 'axios'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import adExplo from '../../../util/utilClass'

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    open: false,
    form: {
      id: '',
      descricao: ''
    }
  }),
  mounted () {
    adExplo.explorer.route = 'menu_curso'
    this.$refs.grid.get(adExplo.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'curso', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.$toastr.success('Salvo com Sucesso', 'AdonaiSoft Diz:', util.toast)
          this.openModal = false
          adExplo.explorer.route = 'menu_curso'
          this.$refs.grid.get(adExplo.explorer)
          this.openloading = false
        } else {
          this.openloading = false
          this.$toastr.error(res.data.motivo, 'Falha ao Salvar', util.toast)
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
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
      axios.get(adonai.url + 'curso/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.form = res.data.obj
        if (id !== -100) {
          this.form.add = false
          this.form.edit = true
        }
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

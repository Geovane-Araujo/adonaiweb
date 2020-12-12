import util from '../assets/scss/util'
import Button from 'primevue/button'
import adonai from '../http/router'
import axios from 'axios'

export default {
  data: () => ({
    openloading: false,
    form: {
      nome: '',
      email: '',
      telefone: '',
      login: ''
    }
  }),
  mounted () {
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'newUser', form).then(res => {
        if (res.data.ret === 'success') {
          this.openloading = false
          this.$toastr.success(res.data.motivo, 'AdonaiSoft Diz: ', util.toast)
          this.$router.push('login')
        } else {
          this.openloading = false
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz: ', util.toast)
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz: ', util.toast))
    },
    validade (form) {
      if (form.nome === '' || form.login === '' || form.telefone === '' || form.email === '') {
        this.$toastr.warning('Campos Obrigatórios Requerido', 'AdonaiSoft Diz: ', util.toast)
      } else {
        this.save(form)
      }
    }
  },
  components: {
    Button
  }
}

import { mapActions } from 'vuex'
import util from '../../../assets/scss/util'

export default {
  data: () => ({
    openloading: false,
    form: {
      cnpj: '',
      nome: '',
      senha: '',
      auth: '',
      token: navigator.name
    },
    mascara: '##.###.###/####-##',
    place: 'CNPJ',
    doc: 'CNPJ'
  }),
  mounted () {
    if (localStorage.getItem('cnpj') !== '') {
      this.form.cnpj = localStorage.getItem('cnpj')
    }
  },
  methods: {
    ...mapActions('auth', ['ActionLogin']),
    async submit () {
      try {
        this.openloading = true
        localStorage.setItem('cnpj', this.form.cnpj)
        await this.ActionLogin(this.form)
        var ret = localStorage.getItem('ret')
        if (ret === 'unsuccess') {
          this.$toastr.error(localStorage.getItem('login'), 'AdonaiSoft - Web', util.toast)
        } else {
          this.$toastr.success('Seja Bem Vindo(a)', 'AdonaiSoft - Web', util.toast)
          this.$router.push({ name: 'home' })
        }
        this.openloading = false
      } catch (err) {
        this.openloading = false
        this.$toastr.error(err, 'AdonaiSoft - Web', util.toast)
      }
    },
    verificar (doc) {
      if (doc === 'CNPJ') {
        this.place = 'CNPJ'
        this.mascara = '##.###.###/####-##'
      } else {
        this.place = 'CPF'
        this.mascara = '###.###.###-##'
      }
    }
  }
}

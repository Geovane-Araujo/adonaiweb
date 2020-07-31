import { mapActions } from 'vuex'
import util from '../../../assets/scss/util'

export default {
  data: () => ({
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
        localStorage.setItem('cnpj', this.form.cnpj)
        await this.ActionLogin(this.form)
        this.$toastr.success('Seja Bem Vindo(a)', 'AdonaiSoft - Web', util.toast)
        this.$router.push({ name: 'home', path: '/dashboard' })
      } catch (err) {
        this.$toastr.error('Verifique os dados de Autenticação', 'AdonaiSoft - Web', util.toast)
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

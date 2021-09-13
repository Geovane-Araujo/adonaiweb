import { mapActions } from 'vuex'

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
        var ret = sessionStorage.getItem('ret')
        if (ret === 'unsuccess') {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: sessionStorage.getItem('login'), life: 5000 })
        } else {
          this.$router.push({ name: 'home' })
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Seja Bem Vindo(a)', life: 5000 })
        }
        this.openloading = false
      } catch (err) {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
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

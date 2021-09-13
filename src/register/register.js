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
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Cadastrado com sucesso', life: 5000 })
          this.$router.push('login')
        } else {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
      }).catch(err => this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 }))
    },
    validade (form) {
      if (form.nome === '' || form.login === '' || form.telefone === '' || form.email === '') {
        this.$toast.add({ severity: 'info', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios Requerido', life: 5000 })
      } else {
        this.save(form)
      }
    }
  },
  components: {
    Button
  }
}

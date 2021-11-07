import 'vue-loading-overlay/dist/vue-loading.css'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea'
import axios from 'axios'
import http from '../../../http/router'

export default {
  data: () => ({
    openloading: false,
    openModal: false,
    habilitainclusao: false,
    form: {
      descricao: '',
      data: '',
      id: '',
      versao: ''
    },
    versoes: ''
  }),
  components: {
    Button,
    Dialog,
    Textarea
  },
  mounted () {
    this.getAll()
    var a = JSON.parse(sessionStorage.getItem('login'))
    if (a.auth === '9999') {
      this.habilitainclusao = true
    }
  },
  methods: {
    getAll () {
      axios.get(http.url + 'notasversao').then(res => {
        if (res.data.ret === 'success') {
          this.versoes = ''
          res.data.obj.forEach(e => {
            this.versoes += e.descricao
            this.versoes += '\n --- \n'
          })
        }
      }).catch(erros => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: erros, life: 5000 })
      })
    },
    save (form) {
      form.data = new Date()
      axios.post(http.url + 'notasversao', form).then(res => {
        if (res.data.ret === 'success') {
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com Sucesso!!!', life: 5000 })
          this.openModal = false
          this.getAll()
        }
      }).catch(erros => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: erros, life: 5000 })
      })
    }
  }
}

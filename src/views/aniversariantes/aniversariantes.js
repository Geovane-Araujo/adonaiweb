import { mapState } from 'vuex'
import axios from 'axios'
import adonai from '../router/services'

export default {
  data () {
    return {
      pagina: 1,
      openModal: false,
      aniversariantes: [],
      form: {
        nome: '',
        telefone: '',
        datanascimento: '',
        mensagem: ''
      }
    }
  },
  mounted () {
    this.buscaraniversariante()
  },
  methods: {
    buscaraniversariante () {
      axios.get(adonai.url + 'aniversariantes/' + this.pagina, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.aniversariantes = res.data
      })
    },
    enviarMensagem (form) {
      form.telefone = form.telefone.replace('(', '')
      form.telefone = form.telefone.replace(')', '')
      form.telefone = form.telefone.replace('-', '')
      window.open('https://api.whatsapp.com/send?phone=${encodeURIComponent(55' + form.telefone + ')}&text=' + form.mensagem)
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

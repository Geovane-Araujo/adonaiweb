import { mapState } from 'vuex'
import axios from 'axios'
import adonai from '../router/services'
import util from '../../assets/scss/util'

export default {
  data () {
    return {
      pagina: 1,
      openModal: false,
      openloading: false,
      aniversariantes: [],
      explorer: {
        route: 'menu_aniversariantes',
        pagina: 1,
        criterios: 'order by id desc'
      },
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
      this.openloading = true
      axios.post(adonai.url + 'aexplorer', this.explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.aniversariantes = res.data.obj
        this.openloading = false
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
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

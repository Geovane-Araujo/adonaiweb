import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import adonai from '../router/services'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    form: {
      idversiculo: '',
      versao: '',
      livro: '',
      capitulo: '',
      versiculo: ''
    },
    versao: [],
    livros: []
  }),
  mounted () {
    this.getversion()
  },
  methods: {
    getversion () {
      this.openloading = true
      axios.get(adonai.url + 'bibliaversao', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.livros = res.data.livros
          this.versao = res.data.versoes
        } else {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
        }
        this.openloading = false
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

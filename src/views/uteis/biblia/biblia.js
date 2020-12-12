import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import adonai from '../../../http/router'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    form: {
      id: '',
      idversao: '',
      idlivro: '',
      capitulo: '',
      versiculo: '',
      texto: '',
      crit: ''
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
    },
    getbible (form) {
      if (form.capitulo === '') {
        this.$toastr.info('Escolha um Capítulo', 'AdonaiSoft Diz:', util.toast)
      } else if (form.versiculo === '') {
        this.$toastr.info('Escolha um Versiculo', 'AdonaiSoft Diz:', util.toast)
      } else if (form.idversao === '') {
        this.$toastr.info('Selecione uma Versão', 'AdonaiSoft Diz:', util.toast)
      } else if (form.idlivro === '') {
        this.$toastr.info('Selecione um Livro', 'AdonaiSoft Diz:', util.toast)
      } else {
        this.openloading = true
        form.crit = ' AND IDlivro  = ' + form.idlivro + ' AND idversao = ' + form.idversao + ' AND capitulo = ' + form.capitulo + ' AND versiculo = ' + form.versiculo
        axios.post(adonai.url + 'bibliavers', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.form.texto = res.data.biblia.texto
            this.form.id = res.data.biblia.id
            this.openModal = true
          } else {
            this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
          }
          this.openloading = false
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      }
    },
    nextver (form) {
      this.openloading = true
      form.crit = ' AND versiculos.ID  = ' + form.id
      axios.post(adonai.url + 'bibliavers', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.form.texto = res.data.biblia.texto
          this.form.id = res.data.biblia.id
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

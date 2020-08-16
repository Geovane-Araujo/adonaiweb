import { mapState } from 'vuex'
import adonai from '../views/router/services'
import util from '../assets/scss/util'
import axios from 'axios'

export default {
  name: 'adonaigrid',
  data () {
    return {
      openloading: false,
      deleteModal: false,
      pagina: 1,
      reg: []
    }
  },
  props: {
    titulos: {
      type: Array,
      required: true
    },
    registros: {
      type: Array
    },
    form: {
      type: Object
    },
    explorer: {
      type: Object
    },
    getbyId: Function,
    save: Function
  },
  mounted () {
    // this.get(this.explorer)
  },
  methods: {
    explorer (route, pagina, criterio) {
      if (criterio === '' || criterio === undefined) {
        axios.get(adonai.url + route + '/' + 1, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          this.registros = res.data
        })
      } else {
        axios.get(adonai.url + route + '/' + 1 + '/' + criterio, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          this.registros = res.data
        })
      }
    },
    get (explorer) {
      this.openloading = true
      axios.post(adonai.url + 'aexplorer', explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.openloading = false
        if (res.data.ret === 'success') {
          this.reg = res.data.obj
        } else {
          this.openloading = false
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
        }
      })
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

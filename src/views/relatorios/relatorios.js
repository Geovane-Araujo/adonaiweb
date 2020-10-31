import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import adonai from '../router/services'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import rel from '../../util/utilClass'

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    openDatasearch: false,
    openFilter: false,
    ds: {
      grid: [],
      title: '',
      params: ''
    },
    criterio: '',
    report: {
      relatorio: '',
      simpleObjects: '',
      simpleObjects1: '',
      simpleObjects2: ''
    },
    filters: {
      idpessoa: '',
      nome: ''
    }
  }),
  methods: {
    imprimir (report) {
      this.openloading = true
      this.openFilter = false
      axios.post(adonai.url + 'imprimir', report, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.openloading = false
        window.open(res.data)
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    clear (report) {
      var rel
      for (rel in report) {
        this.report[rel] = ''
      }
    },
    datasearch (route) {
      if (route === 1) {
        rel.explorerflex.route = 'exp_membro'
        rel.explorerflex.criterios = 'ORDER BY ID DESC'
        this.ds.grid = ['id', 'nome']
        this.ds.title = 'Membro'
        this.$refs.cmp.dataSearch(rel.explorerflex, 1, 1)
      }
    },
    filter (filters) {
      if (filters.nome !== '') {
        this.criterio = ' AND pessoa_membro.idpessoa = ' + filters.idpessoa
      }
      this.report.simpleObjects = this.criterio
      this.imprimir(this.report)
    },
    destroy (registro, params) {
      if (params === 1) {
        this.filters.nome = registro.nome
        this.filters.idpessoa = registro.id
      }
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

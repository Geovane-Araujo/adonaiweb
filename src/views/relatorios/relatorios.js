import { mapState } from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css'
import rel from '../../util/utilClass'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

export default {
  data: () => ({
    openModal: false,
    openloading: false,
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
    async imprimir (relatorio) {
      this.openloading = true
      await rel.methods.imprimir(relatorio, this.user.token)
      this.openloading = false
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
  components: {
    Dialog,
    Button,
    InputText
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

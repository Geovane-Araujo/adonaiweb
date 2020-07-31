import { mapState } from 'vuex'
import adonai from '../views/router/services'
import axios from 'axios'

export default {
  name: 'adonaigrid',
  data () {
    return {
      deleteModal: false,
      pagina: 1
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
    getbyId: Function,
    save: Function
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
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

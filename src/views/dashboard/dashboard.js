import { mapState } from 'vuex'
import { Bar } from 'vue-chartjs'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../router/services'
import axios from 'axios'

export default {
  extends: Bar,
  data () {
    return {
      openModal: false,
      openloading: false,
      open: false,
      dataset_finan: [
        {
          label: 'Receitas',
          backgroundColor: '#82cef5',
          data: [22, 54, 150, 256, 587, 696, 12, 269, 147, 369, 247, 369]
        },
        {
          label: 'Despesas',
          backgroundColor: '#f87979',
          data: [22, 54, 150, 256, 587, 696, 12, 269, 147, 369, 247, 369]
        }
      ],
      cabe_finan: ['Janeio', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      cabe_tipos: ['Janeio', 'Fevereiro'],
      dataset_tipos: [
        {
          label: 'Teste',
          backgroundColor: ['#82cef5', '#f87979'],
          data: [22, 54]
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    get () {
      axios.get(adonai.url + 'igrejagrid/' + 1, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.igreja = res.data
        this.openloading = false
      })
      /* this.$refs.expl.explorer('igrejagrid',1,'') */
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

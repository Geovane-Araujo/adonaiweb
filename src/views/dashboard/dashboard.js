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
      membros: '',
      entradas: '',
      despesas: '',
      dataset_finan: [
        {
          label: 'Receitas',
          backgroundColor: '#82cef5',
          data: ''
        },
        {
          label: 'Despesas',
          backgroundColor: '#f87979',
          data: ''
        }
      ],
      cabe_finan: ['Janeio', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      cabe_tipos_entradas: '',
      dataset_tipos_entradas: [
        {
          label: 'Tipos de Entradas',
          backgroundColor: ['#82cef5', '#f87979', '#72a167', '#167572', '#dba88a', '#c95fbb'],
          data: ''
        }
      ],
      cabe_tipos_despesas: '',
      dataset_tipos_despesas: [
        {
          label: 'Tipos de Saídas',
          backgroundColor: ['#82cef5', '#f87979', '#72a167', '#167572', '#dba88a', '#c95fbb'],
          data: ''
        }
      ]
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    get () {
      this.openloading = true
      axios.get(adonai.url + 'dashboard/' + this.user.id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.membros = res.data.membros
        this.entradas = res.data.entradas
        this.despesas = res.data.saidas
        this.cabe_tipos_despesa = res.data.tipoReceitas
        this.cabe_tipos_entradas = res.data.tipoDespesas
        this.dataset_finan[0].data = res.data.receitas
        this.dataset_finan[1].data = res.data.despesas
        this.dataset_tipos_despesas[0].data = res.data.valorReceitas
        this.dataset_tipos_entradas[0].data = res.data.valorDespesas
        this.$refs.year.render(this.cabe_finan, this.dataset_finan)
        this.$refs.des.render(this.cabe_tipos_despesa, this.dataset_tipos_despesas)
        this.$refs.rec.render(this.cabe_tipos_entradas, this.dataset_tipos_entradas)
        this.openloading = false
      })
      /* this.$refs.expl.explorer('igrejagrid',1,'') */
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

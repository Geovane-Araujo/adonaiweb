import { mapState } from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../../../http/router'
import utilClass from '../../../util/utilClass'
import axios from 'axios'
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'

export default {
  data () {
    return {
      filters: false,
      openloading: false,
      open: false,
      membros: '',
      entradas: '',
      compromissos: 0,
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
          backgroundColor: [],
          data: ''
        }
      ],
      cabe_tipos_despesas: '',
      dataset_tipos_despesas: [
        {
          label: 'Tipos de Saídas',
          backgroundColor: [],
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
        this.membros = res.data.obj.membros
        this.entradas = res.data.obj.entradas
        this.despesas = res.data.obj.saidas
        this.compromissos = res.data.obj.compromissos
        this.cabe_tipos_despesa = res.data.obj.tipoReceitas
        this.cabe_tipos_entradas = res.data.obj.tipoDespesas
        this.dataset_finan[0].data = res.data.obj.receitas
        this.dataset_finan[1].data = res.data.obj.despesas
        this.dataset_tipos_despesas[0].data = res.data.obj.valorReceitas
        this.dataset_tipos_entradas[0].data = res.data.obj.valorDespesas

        this.dataset_tipos_entradas[0].data.forEach(element => {
          this.dataset_tipos_entradas[0].backgroundColor.push(utilClass.methods.randomColor())
        })
        this.dataset_tipos_despesas[0].data.forEach(element => {
          this.dataset_tipos_despesas[0].backgroundColor.push(utilClass.methods.randomColor())
        })
        this.$refs.year.render(this.cabe_finan, this.dataset_finan)
        this.$refs.des.render(this.cabe_tipos_despesa, this.dataset_tipos_despesas, 'left')
        this.$refs.rec.render(this.cabe_tipos_entradas, this.dataset_tipos_entradas, 'left')
        this.openloading = false
      })
      /* this.$refs.expl.explorer('igrejagrid',1,'') */
    }
  },
  components: {
    Button,
    Sidebar
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

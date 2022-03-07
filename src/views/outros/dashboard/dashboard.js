import { mapState } from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../../../http/router'
import utilClass from '../../../util/utilClass'
import axios from 'axios'
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'
import Dropdown from 'primevue/dropdown'

export default {
  data () {
    return {
      filters: false,
      openloading: false,
      open: false,
      ano: [],
      filter: {
        idcaixa: 0,
        idusuario: 0,
        ano: new Date().getFullYear()
      },
      models: {
        descriptioncashier: '',
        userName: ''
      },
      membros: '',
      entradas: '',
      compromissos: 0,
      despesas: '',
      // dados anuais
      dataset_finan: [
        {
          label: 'Receitas',
          backgroundColor: '#059BFF',
          data: ''
        },
        {
          label: 'Receitas Pendentes',
          backgroundColor: '#a2d4f5',
          data: ''
        },
        {
          label: 'Despesas',
          backgroundColor: '#ff91a8',
          data: ''
        },
        {
          label: 'Despesas Pendentes',
          backgroundColor: '#fcbbc9',
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
      ],
      ds: {
        grid: [],
        title: ''
      }
    }
  },
  mounted () {
    utilClass.methods.onYear(this.ano)
    this.get()
    this.onYearly()
  },
  methods: {
    onFilter () {
      this.onYearly()
    },
    onYearly () {
      /*
        aqui pega os dados do grafico anual
      */
      if (this.models.descriptioncashier === '') {
        this.filter.idcaixa = 0
      }
      if (this.models.userName === '') {
        this.filter.idusuario = 0
      }
      this.openloading = true
      axios.post(adonai.urlService + 'bi/anual/', this.filter, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.dataset_finan[0].data = res.data.receitaspagas
        this.dataset_finan[1].data = res.data.receitaspendentes
        this.dataset_finan[2].data = res.data.despesaspagas
        this.dataset_finan[3].data = res.data.despesaspendentes

        this.dataset_finan[0].slack = '0'
        this.dataset_finan[1].slack = '0'
        this.dataset_finan[2].slack = '1'
        this.dataset_finan[3].slack = '1'
        this.$refs.year.render(this.cabe_finan, this.dataset_finan, 2)
        this.openloading = false
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },

    get () {
      /*
        aqui pega os dados dos cards de tipos de despesas tipos de receitas e totais
      */
      this.openloading = true
      axios.get(adonai.url + 'dashboard/' + this.user.id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.membros = res.data.obj.membros
        this.entradas = res.data.obj.entradas
        this.despesas = res.data.obj.saidas
        this.compromissos = res.data.obj.compromissos
        this.cabe_tipos_despesa = res.data.obj.tipoReceitas
        this.cabe_tipos_entradas = res.data.obj.tipoDespesas

        this.dataset_tipos_despesas[0].data = res.data.obj.valorReceitas
        this.dataset_tipos_entradas[0].data = res.data.obj.valorDespesas

        this.dataset_tipos_entradas[0].data.forEach(element => {
          this.dataset_tipos_entradas[0].backgroundColor.push(utilClass.methods.randomColor())
        })
        this.dataset_tipos_despesas[0].data.forEach(element => {
          this.dataset_tipos_despesas[0].backgroundColor.push(utilClass.methods.randomColor())
        })
        this.$refs.des.render(this.cabe_tipos_despesa, this.dataset_tipos_despesas, 'left')
        this.$refs.rec.render(this.cabe_tipos_entradas, this.dataset_tipos_entradas, 'left')
        this.openloading = false
      })
    },
    datasearch (route) {
      if (route === 1) {
        utilClass.explorerflex.route = 'exp_caixa'
        utilClass.explorerflex.pagina = 1
        utilClass.explorerflex.order = ''
        this.ds.title = 'Caixa'
        this.$refs.cmp.dataSearch(utilClass.explorerflex, 1, 1)
      } else if (route === 2) {
        utilClass.explorerflex.route = 'exp_agenda_usuarios'
        utilClass.explorerflex.pagina = 1
        utilClass.explorerflex.order = ''
        this.ds.title = 'Usuário'
        this.$refs.cmp.dataSearch(utilClass.explorerflex, 2, 2)
      }
    },
    onDestroy (registro, params) {
      if (params === 1) {
        this.models.descriptioncashier = registro.descricao
        this.filter.idcaixa = registro.idmovimento
      } else if (params === 2) {
        this.models.userName = registro.Nome
        this.filter.idusuario = registro.ID
      }
      this.open = false
    }
  },
  components: {
    Button,
    Sidebar,
    Dropdown
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

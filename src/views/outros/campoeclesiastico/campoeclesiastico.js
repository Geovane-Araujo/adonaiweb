import { mapState } from 'vuex'
import { Bar } from 'vue-chartjs'
import util from '../../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../../../http/router'
import axios from 'axios'
import utc from '../../../util/utilClass'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Sidebar from 'primevue/sidebar'
import RadioButton from 'primevue/radiobutton'
export default {
  extends: Bar,
  data () {
    return {
      openModal: false,
      open: false,
      visibleLeft: false,
      modal: true,
      show: false,
      ano: [
        {
          text: 'Todos',
          value: 0
        },
        {
          text: '2018',
          value: 2018
        },
        {
          text: '2019',
          value: 2019
        },
        {
          text: '2020',
          value: 2020
        }
      ],
      mes: [
        {
          text: 'Todos',
          value: 0
        },
        {
          text: 'Janeiro',
          value: 1
        },
        {
          text: 'Fevereiro',
          value: 2
        },
        {
          text: 'Março',
          value: 3
        },
        {
          text: 'Abril',
          value: 4
        },
        {
          text: 'Maio',
          value: 5
        },
        {
          text: 'Junho',
          value: 6
        },
        {
          text: 'Julho',
          value: 7
        },
        {
          text: 'Agosto',
          value: 8
        },
        {
          text: 'Setembro',
          value: 9
        },
        {
          text: 'Outubro',
          value: 10
        },
        {
          text: 'Novembro',
          value: 11
        },
        {
          text: 'Dezembro',
          value: 12
        }
      ],
      form: {
        tipo: 1,
        ano: 0,
        mes: 0
      },
      a: {
        totalIgrejas: 0,
        totalMembros: 0
      },
      b: {
        listaIgrejas: []
      },
      chartGeral: {
        membros: [
          {
            label: [],
            backgroundColor: [],
            data: ''
          }
        ],
        labelMembros: '',
        membrosAtivos: [
          {
            label: 'Membros Ativos',
            backgroundColor: [],
            data: ''
          }
        ],
        labelMembrosAtivos: '',
        membrosNaoBatizados: [
          {
            label: 'Membros Ativos',
            backgroundColor: [],
            data: ''
          }
        ],
        labelMembrosNaoBatzados: '',
        eventosRealizados: [
          {
            label: 'Membros Ativos',
            backgroundColor: [],
            data: ''
          }
        ],
        labelEventosRealizados: '',
        novosConvertidos: [
          {
            label: 'Membros Ativos',
            backgroundColor: [],
            data: ''
          }
        ],
        labelNovosConvertidos: '',
        visitantes: [
          {
            label: 'Membros Ativos',
            backgroundColor: [],
            data: ''
          }
        ],
        labelVisitantes: '',
        receitas: [],
        labelReceitas: [],
        despesas: [],
        labelDespesas: []
      }
    }
  },
  mounted () {
    this.show = true
    this.listaIgrejas()
    this.getCharts(this.form)
  },
  methods: {
    getCharts (form) {
      this.show = true
      axios.post(adonai.url + 'dashboardcampoeclesiastico', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          // grava os dados vindos do bnco para o obj
          // Total de Membros
          this.chartGeral.labelMembros = res.data.Total.nomeIgreja
          this.chartGeral.membros[0].data = res.data.Total.Membros
          this.chartGeral.membros[0].data.forEach(element => {
            this.chartGeral.membros[0].backgroundColor.push(utc.methods.randomColor())
            // this.chartGeral.membros[0].label.push(element)
          })

          var insertObjectChartMembers = []
          insertObjectChartMembers.push(utc.methods.inserirObjectDuoChart(res.data.Total.Membros, 'Membros', utc.methods.randomColor(), 0))
          insertObjectChartMembers.push(utc.methods.inserirObjectDuoChart(res.data.Total.MembrosBatizados, 'Membros Batizados', utc.methods.randomColor(), 0))
          insertObjectChartMembers.push(utc.methods.inserirObjectDuoChart(res.data.Total.MembrosNaoBatizados, 'Membros Não Batizados', utc.methods.randomColor(), 0))
          insertObjectChartMembers.push(utc.methods.inserirObjectDuoChart(res.data.Total.MembrosAtivos, 'Membros Ativos', utc.methods.randomColor(), 0))
          // Membros Ativos -- Total
          this.chartGeral.labelMembrosAtivos = res.data.Total.nomeIgreja
          this.chartGeral.membrosAtivos[0].data = res.data.Total.MembrosAtivos
          this.chartGeral.membrosAtivos[0].data.forEach(element => {
            this.chartGeral.membrosAtivos[0].backgroundColor.push(utc.methods.randomColor())
          })

          // Membros Não Batizados -- Total
          this.chartGeral.labelMembrosNaoBatzados = res.data.Total.nomeIgreja
          this.chartGeral.membrosNaoBatizados[0].data = res.data.Total.MembrosNaoBatizados
          this.chartGeral.membrosNaoBatizados[0].data.forEach(element => {
            this.chartGeral.membrosNaoBatizados[0].backgroundColor.push(utc.methods.randomColor())
          })

          // Eventos Realizados-- Total
          this.chartGeral.labelEventosRealizados = res.data.Total.nomeIgreja
          this.chartGeral.eventosRealizados[0].data = res.data.Total.Eventos
          this.chartGeral.eventosRealizados[0].data.forEach(element => {
            this.chartGeral.eventosRealizados[0].backgroundColor.push(utc.methods.randomColor())
          })

          // Novos Convertidos -- Total
          this.chartGeral.labelNovosConvertidos = res.data.Total.nomeIgreja
          this.chartGeral.novosConvertidos[0].data = res.data.Total.NovosConvertidos
          this.chartGeral.novosConvertidos[0].data.forEach(element => {
            this.chartGeral.novosConvertidos[0].backgroundColor.push(utc.methods.randomColor())
          })

          // Visitantes -- Total
          this.chartGeral.labelVisitantes = res.data.Total.nomeIgreja
          this.chartGeral.visitantes[0].data = res.data.Total.Visitantes
          this.chartGeral.visitantes[0].data.forEach(element => {
            this.chartGeral.visitantes[0].backgroundColor.push(utc.methods.randomColor())
          })

          // receitas
          var finalObjectChartReceitas = []
          finalObjectChartReceitas.push(utc.methods.inserirObjectDuoChart(res.data.Total.receitas, 'Receitas', utc.methods.randomColor(), 1))
          this.chartGeral.labelReceitas = []
          utc.methods.inserirNomeArray(res.data.Total.nomeIgreja, this.chartGeral.labelReceitas)

          // Despesas
          var finalObjectChartDespesas = []
          var cor = ''
          cor = utc.methods.randomColor()
          finalObjectChartDespesas.push(utc.methods.inserirObjectDuoChart(res.data.Total.DespesasPagas, 'Despesas Pagas', cor, 1))
          finalObjectChartDespesas.push(utc.methods.inserirObjectDuoChart(res.data.Total.DespesasPendentes, 'Despesas Pendentes', utc.methods.LightenDarkenColor(cor, 50), 1))
          this.chartGeral.labelDespesas = []
          utc.methods.inserirNomeArray(res.data.Total.nomeIgreja, this.chartGeral.labelDespesas)

          // manda os dados para os gráficos -- Total
          this.$refs.membros.render(this.chartGeral.labelMembros, this.chartGeral.membros, 'top')
          this.$refs.membrosativos.render(this.chartGeral.labelMembrosAtivos, this.chartGeral.membrosAtivos, 'top')
          this.$refs.membrosNaoBatizado.render(this.chartGeral.labelMembrosAtivos, this.chartGeral.membrosNaoBatizados, 'top')
          this.$refs.eventos.render(this.chartGeral.labelEventosRealizados, this.chartGeral.eventosRealizados, 'top')
          this.$refs.novosConvertidos.render(this.chartGeral.labelNovosConvertidos, this.chartGeral.novosConvertidos, 'top')
          this.$refs.visitantes.render(this.chartGeral.labelVisitantes, this.chartGeral.visitantes, 'top')
          this.$refs.receitas.render(this.chartGeral.labelDespesas, finalObjectChartReceitas)
          this.$refs.despesas.render(this.chartGeral.labelDespesas, finalObjectChartDespesas)
          this.$refs.memb.render(this.chartGeral.labelDespesas, insertObjectChartMembers)
        }
        this.show = false
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      /* this.$refs.expl.explorer('igrejagrid',1,'') */
    },
    listaIgrejas () {
      axios.get(adonai.url + 'listaigrejas', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.b.listaIgrejas = res.data.obj
          this.a.totalIgrejas = this.b.listaIgrejas.length
        } else {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      /* this.$refs.expl.explorer('igrejagrid',1,'') */
    },
    onShown () {
      // Focus the cancel button when the overlay is showing
      this.$refs.cancel.focus()
    },
    onHidden () {
      // Focus the show button when the overlay is removed
      this.$refs.show.focus()
    }
  },
  components: {
    Dialog,
    Button,
    InputText,
    DataTable,
    Column,
    Sidebar,
    RadioButton
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

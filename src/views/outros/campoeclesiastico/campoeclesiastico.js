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
      openloading: false,
      open: false,
      visibleLeft: false,
      modal: true,
      ano: [
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
        ano: '2020',
        mes: '12'
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
            label: 'Membros',
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
        labelVisitantes: ''
      }
    }
  },
  mounted () {
    this.listaIgrejas()
    this.getCharts(this.form)
  },
  methods: {
    getCharts (form) {
      this.openloading = true
      axios.post(adonai.url + 'dashboardcampoeclesiastico', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          // grava os dados vindos do bnco para o obj

          // Total de Membros
          this.chartGeral.labelMembros = res.data.Total.nomeIgreja
          this.chartGeral.membros[0].data = res.data.Total.Membros
          this.chartGeral.membros[0].data.forEach(element => {
            this.chartGeral.membros[0].backgroundColor.push(utc.methods.randomColor())
          })

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

          // manda os dados para os gráficos -- Total
          this.$refs.membros.render(this.chartGeral.labelMembros, this.chartGeral.membros)
          this.$refs.membrosativos.render(this.chartGeral.labelMembrosAtivos, this.chartGeral.membrosAtivos)
          this.$refs.membrosNaoBatizado.render(this.chartGeral.labelMembrosAtivos, this.chartGeral.membrosNaoBatizados)
          this.$refs.eventos.render(this.chartGeral.labelEventosRealizados, this.chartGeral.eventosRealizados)
          this.$refs.novosConvertidos.render(this.chartGeral.labelNovosConvertidos, this.chartGeral.novosConvertidos)
          this.$refs.visitantes.render(this.chartGeral.labelVisitantes, this.chartGeral.visitantes)
        }
        this.openloading = false
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      /* this.$refs.expl.explorer('igrejagrid',1,'') */
    },
    listaIgrejas () {
      this.openloading = true
      axios.get(adonai.url + 'listaigrejas', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.b.listaIgrejas = res.data.obj
          this.a.totalIgrejas = this.b.listaIgrejas.length
        } else {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      /* this.$refs.expl.explorer('igrejagrid',1,'') */
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

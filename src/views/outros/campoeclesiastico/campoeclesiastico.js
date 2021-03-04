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
      loader: false,
      modal: true,
      show: false,
      anoCorrente: '',
      labelAno: ['Janeio', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
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
        },
        {
          text: '2021',
          value: 2021
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
      c: {
        nomeIgreja: '',
        bairros: []
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
      },
      chartAnual: {
        despesas: [
          {
            label: 'Despesas',
            backgroundColor: '#82cef5',
            data: '',
            fill: false
          }
        ],
        receitas: [],
        membros: [
          {
            label: 'Membros',
            backgroundColor: '#82cef5',
            data: []
          }
        ],
        novosConvertidos: [],
        visitantes: [],
        batizados: [],
        eventos: []
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
      if (form.ano === 0 && form.mes !== 0) {
        this.$toastr.info('Por favor selecione um ano diferente de "Todos"', 'AdonaiSoft Diz:', util.toast)
        return
      }
      this.show = true
      axios.post(adonai.url + 'dashboardcampoeclesiastico', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          if (this.a.totalMembros === 0) {
            res.data.Total.Membros.forEach(element => {
              this.a.totalMembros += element
            })
          }
          // grava os dados vindos do bnco para o obj
          // Total de Membros
          this.chartGeral.labelMembros = res.data.Total.nomeIgreja
          this.chartGeral.membros[0].data = res.data.Total.Membros
          this.chartGeral.membros[0].data.forEach(element => {
            this.chartGeral.membros[0].backgroundColor.push(utc.methods.randomColor())
            // this.chartGeral.membros[0].label.push(element)
          })

          var insertObjectChartMembers = []
          var insertObjectChartMembersNotBatizados = []

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
          // finalObjectChartDespesas.push(utc.methods.inserirObjectDuoChart(res.data.Total.receitas, 'Receitas', '#f56c79', 0))
          finalObjectChartDespesas.push(utc.methods.inserirObjectDuoChart(res.data.Total.DespesasPagas, 'Despesas Pagas', cor, 1))
          finalObjectChartDespesas.push(utc.methods.inserirObjectDuoChart(res.data.Total.DespesasPendentes, 'Despesas Pendentes', utc.methods.LightenDarkenColor(cor, 50), 1))
          this.chartGeral.labelDespesas = []

          insertObjectChartMembers.push(utc.methods.inserirObjectDuoChart(res.data.Total.Membros, 'Membros', cor, 1))
          insertObjectChartMembersNotBatizados.push(utc.methods.inserirObjectDuoChart(res.data.Total.MembrosNaoBatizados, 'Membros Não Batizados', cor, 1))

          utc.methods.inserirNomeArray(res.data.Total.nomeIgreja, this.chartGeral.labelDespesas)

          // manda os dados para os gráficos -- Total
          this.$refs.membrosNaoBatizados.render(this.chartGeral.labelMembros, insertObjectChartMembersNotBatizados)
          this.$refs.eventos.render(this.chartGeral.labelEventosRealizados, this.chartGeral.eventosRealizados, 'top')
          this.$refs.novosConvertidos.render(this.chartGeral.labelNovosConvertidos, this.chartGeral.novosConvertidos, 'top')
          this.$refs.visitantes.render(this.chartGeral.labelVisitantes, this.chartGeral.visitantes, 'top')
          this.$refs.receitas.render(this.chartGeral.labelDespesas, finalObjectChartReceitas)
          this.$refs.despesas.render(this.chartGeral.labelDespesas, finalObjectChartDespesas)
          this.$refs.memb.render(this.chartGeral.labelMembros, insertObjectChartMembers)
        }
        this.show = false
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    listaIgrejas () {
      axios.get(adonai.url + 'listaigrejas', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.b.listaIgrejas = res.data.obj
          this.a.totalMembros = 0
          this.a.totalIgrejas = this.b.listaIgrejas.length
        } else {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      /* this.$refs.expl.explorer('igrejagrid',1,'') */
    },
    getAnual (id, ano) {
      this.loader = true
      axios.get(adonai.url + 'resumoanual/' + id + '/' + ano, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.loader = false
          // membros
          var data = []
          data.push(utc.methods.inserirObjectDuoChart(res.data.obj.totalMembros, 'Membros', utc.methods.randomColor(), 0))
          data.push(utc.methods.inserirObjectDuoChart(res.data.obj.totalMembrosBatizados, 'Membros Batizados', utc.methods.randomColor(), 0))
          data.push(utc.methods.inserirObjectDuoChart(res.data.obj.totaleventos, 'Eventos Realizados', utc.methods.randomColor(), 0))
          this.$refs.tete.render(this.labelAno, data)

          var financeiro = []
          financeiro.push(utc.methods.inserirObjectDuoChart(res.data.obj.receitas, 'Receitas', utc.methods.randomColor(), 1))
          financeiro.push(utc.methods.inserirObjectDuoChart(res.data.obj.despesas, 'Despesas', utc.methods.randomColor(), 1))
          this.$refs.rec.render(this.labelAno, financeiro)

          this.c.bairros = res.data.bairros
        }
      }).catch(err => {
        this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast)
        this.loader = false
      })
    },
    onOpen (pros) {
      this.openModal = true
      this.c.nomeIgreja = pros.data.nomeIgreja
      if (this.form.ano === 0) {
        this.form.ano = 2021
      }
      this.getAnual(pros.data.idFilial, this.form.ano)
      this.loader = false
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

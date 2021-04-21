<template>
  <div>
    <loader v-show="loader" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <b-overlay :show="show" rounded="sm">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Dados Campo Eclesiástico (Beta)</p>
          <hr class="bg-info">
          <b-tabs>
            <b-tab title="Principal">
              <div class="row">
                <div class="col-sm-6">
                  <div class="col-sm-12 p-shadow-1" style="background-color: #ffffff;">
                    <div class="row">
                      <div class="col-sm-6">
                        <img src="../img/igreja.png"
                        aria-hidden="true"
                        style=" text-align:rigth;">
                      </div>
                      <div class="col-sm-6">
                          <h6 style="text-align: left;">Total de Igrejas</h6>
                          <h1 style="text-align: left; font-size: 30px; ">{{ a.totalIgrejas }}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="col-sm-12 p-shadow-1" style="background-color: #ffffff;">
                    <div class="row">
                      <div class="col-sm-6">
                        <img src="../img/membros.png"
                        aria-hidden="true"
                        style=" text-align:center;">
                      </div>
                      <div class="col-sm-6">
                          <h6 style="text-align: left;">Total de Fieis no Campo</h6>
                          <h1 style="text-align: left; font-size: 30px; ">{{ a.totalMembros }}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h4>Igrejas do Campo</h4>
              <section>
                <div class="col-sm-12">
                  <b-form-group>
                    <DataTable :value="b.listaIgrejas" :scrollable="true" scrollHeight="300px" :loading="loading">
                      <Column field="idFilial" header="id"></Column>
                      <Column field="nomeIgreja" header="Igreja"></Column>
                      <Column field="pastorResponsavel" header="Pastor Responsável"></Column>
                      <Column field="localidade" header="Bairro/Cidade"></Column>
                      <Column headerStyle="width: 80px;" bodyStyle=""  :exportable="false">
                        <template #body="slotProps">
                            <Button icon="pi pi-eye" class="p-button-rounded p-button-outlined p-button-info p-button-sm" @click="onOpen(slotProps)" />
                        </template>
                      </Column>
                    </DataTable>
                  </b-form-group>
                </div>
              </section>
            </b-tab>
            <b-tab title="DashBoard">
              <b-sidebar
                id="sidebar-backdrop"
                title="Filtros"
                :backdrop-variant="variant"
                backdrop
                right
                shadow>
                <b-container style="padding:0px;">
                  <div class="col-sm-12">
                    <b-form-group label="Ano">
                      <b-form-select
                      :options="ano"
                      v-model="form.ano"
                      ></b-form-select>
                    </b-form-group>
                  </div>
                  <div class="col-sm-12">
                    <b-form-group label="Mês">
                      <b-form-select
                      :options="mes"
                      v-model="form.mes"
                      ></b-form-select>
                    </b-form-group>
                  </div>
                  <div class="col-sm-12">
                    <Button label="Filtrar" @click="form.tipo=2;getCharts(form);" class="p-button-raised p-button-success p-button-text button" />
                  </div>
                </b-container>
              </b-sidebar>
              <div>
                <div class="row">
                  <div class="col-sm-2">
                    <h5>Membros</h5>
                  </div>
                  <div class="col-sm-10">
                    <button
                      class="btn btn-outline-info" style="float:right;"
                      v-b-toggle.sidebar-backdrop>
                      <img src="../img/filter.png">
                    </button>
                  </div>
                </div>
                <hr class="bg-info">
                <div class="row">
                  <div  class="col-sm-6 p-shadow-1">
                    <b-form-group label="Total Membros Por Igreja" label-align="center">
                      <horizontalbar class="chartHeight"
                      :label="chartGeral.labelMembros"
                      :datasets="chartGeral.membros" ref="memb">
                      </horizontalbar>
                    </b-form-group>
                  </div>
                  <div  class="col-sm-6 p-shadow-1">
                    <b-form-group label="Total Membros Não Batizados por Igreja" label-align="center">
                      <horizontalbar class="chartHeight"
                      :label="chartGeral.labelMembros"
                      :datasets="chartGeral.membrosNaoBatizados" ref="membrosNaoBatizados">
                      </horizontalbar>
                    </b-form-group>
                  </div>
                </div>
                <h5 style="margin-top:20px;">Engajamento</h5>
                <hr class="bg-info">
                <div class="row">
                  <div class="col-sm-4 p-shadow-1">
                    <b-form-group label="Total de Eventos Realizados na/pela Igreja" label-align="center">
                      <polar class="chartHeight-400"
                      :label="chartGeral.labelEventosRealizados"
                      :datasets="chartGeral.eventosRealizados" ref="eventos">
                      </polar>
                    </b-form-group>
                  </div>
                  <div class="col-sm-4 p-shadow-1">
                    <b-form-group label="Total de Novos Convertidos" label-align="center">
                      <piechart class="chartHeight-400"
                      :label="chartGeral.labelNovosConvertidos"
                      :datasets="chartGeral.novosConvertidos" ref="novosConvertidos">
                      </piechart>
                    </b-form-group>
                  </div>
                  <div class="col-sm-4 p-shadow-1">
                    <b-form-group label="Total de Visitantes" label-align="center">
                      <dougchart class="chartHeight-400"
                      :label="chartGeral.labelVisitantes"
                      :datasets="chartGeral.visitantes" ref="visitantes">
                      </dougchart>
                    </b-form-group>
                  </div>
                </div>
                <h5 style="margin-top:20px;">Financeiro</h5>
                <hr class="bg-info">
                <div class="row">
                  <div v-show="true" class="col-sm-6 p-shadow-1">
                    <b-form-group label="Receitas" label-align="center">
                      <barchart class="chartHeight-300"
                      :label="chartGeral.labelReceitas"
                      :datasets="chartGeral.receitas" ref="receitas">
                      </barchart>
                    </b-form-group>
                  </div>
                  <div v-show="true" class="col-sm-6 p-shadow-1">
                    <b-form-group label="Despesas" label-align="center">
                      <barchartdoubleData class="chartHeight-300"
                      :label="chartGeral.labelDespesas"
                      :datasets="chartGeral.despesas" ref="despesas">
                      </barchartdoubleData>
                    </b-form-group>
                  </div>
                </div>
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </div>
      <Dialog :header="'Resumo Anual da ' + c.nomeIgreja " :maximizable="true" :visible.sync="openModal" :style="{width: '100vw', height: '100vw'}" :modal="true">
        <b-container>
          <h1>Dados Referente ao Ano {{ this.form.ano }}</h1>
          <hr class="bg-info">
          <div class="row">
            <div class="col-sm-4">
              <h4>Quantidade de Fieis por Bairro</h4>
              <b-form-group>
                <DataTable :value="c.bairros" :scrollable="true" scrollHeight="280px" :loading="loading">
                  <Column field="quantidade" header="Quantidade"></Column>
                  <Column field="bairro" header="Bairro"></Column>
                </DataTable>
              </b-form-group>
            </div>
            <div class="col-sm-8">
              <div class="row">
                <div class="col-sm-12 p-shadow-1">
                  <b-form-group label="Quantidade de Membros por Mês" label-align="center">
                    <lines class="chartHeight-300" ref="tete">
                    </lines>
                  </b-form-group>
                </div>
                <div class="col-sm-12 p-shadow-1">
                  <b-form-group label="Quantidade de Membros por Mês" label-align="center">
                    <barchart class="chartHeight-300" ref="rec">
                    </barchart>
                  </b-form-group>
                </div>
              </div>
            </div>
          </div>
        </b-container>
        <template #footer>
            <Button label="Fechar" class="p-button-raised p-button-success p-button-text button" />
        </template>
      </Dialog>
    </div>
    <template #overlay>
        <div class="text-center">
          <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
          <p id="cancel-label">Carregando Dados das Igrejas, por favor Aguarde</p>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import adonai from '../../http/router'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import utc from '../../util/utilClass'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import 'vue-datetime/dist/vue-datetime.css'

export default {
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
        this.$toast.add({ severity: 'info', summary: 'AdonaiSoft', detail: 'Por favor selecione um ano diferente de "Todos"', life: 5000 })
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
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
        this.show = false
      }).catch(err => {
        this.openloadin = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    listaIgrejas () {
      axios.get(adonai.url + 'listaigrejas', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.b.listaIgrejas = res.data.obj
          this.a.totalMembros = 0
          this.a.totalIgrejas = this.b.listaIgrejas.length
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
      }).catch(err => {
        this.openloadin = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
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
        this.openloadin = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
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
    },
    handleDateClick: function (arg) {
    },
    eventDateClick: function (arg) {
    },
    eventDrop: function (arg) {
    }
  },
  components: {
    Dialog,
    Button,
    DataTable,
    Column
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>
<style lang=scss scoped src="../../assets/scss/adonai.scss">
</style>

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
                        <img src="../../img/igreja.png"
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
                        <img src="../../img/membros.png"
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
                      <img src="../../img/filter.png">
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

<script src="./campoeclesiastico.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

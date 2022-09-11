<template>
  <div class="membro">
    <loader v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid dash">
      <div class="row">
        <div class="col-sm-12">
          <div class="p-d-flex p-jc-between">
            <div>
              <p>DashBoard</p>
            </div>
            <div>
              <button
                class="btn btn-outline-info rounded" style="float:right;"
                v-b-toggle.sidebar-backdrop>
                <img src="../../img/filter.png">
              </button>
            </div>
          </div>
          <hr class="bg-info">
          <div class="row">
            <div class="col-sm-3">
              <div class="col-sm-12 p-shadow-1" style="background-color: #ffffff;">
                <div class="row">
                  <div class="col-sm-6">
                    <i class="fas fa-users fa-4x"
                      aria-hidden="true"
                      style="color:#b36a5e; text-align:center;"></i>
                    <hr class="bg-info">
                  </div>
                  <div class="col-sm-6">
                      <h6 style="text-align: center;">Membros</h6>
                      <h1 style="text-align: center; font-size: 30px; ">{{ membros }}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="col-sm-12 p-shadow-1" style="background-color: #ffffff;">
                <div class="row">
                  <div class="col-sm-6">
                    <img src="./up.png"
                    aria-hidden="true"
                    style=" text-align:center;">
                    <hr class="bg-info">
                  </div>
                  <div class="col-sm-6">
                      <h6 style="text-align: center;">Entradas</h6>
                      <h1 style="text-align: center; font-size: 15px; ">{{ entradas }}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="col-sm-12 p-shadow-1" style="background-color: #ffffff;">
                <div class="row">
                  <div class="col-sm-6">
                    <img src="./down.png"
                    aria-hidden="true"
                    style=" text-align:center;">
                    <hr class="bg-info">
                  </div>
                  <div class="col-sm-6">
                      <h6 style="text-align: center; font-size: 15px; ">Despesas</h6>
                      <h1 style="text-align: center; font-size: 15px; ">{{ despesas }}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="col-sm-12 p-shadow-1" style="background-color: #ffffff;">
               <div class="row">
                  <div class="col-sm-6">
                    <i class="far fa-address-book fa-4x"
                    aria-hidden="true"
                    style="color:#5a189a; text-align:center;"></i>
                    <hr class="bg-info">
                  </div>
                  <div class="col-sm-6">
                      <h6 style="text-align: center;">Compromissos</h6>
                      <h1 style="text-align: center; font-size: 30px; ">{{ compromissos }}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4>Financeiro</h4>
          <section>
            <b-form-group label="Comparativo Entradas e Saidas Manual" label-align="center">
              <div  class="col-sm-12 p-shadow-1">
                <barchartdoubleData style="height: 300px"
                :label="cabe_finan"
                :datasets="dataset_finan" ref="year"></barchartdoubleData>
              </div>
            </b-form-group>
            <div class="row">
                <div  class="col-sm-6 p-shadow-1">
                  <b-form-group label="Por Tipos de Despesas" label-align="center">
                    <horizontalbar :legenda="false" style="height: 300px"
                    :label="cabe_tipos_entradas"
                    :datasets="dataset_tipos_entradas" ref="rec">
                    </horizontalbar>
                  </b-form-group>
                </div>
              <div class="col-sm-6 p-shadow-1">
                <b-form-group label="Por Tipos de Receitas" label-align="center">
                  <dougchart style="height: 300px"
                  :label="cabe_tipos_despesas"
                  :datasets="dataset_tipos_despesas" ref="des">
                  </dougchart>
                </b-form-group>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <b-sidebar
      id="sidebar-backdrop"
      title="Filtros"
      :backdrop-variant="variant"
      right
      shadow>
      <b-container style="padding:0px;">
        <div class="filters p-fluid">
          <div class="ux-margin">
            <b-form-group label="Ano">
              <b-form-select
              :options="ano"
              v-model="filter.ano"
              ></b-form-select>
            </b-form-group>
          </div>
          <div>
            <b-form-group label="Caixa/Conta" label-align-sm="left">
              <b-input-group>
                <b-form-input
                  v-model="models.descriptioncashier"
                ></b-form-input>
                  <b-input-group-append >
                  <b-button variant="outline-info" class="material-icons" @click="datasearch (1);" >search</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </div>
          <div>
            <b-form-group label="Usuário" label-align-sm="left">
              <b-input-group>
                <b-form-input
                  v-model="models.userName"
                ></b-form-input>
                  <b-input-group-append >
                  <b-button variant="outline-info" class="material-icons" @click="datasearch (2);" >search</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </div>
          <Button @click="onFilter()" label="Filtrar" class="p-button-raised p-button-success p-button-text button ux-margin" />
        </div>
      </b-container>
    </b-sidebar>
    <adonaidatasearch :title="ds.title" :cabecalho="ds.grid" :form="form" :destroy="onDestroy" ref="cmp"/>
  </div>
</template>

<script src="./dashboard.js">
</script>
<style lang=scss scoped>
@import '../../../assets/scss/adonai.scss';
@import './dashboard.scss';
</style>

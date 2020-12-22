<template>
  <div>
    <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Receitas</p>
          <button
            class="btn btn-outline-info"
            @click="initialize();">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <button
            class="btn btn-outline-info float-right"
            @click="imprimir('report/financeiro/receitagrupo.jrxml')">
            <i class="fas fa-print"></i>&nbsp;&nbsp;{{ mobileI }}
          </button>
          <!-- <SplitButton label="Imprimir" icon="pi pi-plus" :model="items" class="p-sm-2"></SplitButton> -->
          <!-- <div class="dropdown" style="z-index: 9999;">
            <button
              class="btn btn-outline-info dropdown-toggle float-right" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-print"></i>&nbsp;&nbsp;{{ mobileI }}
            </button>
            <div style="height: 20px; z-index: 9999;" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div> -->
          <button
            class="btn btn-outline-info float-right" style="margin-right: 10px;"
            @click="openFilter=true">
            <img src="./filter.png">&nbsp;&nbsp;{{ mobileF }}
          </button>
<!--           <div class="dropdown float-right">
            <button type="button" id="dropdownMenuButton"  class="btn dropdown-toggle" data-toggle="collapse">
              Imprimir
            </button>
            <div class="dropdown-content">
              <a class="dropdown-menu-item" style="color: #5e8a75;" @click="teste()">Receitas - Listagem</a>
            </div>
          </div> -->
          <hr class="bg-info">
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid :titulos="['id','nome','descricao','valor','dataemissao','datavencimento','datapagamento','status','tipoconta','caixa']"
          :form="form"
          :getbyId="getbyId"
          :save="save"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>

    <Dialog style="font-size:10px;" header="Lançamento de Receitas" :visible.sync="openModal" :style="{width: resize+'vw'}" :modal="true">
      <form method="POST">
        <b-container>
          <b-row class="text-center">
            <b-col cols="12">
              <div class="row">
                  <div class="col-sm-4" style="padding:3px;">
                  <b-form-group label="Data Emissao" label-align-sm="left">
                    <datetime
                      class="datePivker"
                      v-bind:disabled="(form.status == 0)"
                      type="Date"
                      value-zone="UTC"
                      format="dd/MM/yyyy"
                      v-model="form.dataemissao">
                    </datetime>
                  </b-form-group>
                </div>
                <div class="col-sm-4" style="padding:3px;">
                  <b-form-group label="Data Vencimento" label-align-sm="left">
                    <datetime
                      class="datePivker"
                      v-bind:disabled="(form.status == 0)"
                      type="Date"
                      value-zone="UTC"
                      format="dd/MM/yyyy"
                      v-model="form.dataVencimento">
                    </datetime>
                  </b-form-group>
                </div>
                <div class="col-sm-4" style="padding:3px;">
                  <b-form-group label="Tipo" label-align-sm="left">
                    <b-input-group >
                      <b-form-input
                      v-model="form.descrconta"
                      ></b-form-input>
                        <b-input-group-append >
                        <b-button variant="outline-info" class="material-icons" @click="datasearch (2);">search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </div>
                <div class="col-sm-7" style="padding:3px;">
                  <b-form-group label="Descricao" label-align-sm="left">
                    <input type="text"
                      class="form-control"
                      v-bind:disabled="(form.status == 0)"
                      v-model="form.descricao">
                  </b-form-group>
                </div>
                <div class="col-sm-4" style="padding:3px;">
                  <b-form-group label="Valor" label-align-sm="left">
                    <money  type="text"
                      class="form-control"
                      v-bind="currency"
                      v-bind:disabled="(form.status == 0)"
                      v-model="form.valor"/>
                  </b-form-group>
                </div>
                <div class="col-sm-6" style="padding:3px;">
                  <b-form-group label="Nome" label-align-sm="left">
                    <b-input-group>
                      <b-form-input
                      v-bind:disabled="(form.status == 0)"
                      v-model="form.nome"
                      ></b-form-input>
                        <b-input-group-append >
                        <b-button variant="outline-info" class="material-icons" v-bind:disabled="(form.status == 0)" @click="datasearch (1);" >search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </div>
                <div class="col-sm-6" style="padding:3px;">
                  <b-form-group label="Caixa/Conta" label-align-sm="left">
                    <b-input-group>
                      <b-form-input
                      v-model="form.desccaixa"
                      v-bind:disabled="(form.status == 0)"
                      ></b-form-input>
                        <b-input-group-append >
                        <b-button variant="outline-info" class="material-icons" v-bind:disabled="(form.status == 0)" @click="datasearch (3);" >search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </div>
                <div class="col-sm-12" style="padding:3px;">
                  <b-form-group label="Observações" label-align-sm="left">
                    <b-form-textarea
                      rows="2"
                      v-model="form.observacoes"
                      max-rows="2"
                    ></b-form-textarea>
                  </b-form-group>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </form>
      <template #footer>
        <Button label="Estornar" v-show="estornar"  @click="validate(form, 0)" class="p-button-raised p-button-success p-button-text button"/>
        <Button label="Salvar" v-show="estornar"  @click="validate(form, 2)" class="p-button-raised p-button-success p-button-text button"/>
        <Button label="Lançar" v-show="lancar"  @click="validate(form, 0)" class="p-button-raised p-button-success p-button-text button"/>
        <Button label="Lancar e Quitar" v-show="lancar" @click="validate(form, 1)" class="p-button-raised p-button-success p-button-text button" />
        <Button label="Cancelar" @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
      </template>
    </Dialog>
    <Dialog style="font-size:10px;" header="Filtros" :visible.sync="openFilter" :style="{width: resizeFilter+'vw'}" :modal="true">
      <form method="POST">
        <b-container>
          <b-row class="text-center">
            <b-col cols="12">
              <div class="row">
                <div class="col-sm-6" style="padding:3px;">
                  <b-form-group label="Data Inicio" label-align-sm="left">
                    <datetime
                      class="datePivker"
                      type="date"
                      format="dd/MM/yyyy"
                      v-model="filters.datainicio">
                    </datetime>
                  </b-form-group>
                </div>
                <div class="col-sm-6" style="padding:3px;">
                  <b-form-group label="Data Fim" label-align-sm="left">
                    <datetime
                      class="datePivker"
                      type="date"
                      format="dd/MM/yyyy"
                      v-model="filters.datafim">
                    </datetime>
                  </b-form-group>
                </div>
                <div class="col-sm-6" style="padding:3px;">
                  <b-form-group label="Data" label-align-sm="left">
                    <b-form-select
                      v-model="filters.tipodata"
                      :options="[{text: 'Nenhuma', value: 0}, { text: 'Emissão', value: 1 }, {text: 'Vencimento', value: 2}, {text: 'Pagamento', value: 3}]"
                      ></b-form-select>
                  </b-form-group>
                </div>
                <div class="col-sm-6" style="padding:3px;">
                  <b-form-group label="Status" label-align-sm="left">
                    <b-form-select
                    v-model="filters.status"
                      :options="[{text: 'Todas', value: 0}, { text: 'Pendente', value: 1 }, {text: 'Debitado', value: 2}]"
                    ></b-form-select>
                  </b-form-group>
                </div>
                <div class="col-sm-12" style="padding:3px;">
                  <b-form-group label="Nome" label-align-sm="left">
                    <b-input-group>
                      <b-form-input
                      v-bind:disabled="(form.status == 0)"
                      v-model="filters.nome"
                      ></b-form-input>
                        <b-input-group-append >
                        <b-button variant="outline-info" class="material-icons"  @click="datasearch (1);" >search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </div>
                <div class="col-sm-6" style="padding:3px;">
                  <b-form-group label="Caixa" label-align-sm="left">
                    <b-input-group>
                      <b-form-input
                      v-model="filters.caixa"
                      ></b-form-input>
                        <b-input-group-append >
                        <b-button variant="outline-info" class="material-icons"  @click="datasearch (3);" >search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </div>
                <div class="col-sm-6" style="padding:3px;">
                  <b-form-group label="Tipo" label-align-sm="left">
                    <b-input-group>
                      <b-form-input
                      v-model="filters.tipo"
                      ></b-form-input>
                        <b-input-group-append >
                        <b-button variant="outline-info" class="material-icons"  @click="datasearch (2);" >search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </form>
      <template #footer>
        <Button label="Filtrar"  @click="filter(filters)" class="p-button-raised p-button-success p-button-text button" />
        <Button label="Cancelar" @click="openFilter=false" class="p-button-raised p-button-success p-button-text button"/>
      </template>
    </Dialog>
    <adonaidatasearch
    :title="ds.title"
    :cabecalho="ds.grid"
    :form="form"
    :destroy="destroy"
    ref="cmp"/>
  </div>
</template>
<script src='http://code.jquery.com/jquery-2.1.3.min.js'></script>
<script src="./receitas.js">
  $(function () {
    $('.dropdown-toggle').dropdown();
  })
</script>
<style lang=scss scoped>
label {
  background-color: #5e8a75;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin: 10px;
  padding: 6px 20px;
}
p {
  font-size: 30px;
}
.table-sm {
  padding: 2px;
}
#loading {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 5000;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
.p-splitbutton {
  margin-right: .1rem;
}
button {
  color: #5e8a75;
  border-color:#5e8a75;
}
button:hover {
  background-color: #5e8a75;
  border-color:#5e8a75;
}
.dropdown {
  position: relative;
}
.dropdown-content {
  display: none;
  position: inherit;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}
.dropdown:hover .dropdown-content {
  display: block;
  text-decoration: none;
  color: #5e8a75;
}
a:link, a:visited {
 text-decoration: none
}
.datePivker{
  margin-left: 2px;
  padding: 5px;
  height: 35px;
  border:solid 1px;
  border-radius:3px;
  border-color:#cacdcf;
  text-align: center;
}
</style>

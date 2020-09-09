<template>
  <div class="despesas">
    <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Despesas</p>
          <button
            class="btn btn-outline-info"
            @click="cleanForm();form.del=false;form.add=true;form.edit=false;lancar=true,estornar=false;openModal=true;">
            <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
          </button>
          <button
            class="btn btn-outline-info float-right"
            @click="imprimir('report/financeiro/despesagrupo.jrxml')">
            <i class="fas fa-print"></i>&nbsp;&nbsp;Imprimir
          </button>
          <button
            class="btn btn-outline-info float-right" style="margin-right: 10px;"
            @click="openFilter=true">
            <img src="./filter.png">&nbsp;&nbsp;Flitros
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12">
          <!-- table -->
          <adonaigrid :titulos="['ID','nome','descricao','Valor','dataemissao','datavencimento','datapagamento','status','Tipo','Caixa']"
          :form="form"
          :getbyId="getbyId"
          :save="save"
          :explorer="explorer"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>

    <!-- modal para cadastro-->
    <div id="overlay" v-if=openModal>
        <div class="modal-dialog modal-dialog-centered modal-lg ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Lançamento de Despesa</h5>
              <button type="button" class="close"  @click="cleanForm(form); openModal=false;">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
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
                              v-bind:disabled="(form.status == 0)"
                              v-model="form.descrconta"
                              ></b-form-input>
                                <b-input-group-append >
                                <b-button variant="outline-info" class="material-icons" v-bind:disabled="(form.status == 0)"  @click="datasearch (2);">search</b-button>
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
              <button type="button" v-show="estornar" class="btn btn-outline-info float-left" style="margin-left:10px;" @click="validate(form, 0)">Estornar</button>
              <button type="button" v-show="lancar" class="btn btn-outline-info float-right" style="margin-left:10px;" @click="validate(form, 1)">Lançar e Quitar</button>
              <button type="button" v-show="lancar" class="btn btn-outline-info float-right" style="margin-left:5px;" @click="validate(form, 0)">Lançar</button>
            </div>
          </div>
        </div>
    </div>

    <!-- modal Filtros-->
    <div id="overlay" v-if=openFilter>
        <div class="modal-dialog modal-dialog-centered modal-md ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Filtros</h5>
              <button type="button" class="close"  @click="openFilter=false;cleanFilters(filters);">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
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
              <button type="button" class="btn btn-outline-info float-right" style="margin-left:5px;" @click="filter(filters)">Filtrar</button>
            </div>
          </div>
        </div>
    </div>
    <adonaidatasearch
    :title="ds.title"
    :cabecalho="ds.grid"
    :form="form" v-bind:openDatasearch="open"
    :destroy="destroy"
    ref="cmp"/>
  </div>
</template>

<script src="./despesas.js">
</script>
<style lang=scss scoped>
p {
  font-size: 30px;
}
.table-sm {
  padding: 2px;
}
.despesas {
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba($color: #ffffff, $alpha: 0.9);
  margin: 5px;
  overflow:auto;
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
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
button {
  color: #5e8a75;
  border-color:#5e8a75;
}
button:hover {
  background-color: #5e8a75;
  border-color:#5e8a75;
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

<template>
  <div class="despesas">
    <loader v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Despesas</p>
          <button
            class="btn btn-outline-info"
            @click="form.del=false;form.add=true;form.edit=false;lancar=true,estornar=false;openModal=true;">
            <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12">
          <!-- table -->
          <adonaigrid :titulos="['ID','nome','Descricao','Valor','DataEmis.','DataVenc.','DataPag','Status','Tipo','Caixa']"
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
                        <div class="col-sm-4">
                          <b-form-datepicker
                            placeholder="Data Emissao"
                            v-model="form.dataemissao"
                            v-bind:disabled="(form.status == 0)"
                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            local="pt-br"></b-form-datepicker>
                        </div>
                        <div class="col-sm-4">
                          <b-form-datepicker
                            placeholder="Data Vencimento."
                            v-model="form.dataVencimento"
                            v-bind:disabled="(form.status == 0)"
                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            local="pt-br"></b-form-datepicker>
                        </div>
                        <div class="col-sm-4">
                          <b-input-group>
                            <b-form-input placeholder="Tipo"
                            v-bind:disabled="(form.status == 0)"
                            v-model="form.descrconta"
                            ></b-form-input>
                              <b-input-group-append >
                              <b-button variant="outline-info" class="material-icons" v-bind:disabled="(form.status == 0)"  @click="datasearch (2);">search</b-button>
                            </b-input-group-append>
                          </b-input-group>
                        </div>
                        <div class="col-sm-7">
                          <input type="text"
                          class="form-control"
                          placeholder="Descricao"
                          v-bind:disabled="(form.status == 0)"
                          v-model="form.descricao">
                        </div>
                        <div class="col-sm-4 mb-0">
                          <money  type="text"
                          class="form-control"
                          v-bind="currency"
                          v-bind:disabled="(form.status == 0)"
                          placeholder="Valor"
                          v-model="form.valor"/>
                        </div>
                        <div class="col-sm-6">
                          <b-input-group>
                            <b-form-input placeholder="Nome"
                            v-bind:disabled="(form.status == 0)"
                            v-model="form.nome"
                            ></b-form-input>
                              <b-input-group-append >
                              <b-button variant="outline-info" class="material-icons" v-bind:disabled="(form.status == 0)" @click="datasearch (1);" >search</b-button>
                            </b-input-group-append>
                          </b-input-group>
                        </div>
                        <div class="col-sm-6">
                          <b-input-group>
                            <b-form-input placeholder="Caixa/Conta"
                            v-model="form.desccaixa"
                            v-bind:disabled="(form.status == 0)"
                            ></b-form-input>
                              <b-input-group-append >
                              <b-button variant="outline-info" class="material-icons" v-bind:disabled="(form.status == 0)" @click="datasearch (3);" >search</b-button>
                            </b-input-group-append>
                          </b-input-group>
                        </div>
                        <div class="col-sm-12">
                           <b-form-textarea
                              placeholder="Observações"
                              rows="2"
                              v-model="form.observacoes"
                              max-rows="2"
                            ></b-form-textarea>
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
label {
  background-color: #3498db;
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
.despesas {
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba($color: #ffffff, $alpha: 0.9);
  margin: 5px;
  overflow:auto;
}
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
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
</style>

<template>
  <div class="despesas">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Despesas</p>
          <button
            class="btn btn-outline-info"
            @click="form.del=false;form.add=true;form.edit=false;openModal=true;">
            <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12">
          <!-- table -->
          <adonaigrid v-bind:titulos="['ID','nome','Descricao','Valor','DataEmis.','DataVenc.','DataPag','Status']" v-bind:registros="duplicata" v-bind:form="form"></adonaigrid>
        </div>
        <div class="col-sm-5">
          <b-input-group >
              <button class="btn btn-outline-info" @click="pagina = pagina - 1;b (pagina)"><i class="fas fa-caret-left"></i></button>
              <b-form-input v-model="pagina" class="col-sm-1 text-center"></b-form-input>
              <button class="btn btn-outline-info"  @click="pagina = pagina + 1;b (pagina)"><i class="fas fa-caret-right"></i></button>
              <b-form-input placeholder="buscar"  style="margin-left:10px" class="col-sm-5"></b-form-input>
              <b-button variant="outline-info" class="material-icons">search</b-button>
          </b-input-group>
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
                            v-model="form.dataEmissao"
                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            local="pt-br"></b-form-datepicker>
                        </div>
                        <div class="col-sm-4">
                          <b-form-datepicker
                            placeholder="Data Vencimento."
                            v-model="form.Vencimento"
                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            local="pt-br"></b-form-datepicker>
                        </div>
                        <div class="col-sm-4">
                          <b-input-group>
                            <b-form-input placeholder="Tipo"
                            v-model="form.descrconta"
                            ></b-form-input>
                              <b-input-group-append >
                              <b-button variant="outline-info" class="material-icons" @click="openDatasearch=true">search</b-button>
                            </b-input-group-append>
                          </b-input-group>
                        </div>
                        <div class="col-sm-7">
                          <input type="text"
                          class="form-control"
                          placeholder="Descricao"
                          v-model="form.descricao">
                        </div>
                        <div class="col-sm-4 mb-0">
                          <money  type="text"
                          class="form-control"
                          v-bind="currency"
                          placeholder="Valor"
                          v-model="form.valor"/>
                        </div>
                        <div class="col-sm-6">
                          <b-input-group>
                            <b-form-input placeholder="Nome"
                            v-model="form.nome"
                            ></b-form-input>
                              <b-input-group-append >
                              <b-button variant="outline-info" class="material-icons" >search</b-button>
                            </b-input-group-append>
                          </b-input-group>
                        </div>
                        <div class="col-sm-6">
                          <b-input-group>
                            <b-form-input placeholder="Caixa/Conta"
                            v-model="form.desccaixa"
                            ></b-form-input>
                              <b-input-group-append >
                              <b-button variant="outline-info" class="material-icons" >search</b-button>
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
              <button type="button" class="btn btn-outline-info float-right" style="margin-left:10px;" @click="validate(doc, 0, form)">Lançar e Quitar</button>
              <button type="button" class="btn btn-outline-info float-right" style="margin-left:5px;" @click="validate(doc, 0, form)">Lançar</button>
            </div>
          </div>
        </div>
    </div>
    <adonaidatasearch v-if="openDatasearch" v-bind:cabecalho="['ID','Descricao']" v-bind:registros="duplicata" v-bind:form="form"></adonaidatasearch>
    <!-- modal excluir -->
    <div id="overlay" v-if=deleteModal>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-danger">Deseja realmente Excluir ?</h5>
            <button type="button" class="close"  @click="deleteModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <button class="btn btn-outline-danger" @click="save (form);deleteModal=false;" >Sim</button>
            <button class="btn btn-outline-success float-right" @click="deleteModal=false">Não</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal para seleção da Cidade-->
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
  padding: 6px 20px
}
p {
  font-size: 30px;
}
input[type='file'] {
  display: none
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
</style>

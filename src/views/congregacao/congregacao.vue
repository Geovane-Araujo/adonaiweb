<template>
  <div class="congregacao">
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="3" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Congregações</p>
          <button
            class="btn btn-outline-info"
            @click="form.del=false;form.add=true;form.edit=false;openModal=true;">
            <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
          </button>
          <button
            class="btn btn-outline-info float-right"
            @click="imprimir('report/pessoas/congregacoes.jrxml')">
            <i class="fas fa-print"></i>&nbsp;&nbsp;Imprimir
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12">
          <!-- table -->
          <adonaigrid :titulos="['ID','Nome','Endereço','Bairro','Numero','Telefone']"
          :registros="congregacao"
          :form="form"
          :getbyId="getbyId"
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
              <h5 class="modal-title">Cadastro de Congregações</h5>
              <button type="button" class="close"  @click="cleanForm(form); openModal=false;">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form method="POST">
                <div class="row">
                  <div class="col-sm-7">
                    <input type="text"
                    v-model="form.nome"
                    class="form-control"
                    placeholder="Nome Completo">
                  </div>
                  <div class="col-sm-5">
                    <input type="text"
                      class="form-control"
                      v-model="form.responsavel"
                      placeholder="Responsável">
                  </div>
                  <div class="col-sm-3">
                    <input type="text"
                      class="form-control"
                      v-mask="'(##)#####-####'"
                      v-model="form.telefone[0].telefone"
                      placeholder="Telefone Residencial">
                  </div>
                  <div class="col-sm-3">
                    <input type="text"
                      class="form-control"
                      v-mask="'(##)#####-####'"
                      v-model="form.telefone[1].telefone"
                      placeholder="Telefone Celular">
                  </div>
                  <div class="col-sm-6">
                    <input type="text"
                      class="form-control"
                      v-model="form.email[0].email"
                      placeholder="E-mail">
                  </div>
                  <div class="col-sm-12">
                    <h6 class="text-success">Endereço</h6>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <b-input-group>
                        <b-form-input placeholder="CEP"
                        v-model="form.endereco[0].cep"
                        v-mask="'#####-###'"
                         ></b-form-input>
                          <b-input-group-append >
                          <b-button variant="outline-info" class="material-icons" @click="buscarcep (form.endereco[0].cep, form, 1)">search</b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                  </div>
                  <div class="col-sm-7">
                    <div class="form-group">
                      <input type="text"
                        class="form-control"
                        v-model="form.endereco[0].endereco"
                        placeholder="Endereço">
                    </div>
                  </div>
                  <div class="col-sm-2">
                    <div class="form-group">
                      <input type="text"
                        class="form-control"
                        v-model="form.endereco[0].numero"
                        placeholder="Numero">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <input type="text"
                        class="form-control"
                        v-model="form.endereco[0].bairro"
                        placeholder="Bairro">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <input type="text"
                        class="form-control"
                        v-model="form.endereco[0].complemento"
                        placeholder="Complemento">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <b-input-group >
                        <b-form-input placeholder="Cidade" v-model="form.endereco[0].cidade" @click="datasearch(0, 1);"></b-form-input>
                        <b-input-group-append>
                          <b-button variant="outline-info" class="material-icons" @click="datasearch(0, 1);">search</b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <b-form-textarea
                      placeholder="Observações"
                      rows="3"
                      v-model="form.observacoes"
                      max-rows="3"
                    ></b-form-textarea>
                  </div>
                </div>
              </form>
              <button type="button" class="btn btn-outline-info float-right" @click="validate(form)">Salvar</button>
            </div>
          </div>
        </div>
    </div>
    <adonaidatasearch
    :title="ds.title"
    :cabecalho="ds.grid"
    :form="form" v-bind:openDatasearch="open"
    :destroy="destroy"
    ref="expl"/>
  </div>
</template>

<script src="./congregacao.js">
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
#loading {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 5000;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
.table-sm {
  padding: 2px;
}
.congregacao {
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
  z-index: 1000;
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

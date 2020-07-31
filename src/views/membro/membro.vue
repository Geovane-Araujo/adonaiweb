<template>
  <div class="membro">
    <loader v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Membros</p>
          <button
            class="btn btn-outline-info"
            @click="form.del=false;form.add=true;form.edit=false;openModal=true;">
            <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
          </button>
          <button
            class="btn btn-outline-info float-right"
            @click="imprimir()">
            <i class="fas fa-print"></i>&nbsp;&nbsp;Imprimir
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12">
          <!-- table -->
          <adonaigrid :titulos="['ID','Nome','Endereço','Bairro','Numero','Telefone']"
          :registros="membros"
          :form="form"
          :getbyId="getbyId"
          :save="save"></adonaigrid>
        </div>
      </div>
    </div>

    <!-- modal para cadastro-->
    <div id="overlay" v-if=openModal>
        <div class="modal-dialog modal-dialog-centered modal-lg ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Cadastro de Membros</h5>
              <button type="button" class="close"  @click="cleanForm(form);openModal=false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <b-tabs content-class="mt-1">
                  <b-tab title="Principal" active>
                    <b-container>
                      <b-row class="text-center">
                        <b-col cols="2">
                          <div class="file-loading">
                            <b-avatar :src="a" ref="myFiles"
                            size="5rem"></b-avatar>
                          </div>
                          <label for='selecao-arquivo' class="material-icons">perm_media</label>
                          <input id='selecao-arquivo' @change="previewFiles();img();"  accept="image/*" type='file'>
                        </b-col>
                        <b-col cols="10" >
                          <div class="row">
                            <div class="col-sm-12">
                              <input type="text"
                              class="form-control"
                              v-model="form.nome"
                              placeholder="Nome Completo">
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-sm-5">
                              <b-form-datepicker
                              placeholder="Data Nasc."
                              v-model="form.dataNascimento"
                              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                              local="pt-br"></b-form-datepicker>
                            </div>
                            <div class="col-sm-6">
                              <b-form-select
                              :options="[{ text: 'Estado Civil', value: null }, 'Solteiro(a)', 'Casado(a)', 'União Estável','Divorciado(a)','Viuvo(a)']"
                              v-model="form.estadoCivil"
                              ></b-form-select>
                            </div>
                            <div class="col-sm-5">
                              <div class="form-group">
                                <b-input-group >
                                  <b-form-input placeholder="Cargo" v-model="form.cargo" @click="datasearch(2);"></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="datasearch(2);">search</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <b-form-datepicker
                              placeholder="Data Batismo"
                              v-model="form.dataBatismo"
                              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                              local="pt-br"></b-form-datepicker>
                            </div>
                            <div class="col-md-2">
                              <b-form-checkbox
                                id="checkbox-1"
                                v-model="form.ativo"
                                value="1"
                                unchecked-value="0"
                                >Ativo
                                </b-form-checkbox>
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                      <div class="row">
                        <div class="col-md-4">
                          <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[0].telefone"
                            placeholder="Telefone Residencial">
                        </div>
                        <div class="col-md-4">
                          <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[1].telefone"
                            placeholder="Telefone Celular">
                        </div>
                        <div class="col-md-4">
                          <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[2].telefone"
                            placeholder="Telefone Comercial">
                        </div>
                        <div class="col-md-6">
                          <input type="text"
                            class="form-control"
                            v-model="form.email[0].email"
                            placeholder="E-mail">
                        </div>
                        <div class="col-md-6">
                          <input type="text"
                            class="form-control"
                            v-model="form.email[1].email"
                            placeholder="E-mail 2">
                        </div>
                      </div>
                    </b-container>
                  </b-tab>
                  <!-- Endereços -->
                  <b-tab title="Enderecos">
                    <form action="" enctype="multipart/form-data" class="form form-vertical">
                      <div class="row">
                      <div class="col-md-12">
                          <div class="row">
                            <div class="col-sm-3">
                              <div class="form-group">
                                <b-input-group>
                                  <b-form-input placeholder="CEP" v-model="form.endereco[0].cep" ></b-form-input>
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
                                  placeholder="Endereço Principal">
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
                                  placeholder="Bairro Principal">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[0].complemento"
                                  placeholder="Complemento Principal">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <b-input-group >
                                  <b-form-input placeholder="Cidade" v-model="form.endereco[0].cidade" @click="datasearch(1, 0);"></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="outline-info" class="material-icons" @click="datasearch(1, 0);">search</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- Endereço Secundário -->
                        <hr class="bg-info" >
                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-sm-3">
                              <div class="form-group">
                                <b-input-group>
                                  <b-form-input placeholder="CEP" v-model="form.endereco[1].cep"></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="outline-info" class="material-icons" @click="buscarcep (form.endereco[0].cep, form, 2)">search</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            </div>
                            <div class="col-sm-7">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[1].endereco"
                                  placeholder="Endereço Outro">
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[1].numero"
                                  placeholder="Numero">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[1].bairro"
                                  placeholder="Bairro Outro">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[1].complemento"
                                  placeholder="Complemento Outro">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <b-input-group >
                                  <b-form-input placeholder="Cidade Outro" v-model="form.endereco[1].cidade" @click="datasearch(1, 1);"></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="datasearch(1, 1);">search</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </b-tab>
                  <b-tab title="Observações">
                    <b-form-textarea
                      id="textarea"
                      placeholder="Observações"
                      rows="15"
                      v-model="form.observacoes"
                      max-rows="3"
                    ></b-form-textarea>
                  </b-tab>
                </b-tabs>
              </form>
              <button type="button" class="btn btn-outline-info float-right" @click="validar(form)">Salvar</button>
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

<script src="./membro.js">
</script>
<style lang=scss scoped>
.table-overflow {
    max-height:90vh;
    overflow-y:auto;
}
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
.membro {
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

<template>
  <div class="igreja">
    <loader v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Igreja</p>
          <button
            class="btn btn-outline-info"
            @click="form.del=false;form.add=true;form.edit=false;openModal=true;">
            <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12">
          <!-- table -->
          <adonaigrid :titulos="['ID','Nome','Endereço','Bairro','Numero','Telefone']"
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
              <h5 class="modal-title">Cadastro de Igreja</h5>
              <button type="button" class="close"  @click="cleanForm(form); openModal=false;">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form method="POST">
                <b-tabs content-class="mt-1">
                  <b-tab title="Principal" active>
                    <b-container>
                      <b-row class="text-center">
                        <b-col cols="2">
                          <div class="file-loading">
                            <b-avatar ref="myFiles"
                            size="5rem"></b-avatar>
                          </div>
                          <label for='selecao-arquivo' class="material-icons">perm_media</label>
                          <input id='selecao-arquivo' @change="previewFiles" ref="myFiles" type='file'>
                        </b-col>
                        <b-col cols="10" >
                          <div class="row">
                            <div class="col-sm-12">
                              <input type="text"
                              class="form-control"
                              v-model="form.nome"
                              placeholder="Nome Igreja">
                            </div>
                            <div class="col-sm-5">
                              <the-mask
                                type="text"
                                the-mask :mask="['###.###.###-##', '##.###.###/####-##']"
                                v-model="form.cnpjcpf"
                                class="form-control"
                                placeholder="CNPJ/CPF"/>
                            </div>
                            <div class="col-sm-6">
                              <input
                                type="text"
                                v-model="form.pastorResponsavel"
                                class="form-control"
                                placeholder="Pastor Responsável">
                            </div>
                            <div class="col-sm-6">
                              <input
                                type="text"
                                v-model="form.tesoureiro"
                                class="form-control"
                                placeholder="Tesoureiro">
                            </div>
                            <div class="col-sm-6">
                              <input
                                type="text"
                                v-model="form.secretario"
                                class="form-control"
                                placeholder="Secretário(a)">
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                      <H6 class="text-success">Dados de Contatos</H6>
                      <div class="row">
                        <div class="col-md-4">
                          <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[0].telefone"
                            placeholder="Telefone Principal">
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
                            placeholder="Telefone Outros">
                        </div>
                        <div class="col-md-6">
                          <input type="text"
                            class="form-control"
                            v-model="form.email[0].email"
                            placeholder="E-mail Principal">
                        </div>
                        <div class="col-md-6">
                          <input type="text"
                            class="form-control"
                            v-model="form.email[1].email"
                            placeholder="E-mail Outros">
                        </div>
                      </div>
                    </b-container>
                  </b-tab>
                  <b-tab title="Igreja Sede">
                    <b-col cols="12" >
                      <div class="row">
                        <div class="col-sm-12">
                          <input type="text"
                          class="form-control"
                          v-model="form.igrejaSede"
                          placeholder="Nome Igreja Sede">
                        </div>
                        <div class="col-sm-6">
                          <input
                            type="text"
                            v-model="form.presidente"
                            class="form-control"
                            placeholder="Pastor Presidente">
                        </div>
                        <div class="col-sm-6">
                          <input
                            type="text"
                            v-model="form.vice"
                            class="form-control"
                            placeholder="Pastor Vice">
                        </div>
                        <H6 class="text-success" style="padding-left:10px;">Dados de Contatos</H6>
                        <div class="row" style="padding-left: 10px;padding-right: 10px;">
                        <div class="col-md-4">
                          <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[3].telefone"
                            placeholder="Telefone Principal">
                        </div>
                        <div class="col-md-4">
                          <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[4].telefone"
                            placeholder="Telefone Celular">
                        </div>
                        <div class="col-md-4">
                          <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[5].telefone"
                            placeholder="Telefone Outros">
                        </div>
                        <div class="col-md-6">
                          <input type="text"
                            class="form-control"
                            v-model="form.email[2].email"
                            placeholder="E-mail Principal">
                        </div>
                        <div class="col-md-6">
                          <input type="text"
                            class="form-control"
                            v-model="form.email[3].email"
                            placeholder="E-mail Outros">
                        </div>
                        <H6 class="text-success" style="padding-left:20px;"> </H6>
                        <H6 class="text-success" style="padding-left:20px;"> </H6>
                        <H6 class="text-success" style="padding-left:20px;"> </H6>
                      </div>
                      </div>
                    </b-col>
                  </b-tab>
                  <!-- Endereços -->
                  <b-tab title="Enderecos">
                    <form>
                      <div class="row">
                      <H6 class="text-success" style="padding-left:20px;">Endereço Local</H6>
                      <div class="col-sm-12">
                          <div class="row">
                            <div class="col-sm-3">
                              <div class="form-group">
                                <b-input-group style="margin-left:10px;">
                                  <b-form-input
                                    placeholder="CEP"
                                    v-model="form.endereco[0].cep" v-mask="'#####-###'">
                                  </b-form-input>
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
                                  placeholder="Endereço Local">
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[0].numero"
                                  style="margin-right:10px;"
                                  placeholder="Numero">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <input type="text"
                                  style="margin-left:10px;width: 100%;"
                                  class="form-control"
                                  v-model="form.endereco[0].bairro"
                                  placeholder="Bairro Local">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[0].complemento"
                                  placeholder="Complemento Local">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <b-input-group >
                                  <b-form-input placeholder="Cidade" v-model="form.endereco[0].cidade" @click="datasearch(0);"></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="outline-info" class="material-icons" @click="datasearch(0);">search</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- Endereço Secundário -->
                        <hr class="bg-info" >
                        <div class="col-md-12">
                          <H6 class="text-success" style="padding-left:10px;">Endereço Sede</H6>
                          <div class="row">
                            <div class="col-sm-3">
                              <div class="form-group">
                                <b-input-group style="margin-left:10px;">
                                  <b-form-input
                                    placeholder="CEP Sede"
                                    v-model="form.endereco[1].cep" v-mask="'#####-###'">
                                  </b-form-input>
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
                                  placeholder="Endereço Sede">
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[1].numero"
                                  style="margin-right:0px;width: 100px;"
                                  placeholder="Numero">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <input type="text"
                                  style="margin-left:10px;width: 100%;"
                                  class="form-control"
                                  v-model="form.endereco[1].bairro"
                                  placeholder="Bairro Sede">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[1].complemento"
                                  placeholder="Complemento Sede">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <b-input-group >
                                  <b-form-input placeholder="Cidade Sede" v-model="form.endereco[1].cidade" @click="datasearch(1);"></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="datasearch(1);">search</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </b-tab>
                  <b-tab title="Configurações">
                    <b-col cols="12" >
                      <H6 class="text-success">Configurações de Mala Direta</H6>
                      <div class="row">
                          <div class="col-sm-5">
                            <input type="e-mail"
                            class="form-control"
                            v-model="form.emailmala"
                            placeholder="Email">
                          </div>
                          <div class="col-sm-5">
                            <input
                              type="text"
                              v-model="form.smtp"
                              class="form-control"
                              placeholder="SMPT">
                          </div>
                          <div class="col-sm-2">
                            <input
                              type="text"
                              v-model="form.porta"
                              class="form-control"
                              placeholder="Porta">
                        </div>
                        <div class="row" style="padding-left: 10px;padding-right: 10px;">
                          <div class="col-md-4">
                            <input type="text"
                              class="form-control"
                              v-model="form.usuario"
                              placeholder="Usuário">
                          </div>
                          <div class="col-md-4">
                            <input type="password"
                              class="form-control"
                              v-model="form.senha"
                              placeholder="senha">
                          </div>
                          <div class="col-md-4">
                            <b-form-select
                              :options="[{ text: 'Não Requer', value: 'Não Requer' }, 'SSL', 'TSL']"
                              v-model="form.autenticacao"
                              ></b-form-select>
                          </div>
                          <div class="col-sm-12">
                            <b-form-textarea
                              placeholder="Cabeçalho Relatórios"
                              rows="3"
                              v-model="form.textoRelatorio"
                              max-rows="3"
                            ></b-form-textarea>
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
                      </div>
                    </b-col>
                  </b-tab>
                </b-tabs>
              </form>
              <button type="button" class="btn btn-outline-info float-right" @click="validate(doc, 0, form)">Salvar</button>
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

<script src="./igreja.js">
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
.igreja {
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

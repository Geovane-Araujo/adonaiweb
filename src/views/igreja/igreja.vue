<template>
  <div class="igreja">
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
          <table class="table table-botdered table-striped table-sm table-hover table-fixed">
            <thead  style="max-height:10vh; overflow-y:auto;">
              <tr class="text-left bg-info txt-light style=height: 10px;">
                <th bgcolor="#17a2b8">ID</th>
                <th bgcolor="#17a2b8">Nome Membro</th>
                <th bgcolor="#17a2b8">Endereco</th>
                <th bgcolor="#17a2b8">Bairro</th>
                <th bgcolor="#17a2b8">Numero</th>
                <th bgcolor="#17a2b8">Telefone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left" v-for="item in igreja" :key="item.id">
                <td >{{ item.id }}</td>
                <td>{{ item.nome }}</td>
                <td>{{ item.enderecoPrincipal }}</td>
                <td>{{ item.bairroPrincipal }}</td>
                <td>{{ item.numeroPrincipal }}</td>
                <td>{{ item.telefonePrincipal }}</td>
                <td>
                  <a href="#" @click="getIgreja (item.id);  form.edit= true;form.del=false;form.add=false;"  class="text-success"><i class="fas fa-edit"></i></a>
                  &nbsp;
                  <a href="#" @click="deleteModal=true; form.idPessoa = item.idPessoa; form.id = item.id; form.edit=false;form.add=false; form.del = true" class="text-danger"><i class="far fa-trash-alt"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
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
                                  <b-form-input placeholder="Cidade" v-model="form.endereco[0].cidade" @click="campocidade = 0;buscarCidade(pagina);openCidade=true;"></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="outline-info" class="material-icons" @click="campocidade = 0;buscarCidade(pagina);openCidade=true;">search</b-button>
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
                                  <b-form-input placeholder="Cidade Sede" v-model="form.endereco[1].cidade" @click="campocidade = 1;buscarCidade(pagina);openCidade=true;"></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="campocidade = 1;buscarCidade(pagina);openCidade=true;">search</b-button>
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
    <div class="cargodts">
      <div id="overlay" v-if=openCidade>
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h6>Selecione o Cargo</h6>
              <button type="button" class="close"  @click="openCidade=false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <b-form-input class="mr-sm-2" placeholder="Buscar" v-model="form.endereco[campocidade].cidade" @keyup.enter="cidade = form.endereco[campocidade].cidade; buscarCidadeKey(cidade)"></b-form-input>
              <br>
              <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
                <thead>
                  <tr class="text-left bg-info txt-light" style="height: 10px;">
                    <th>ID</th>
                    <th>Nome</th>
                    <th>UF</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody style="overflow-y: scroll;height: 150px;">
                  <tr class="text-left" v-for="city in cidade" :key="city.id">
                    <td >{{ city.id }}</td>
                    <td>{{ city.cidade }}</td>
                    <td>{{ city.uf }}</td>
                    <td>
                      <a href="#" class="text-success" @click="form.endereco[campocidade].cidade = city.cidade;form.endereco[campocidade].idCidade=city.id; openCidade=false; "><i class="far fa-check-square"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="row">
                <b-input-group >
                  <b-input-group-append>
                    <b-button variant="outline-info" style="margin-left:10px;" class="material-icons" @click="pagina = pagina - 1;buscarCidade (pagina)">chevron_left</b-button>
                  </b-input-group-append>
                  <b-form-input v-model="pagina" class="col-sm-1 text-center"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="pagina = pagina + 1;buscarCidade (pagina)">chevron_right</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
</style>

<template>
  <div >
    <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Igreja</p>
          <button
            class="btn btn-outline-info"
            @click="getbyId(-100)">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <button
            class="btn btn-outline-info float-right"
            @click="globais(2);">
            <i class="fab fa-whmcs"></i>&nbsp;&nbsp;Configurações Globais
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid  class="grid"
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 80, name: 'nome' }, { tamanho: 50, name: 'endereco' }, { tamanho: 30, name: 'bairro' }, { tamanho: 20, name: 'numero' }, { tamanho: 20, name: 'telefone' }]"
          :form="form"
          :getbyId="getbyId"
          :save="save"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>

    <!-- modal para cadastro-->
    <Dialog style="font-size:10px;" header="Cadastro Igrejas" :visible.sync="openModal" :style="{width: resize+'vw'}" :modal="true">
        <form method="POST">
          <b-tabs content-class="mt-1">
            <b-tab title="Principal" active>
              <b-container>
                <b-row class="text-center">
                  <div class="col-sm-2">
                    <div class="file-loading" >
                      <b-avatar :src="form.pathimg"
                      size="5rem"></b-avatar>
                      <div>
                        <label for='selecao-arquivo' class="material-icons">perm_media</label>
                        <input id='selecao-arquivo'  @change="getImg"  accept="image/*" type='file'>
                        <label class="material-icons label2" @click="form.foto='';img=''" >delete_forever</label>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-10">
                    <div class="row">
                      <div class="col-sm-6">
                        <input type="text"
                        class="form-control"
                        v-model="form.nome"
                        placeholder="Nome Igreja">
                      </div>
                      <div class="col-sm-4">
                        <the-mask
                          type="text"
                          the-mask :mask="['###.###.###-##', '##.###.###/####-##']"
                          v-model="form.cnpjcpf"
                          class="form-control"
                          placeholder="CNPJ/CPF"/>
                      </div>
                      <div class="col-sm-2">
                        <b-form-select
                        :options="[{ text: 'Matriz', value: 0 }, {text: 'Filial', value: 1}]"
                        v-model="form.tipo"
                        ></b-form-select>
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
                          v-model="form.secretario"
                          class="form-control"
                          placeholder="Secretário(a)">
                      </div>
                    </div>
                  </div>
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
              <b-container>
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
              </b-container>
            </b-tab>
            <!-- Endereços -->
            <b-tab title="Enderecos">
              <b-container>
                <H6 class="text-success">Endereço Local</H6>
                <div class="row">
                  <div class="col-sm-3">
                    <b-input-group>
                      <b-form-input
                        placeholder="CEP"
                        v-model="form.endereco[0].cep" v-mask="'#####-###'">
                      </b-form-input>
                        <b-input-group-append >
                        <b-button variant="outline-info" class="material-icons" @click="buscarcep (form.endereco[0].cep, form, 1)">search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                  <div class="col-sm-7">
                    <input type="text"
                      class="form-control"
                      v-model="form.endereco[0].endereco"
                      placeholder="Endereço Local">
                  </div>
                  <div class="col-sm-2">
                    <input type="text"
                      class="form-control"
                      v-model="form.endereco[0].numero"
                      placeholder="Numero">
                  </div>
                  <div class="col-sm-4">
                    <input type="text"
                      class="form-control"
                      v-model="form.endereco[0].bairro"
                      placeholder="Bairro Local">
                  </div>
                  <div class="col-sm-4">
                    <input type="text"
                    class="form-control"
                    v-model="form.endereco[0].complemento"
                    placeholder="Complemento Local">
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <b-input-group >
                        <b-form-input placeholder="Cidade" v-model="form.endereco[0].cidade"  @keyup="datasearch(1, 0);"></b-form-input>
                        <b-input-group-append>
                          <b-button variant="outline-info" class="material-icons" @click="datasearch(1, 0);">search</b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                  </div>
                </div>
                <H6 class="text-success">Endereço Igreja Sede</H6>
                <div class="row">
                  <div class="col-sm-3">
                    <b-input-group>
                      <b-form-input
                        placeholder="CEP"
                        v-model="form.endereco[0].cep" v-mask="'#####-###'">
                      </b-form-input>
                        <b-input-group-append >
                        <b-button variant="outline-info" class="material-icons" @click="buscarcep (form.endereco[1].cep, form, 2)">search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                  <div class="col-sm-7">
                    <input type="text"
                      class="form-control"
                      v-model="form.endereco[1].endereco"
                      placeholder="Endereço Sede">
                  </div>
                  <div class="col-sm-2">
                    <input type="text"
                      class="form-control"
                      v-model="form.endereco[1].numero"
                      placeholder="Numero">
                  </div>
                  <div class="col-sm-4">
                    <input type="text"
                      class="form-control"
                      v-model="form.endereco[1].bairro"
                      placeholder="Bairro Sede">
                  </div>
                  <div class="col-sm-4">
                    <input type="text"
                    class="form-control"
                    v-model="form.endereco[1].complemento"
                    placeholder="Complemento Sede">
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <b-input-group >
                        <b-form-input placeholder="Cidade Sede" v-model="form.endereco[1].cidade"  @keyup="datasearch(1, 0);"></b-form-input>
                        <b-input-group-append>
                          <b-button variant="outline-info" class="material-icons" @click="datasearch(1, 0);">search</b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                  </div>
                </div>
              </b-container>
            </b-tab>
            <b-tab title="Configurações">
              <b-container>
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
              </b-container>
            </b-tab>
            <b-tab :title="titleMult" :disabled="mult">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <Button label="Igrejas do Campo" class="p-button-raised p-button-success p-button-text button" @click="datasearch(2);" />
                  </div>
                </div>
                <div class="col-sm-8">
                  <b-form-checkbox
                    id="checkbox-1"
                    v-model="form.pessoaIgrejaPlanos.multiigreja"
                    value="1"
                    unchecked-value="0"
                    >MultiIgreja
                  </b-form-checkbox>
                  <b-form-checkbox
                    id="checkbox-2"
                    v-model="form.pessoaIgrejaPlanos.celula"
                    value="1"
                    unchecked-value="0"
                    >Celula
                  </b-form-checkbox>
                </div>
              </div>
              <div class="col-sm-12">
                <b-form-group label="Igrejas">
                  <DataTable :value="form.campoEclesiastico" :scrollable="true" scrollHeight="200px" :loading="loading">
                    <Column field="idfilial" header="id"></Column>
                    <Column field="nome" header="Igreja"></Column>
                    <Column headerStyle="width: 80px;" bodyStyle=""  :exportable="false">
                      <template #body="slotProps">
                          <Button icon="pi pi-trash" class="p-button-rounded p-button-outlined p-button-danger p-button-sm" @click="slotProps.data.del=true;slotProps.data.add=false;del(slotProps.data);" />
                      </template>
                    </Column>
                  </DataTable>
                </b-form-group>
              </div>
            </b-tab>
          </b-tabs>
        </form>
      <template #footer>
          <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
          <Button label="Salvar" @click="validate(doc, 0, form)" class="p-button-raised p-button-success p-button-text button" />
      </template>
    </Dialog>

    <!-- Tela cadastro -->
    <div id="overlay" v-if="openConfiguration">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastro Usuario</h5>
            <button type="button" class="close"  @click="openConfiguration=false;">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <form method="POST">
              <b-container>
                <div class="row">
                  <div class="col-sm-6">
                    <b-form-group label="Certificado Padrão (NÂO ALTERAR !!!)" label-align-sm="left">
                      <input type="text"
                      class="form-control"
                      v-model="configuration.modelocertificado">
                    </b-form-group>
                  </div>
                  <div class="col-sm-6">
                    <b-form-group label="Carteirinha Membro Padrão (NÂO ALTERAR !!!)" label-align-sm="left">
                      <input type="text"
                      class="form-control"
                      v-model="configuration.modelocarteira">
                    </b-form-group>
                  </div>
                  <div class="col-sm-12">
                  <b-form-group label-align-sm="left" label="Texto Certificado">
                    <b-form-textarea
                      placeholder="Texto Relatório"
                      rows="6"
                      v-model="configuration.textocertificado"
                      max-rows="5"
                    ></b-form-textarea>
                  </b-form-group>
                </div>
                </div>
              </b-container>
            </form>
            <button class="btn btn-outline-info float-right" @click="globais(1);" >Salvar</button>
          </div>
        </div>
      </div>
    </div>
    <adonaidatasearch
    :title="ds.title"
    :cabecalho="ds.grid"
    :form="form"
    :destroy="destroy"
    ref="expl"/>
  </div>
</template>

<script src="./igreja.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

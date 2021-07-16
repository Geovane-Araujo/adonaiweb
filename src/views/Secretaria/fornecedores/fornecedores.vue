<template>
  <div >
    <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Fornecedores/Prestadores</p>
          <button
            class="btn btn-outline-info"
            @click="getbyId(-100)">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
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
    <Dialog style="font-size:10px;" header="Fornecedores/Prestadores" :visible.sync="openModal" :style="{width: resize+'vw'}" :modal="true">
        <form method="POST">
          <div class="container">
            <b-tabs content-class="mt-1">
              <b-tab title="Principal" active>
                  <b-row class="text-center">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-sm-8">
                          <input type="text"
                          class="form-control"
                          v-model="form.nome"
                          placeholder="Razão Social">
                        </div>
                        <div class="col-sm-4">
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
                            placeholder="Fantasia">
                        </div>
                        <div class="col-sm-6">
                          <input
                            type="text"
                            v-model="form.secretario"
                            class="form-control"
                            placeholder="Contato Responsável">
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
              </b-tab>
              <!-- Endereços -->
              <b-tab title="Enderecos">
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
              </b-tab>
            </b-tabs>
          </div>
        </form>
      <template #footer>
        <Button label="Salvar" @click="validate(doc, 0, form)" class="p-button-raised p-button-success p-button-text button" />
        <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-danger p-button-text button"/>
      </template>
    </Dialog>
    <adonaidatasearch
    :title="ds.title"
    :cabecalho="ds.grid"
    :form="form"
    :destroy="destroy"
    ref="expl"/>
  </div>
</template>

<script src="./fornecedores.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

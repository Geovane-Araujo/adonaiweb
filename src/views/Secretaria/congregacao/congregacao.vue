<template>
  <div>
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="3" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Congregações</p>
          <button
            class="btn btn-outline-info"
            @click="form.del=false;form.add=true;form.edit=false;openModal=true;">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <button
            class="btn btn-outline-info float-right"
            @click="imprimir('report/pessoas/congregacoes.jrxml')">
            <i class="fas fa-print"></i>&nbsp;&nbsp;Imprimir
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid class="grid" :titulos="['id','nome','endereco','bairro','numero','telefone']"
          :flex="[{ tamanho: 15, name: 'id' }, { tamanho: 60, name: 'nome' }, { tamanho: 50, name: 'endereco' }, { tamanho: 30, name: 'bairro' }, { tamanho: 20, name: 'numero' }, { tamanho: 20, name: 'telefone' }]"
          :registros="congregacao"
          :form="form"
          :save="save"
          :getbyId="getbyId"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>
    <Dialog style="font-size:10px;" header="Cadastro Congregações" :visible.sync="openModal" :style="{width: resize+'vw'}" :modal="true">
      <b-container>
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
                  <b-button variant="outline-info" class="material-icons" @click="buscarcep (form.endereco[0].cep, form, 0)">search</b-button>
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
      </b-container>
      <template #footer>
        <div class=" p-mr-2 p-as-start" style="align: left">
          <Button label="Salvar" @click="validate(form)" class="p-button-raised p-button-success p-button-text button" />
          <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
        </div>
      </template>
    </Dialog>
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
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

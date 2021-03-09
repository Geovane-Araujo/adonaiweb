<template>
  <div style="padding: 0px">
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Pedidos de Oração</p>
          <button class="btn btn-outline-info" @click="cleanForm(form);open=false; openModal=true">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid class="grid"
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 20, name: 'data' }, { tamanho: 20, name: 'tipo' }, { tamanho: 70, name: 'nome' }, { tamanho: 50, name: 'descricao' }]"
          :registros="pedidos"
          :form="form"
          :save="save"
          :getbyId="getbyId"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
        <Dialog style="font-size:10px;" header="Pedidos" :visible.sync="openModal" :style="{width: '50vw'}" :modal="true">
          <b-container>
            <div class="row">
              <div class="col-sm-3">
                <b-form-group label-align-sm="left" label="Data">
                  <datetime  placeholder="data"
                    class="datePivker"
                    type="Date"
                    value-zone="UTC"
                    format="dd/MM/yyyy"
                    v-model="form.data">
                  </datetime>
                </b-form-group>
              </div>
              <div class="col-sm-4">
                <b-form-group label="Tipo Solicitação" label-align-sm="left">
                  <b-input-group>
                    <b-form-input placeholder="Tipo Solicitação"
                    v-model="form.tipo"
                      ></b-form-input>
                      <b-input-group-append >
                      <b-button variant="outline-info" class="material-icons" @click="datasearch(1,0)">search</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </div>
              <div class="col-sm-5">
                <b-form-group label="Status" label-align-sm="left">
                  <b-form-select
                    :options="[{ text: 'Não Lido', value: 0 }, {text: 'Incluído em Campanha', value: 1}, {text: 'Finalizado', value: 2}]"
                    v-model="form.status"
                ></b-form-select>
                </b-form-group>
              </div>
              <div class="col-sm-6">
                <b-form-group label="Nome" label-align-sm="left">
                  <b-input-group>
                    <b-form-input placeholder="Nome"
                    v-model="form.nome"
                      ></b-form-input>
                      <b-input-group-append >
                      <b-button variant="outline-info" class="material-icons" @click="datasearch(2,2)">search</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </div>
              <div class="col-sm-12">
                <b-form-group label="Pedido" label-align-sm="left">
                  <b-form-textarea
                    rows="2"
                    v-model="form.mensagem"
                    max-rows="2"
                  ></b-form-textarea>
                </b-form-group>
              </div>
            </div>
          </b-container>
          <template #footer>
              <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
              <Button label="Salvar" @click="validate(form);" class="p-button-raised p-button-success p-button-text button" />
          </template>
        </Dialog>
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

<script src="./pedidos.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

<template>
  <div>
    <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Estudos Esboços e Devocionais</p>
          <button class="btn btn-outline-info" @click="getbyId(-100);">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid class="grid"
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 20, name: 'data' }, { tamanho: 70, name: 'titulo' }, { tamanho: 40, name: 'nome' }, { tamanho: 20, name: 'tipo' }]"
          :registros="tipopedido"
          :form="form"
          :getbyId="getbyId"
          :save="save"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>

    <Dialog style="font-size:10px;" header="Estudos, Esboços e Devocionais" :visible.sync="openModal" :style="{width: resize+'vw'}" :modal="true">
      <b-container>
        <div class="row">
          <div class="col-sm-2">
            <b-form-group label="Data">
              <datetime
                class="datePivker"
                type="Date"
                v-model="form.data"
                value-zone="UTC"
                format="dd/MM/yyyy">
              </datetime>
            </b-form-group>
          </div>
          <div class="col-sm-4">
            <b-form-group label="Titulo">
              <input type="text"
                v-model="form.titulo"
                class="form-control">
            </b-form-group>
          </div>
          <div class="col-sm-3">
            <b-form-group label="Nome">
              <div class="form-group">
                <b-input-group>
                  <b-form-input placeholder="Nome" v-model="form.nome" @click="datasearch ();"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="datasearch ();">search</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </b-form-group>
          </div>
          <div class="col-sm-3">
            <b-form-group label="Tipo">
              <b-form-select
                :options="[{ text: 'Esboço', value: 0 }, {text: 'Estudo', value: 1}, {text: 'Devocional', value: 2}]"
                v-model="form.idtipo">
              </b-form-select>
            </b-form-group>
          </div>
          <div class="col-sm-12">
            <Editor v-model="form.mensagem" editorStyle="height: 320px"/>
          </div>
        </div>
      </b-container>
      <template #footer>
          <Button label="Salvar" @click="validate(form);" class="p-button-raised p-button-success p-button-text button" />
          <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
      </template>
    </Dialog>
    <adonaidatasearch
      :title="ds.title"
      :cabecalho="ds.grid"
      :form="form"
      :destroy="destroy"
      ref="cmp"/>
  </div>
</template>

<script src="./esbocos.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

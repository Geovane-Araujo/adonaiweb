<template>
  <div>
    <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Documetos Editaveis</p>
          <button class="btn btn-outline-info" @click="getbyId(-100);">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid class="grid"
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 150, name: 'descricao' }, { tamanho: 20, name: 'tipo' }]"
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

    <Dialog header="Documentos Editveis" :visible.sync="openModal" :style="{width: '70vw'}" :maximizable="true"  :modal="true">
        <div class="row">
          <div class="col-sm-9">
            <b-form-group label="Descricao">
              <input type="text"
                v-model="form.descricao"
                class="form-control">
            </b-form-group>
          </div>
          <div class="col-sm-3">
            <b-form-group label="Tipo">
              <b-form-select
                :options="[{ text: 'Carta Apresentação', value: 1 }, {text: 'Carta de Mudança', value: 2}, {text: 'Geral', value: 3}]"
                v-model="form.idtipo">
              </b-form-select>
            </b-form-group>
          </div>
          <div class="sc col-sm-12">
            <Editor v-model="form.texto"/>
          </div>
        </div>
      <template #footer>
          <Button label="Salvar" @click="validate(form);" class="p-button-raised p-button-success p-button-text button" />
          <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
      </template>
    </Dialog>
  </div>
</template>

<script src="./documentos.js">
</script>
<style lang="scss" scoped src="../../../assets/scss/adonai.scss">
// @import url("../../../assets/scss/adonai.scss");
</style>

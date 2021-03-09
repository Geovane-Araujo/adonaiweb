<template>
  <div class="membro">
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Cadastro de Tipo Eventos</p>
          <button class="btn btn-outline-info" @click="cleanForm(form); openModal=true">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <adonaigrid class="grid"
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 200, name: 'descricao' }]"
          :form="form"
          :save="save"
          :getbyId="getbyId"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
        <Dialog style="font-size:10px;" :baseZIndex="0" header="Cadastro Eventos Agenda" :visible.sync="openModal"  :style="{width: '30vw'}" :modal="true">
          <template #content>
            <ColorPicker :autoZIndex="true" :baseZIndex="1300" v-model="form.cor"/>
          </template>
          <div :baseZIndex="1" class="row">
            <div class="col-sm-10">
              <div class="form-group">
                <input type="text"
                name="descricao"
                autocomplete="off"
                class="form-control"
                placeholder="Descricao"
                v-model="form.descricao">
              </div>
            </div>
            <div class="col-sm-2">
              <ColorPicker disabled=true :autoZIndex="true" :baseZIndex="2" v-model="form.cor"/>
            </div>
            <div class="col-sm-4">
              <ColorPicker :tabindex="50" inline=true :autoZIndex="true" :baseZIndex="2" v-model="form.cor"/>
            </div>
          </div>
          <template #footer>
              <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
              <Button label="Salvar" @click="validate(form);" class="p-button-raised p-button-success p-button-text button" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script src="./eventoagenda.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

<template>
  <div class="membro">
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Cadastro de Cargos</p>
          <button class="btn btn-outline-info" @click="cleanForm(form); openModal=true">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <adonaigrid class="grid"
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 200, name: 'descricao' }]"
          :registros="cargos"
          :form="form"
          :save="save"
          :getbyId="getbyId"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
        <Dialog style="font-size:10px;" header="Cadastro Cargos" :visible.sync="openModal" :style="{width: '20vw'}" :modal="true">
          <div class="form-group">
            <input type="text"
            name="descricao"
            autocomplete="off"
            class="form-control"
            placeholder="Descricao"
            v-model="form.descricao">
          </div>
          <template #footer>
              <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
              <Button label="Salvar" @click="validate (form)" class="p-button-raised p-button-success p-button-text button" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script src="./cargo.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

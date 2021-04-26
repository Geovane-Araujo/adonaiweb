<template>
  <div>
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Auditoria</p>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <adonaigrid class="grid"
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 15, name: 'login' }, { tamanho: 20, name: 'data' }, { tamanho: 20, name: 'descricao' }, { tamanho: 150, name: 'log' }]"
          :registros="tipocontas"
          :form="form"
          :getbyId="getbyId"
          :save="save"
          :explorer="explorer"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./auditoria.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

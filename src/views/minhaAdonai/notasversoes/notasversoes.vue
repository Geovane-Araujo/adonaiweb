<template>
  <div class="versao">
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p class="p">Notas de Versões</p>
          <hr class="bg-info" />
          <adonaigrid
          :flex="[{ tamanho: 15, name: 'id' }, { tamanho: 20, name: 'versao' }, { tamanho: 180, name: 'descricao' }]"
          :registros="versao"
          :type="false"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./notasversoes.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

<template>
  <div class="versao">
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p class="p">Notas de Versões</p>
          <hr class="bg-info" />
          <adonaigrid :titulos="['data','versao','descricao']"
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
<style lang="scss" scoped>
.p {
  font-size: 30px;
}
.table-sm {
  padding: 2px;
}
.versao {
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba($color: #ffffff, $alpha: 0.9);
  margin: 5px;
  overflow: auto;
}
tr {
  line-height: 14px;
  font-size: 13px;
}
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  right: 0;
  background-image: url('../../img/fundo.jpg');
  background-color: rgba($color: #000000, $alpha: 0.7);
}
</style>

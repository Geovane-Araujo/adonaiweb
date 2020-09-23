<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
</script>
<style lang="scss">
body,html {
  width: 100%;
  height: 100%;
}
#app {
  overflow: hidden; /* para que não tenha rolagem se a imagem de fundo for maior que a tela */
    width: 100%;
    height: 100%;
    position: relative;
  //background-image: url(https://cdn.pixabay.com/photo/2017/02/16/23/46/book-2073023_960_720.jpg);
  background-image: url('./static/imagem.jpg');
  // background-color: rgba($color: #033249, $alpha: 1.0);
  background-size: cover;
  height: 100vh;
}
</style>

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
  font-size: 14px;
  overflow-x: hidden;
}
#app {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url('./static/imagem.jpg');
  background-size: cover;
  height: 100vh;
  font-size: 70%;
}
</style>

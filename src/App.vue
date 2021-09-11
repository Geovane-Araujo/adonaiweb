<template>
  <div id="app">
    <router-view/>
    <Toast position="top-right" />
  </div>
</template>
<script>
import Toast from 'primevue/toast'
export default {
  components: {
    Toast
  }
}
</script>
<style lang="scss">
@import './assets/styles/custom.scss';
html{
  font-size: 13px;
}
body,html {
  width: 100%;
  height: 100%;
  font-size: 13px;
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

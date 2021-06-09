<template>
  <div id="overlay" v-if=openModal>
      <div class="nav">
        <div class="row">
          <div class="title">
            <span style="font-size: 17px">Gerenciador de Impressão de Relatórios</span>
          </div>
        </div>
        <dir>
          <Button @click="openModal=false" style="margin: 5px; float: right;" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined" />
          <Button style="margin: 5px; float: right;" icon="pi pi-print" class="p-button-rounded p-button-success p-button-outlined" />
        </dir>
      </div>
      <div class="content">
        <span v-html="text" ></span>
      </div>
  </div>
</template>

<script>
import Button from 'primevue/button'
export default {
  name: 'printviewer',
  data () {
    return {
      openModal: false,
      text: ''
    }
  },
  methods: {
    printView (text) {
      this.openModal = true
      this.text = text
    }
  },
  components: {
    Button
  }
}
</script>

<style lang="scss" scoped>
.content{
  background-color: #89898f;
  height: 100%;
  overflow: auto;
}
.title{
  text-align: center;
  color: #fff;
  margin: 15px 15px 0px 25px;
}
.nav{
  background-color: #1e3b3d;
  width: 100%;
  height: 50px;
  -webkit-box-shadow: 0px 2px 5px rgba(50, 50, 50, 0.77);
  -moz-box-shadow: 0px 2px 5px rgba(50, 50, 50, 0.77);
  box-shadow: 0px 2px 5px rgba(50, 50, 50, 0.77);
}
.as {
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  right: 0;
  background-color: #fff;
}
</style>

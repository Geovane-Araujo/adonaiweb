<template>
  <div id="overlay" v-if=openModal>
      <div class="nav">
        <div class="row">
          <div class="title">
            <span style="font-size: 17px">Gerenciador de Impressão de Relatórios</span>
          </div>
        </div>
        <dir>
          <Button @click="openModal=false" style="color: #fff; margin: 5px; float: right;" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined" />
          <Button @click="print" style="color: #fff;margin: 5px; float: right;" icon="pi pi-print" class="p-button-rounded p-button-success p-button-outlined" />
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
    },
    print () {
      var telaimpressao = window.open('about:blank')
      telaimpressao.document.write(this.text)
      telaimpressao.window.print()
      telaimpressao.window.close()
    }
  },
  components: {
    Button
  }
}
</script>

<style lang="scss" scoped>
.content{
  background-color: #eeeef5;
  height: 100%;
  overflow: auto;
}
.title{
  text-align: center;
  color: #fff;
  margin: 15px 15px 0px 25px;
}
.nav{
  background-color: #5e8a75;
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

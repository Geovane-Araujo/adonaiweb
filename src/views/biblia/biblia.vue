<template>
  <div class="private">
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p class="p">Bíblia</p>
          <hr class="bg-info" />
        </div>
        <div class="row" style="margin-top: -20px; margin-left: 10px;">
          <div class="col-sm-4">
            <b-form-group label="Versão" label-align-sm="left">
              <b-form-select
              :options="versao"
            ></b-form-select>
            </b-form-group>
          </div>
          <div class="col-sm-3">
            <b-form-group label="Livro" label-align-sm="left">
              <b-form-select
              :options="livros"
            ></b-form-select>
            </b-form-group>
          </div>
          <div class="col-sm-2">
            <b-form-group label="Capítulo" label-align-sm="left">
              <input type="text"
                class="form-control">
            </b-form-group>
          </div>
          <div class="col-sm-2">
            <b-form-group label="Versiculo" label-align-sm="left">
              <input type="text"
                class="form-control">
            </b-form-group>
          </div>
          <div class="col-sm-2">
            <b-form-group label="Bus" label-align-sm="left" style="color: #ffffff;">
              <button @click="openModal=true;"
                class="btn btn-outline-info">Buscar
              </button>
            </b-form-group>
          </div>
        </div>
      </div>
    </div>
    <!-- modal Filtros-->
    <div id="overlay" v-if=openModal>
    </div>
  </div>
</template>

<script src="./biblia.js">
</script>
<style lang="scss" scoped>
.p {
  font-size: 30px;
}
.private {
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba($color: #ffffff, $alpha: 0.9);
  margin: 5px;
  overflow: auto;
}
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
button {
  color: #5e8a75;
  border-color:#5e8a75;
}
button:hover {
  background-color: #5e8a75;
  border-color:#5e8a75;
}
</style>

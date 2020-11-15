<template>
  <div>
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p style="color: #000000" class="p">Bíblia</p>
          <hr class="bg-info" />
        </div>
        <div class="row" style="margin-top: -20px; margin-left: 10px;">
          <div class="col-sm-4">
            <b-form-group label="Versão" label-align-sm="left">
              <b-form-select
              v-model="form.idversao"
              :options="versao"
            ></b-form-select>
            </b-form-group>
          </div>
          <div class="col-sm-3">
            <b-form-group label="Livro" label-align-sm="left">
              <b-form-select
              :options="livros"
              v-model="form.idlivro"
            ></b-form-select>
            </b-form-group>
          </div>
          <div class="col-sm-2">
            <b-form-group label="Capítulo" label-align-sm="left">
              <input type="text"
                v-model="form.capitulo"
                class="form-control">
            </b-form-group>
          </div>
          <div class="col-sm-2">
            <b-form-group label="Versiculo" label-align-sm="left">
              <input type="text"
                v-model="form.versiculo"
                class="form-control">
            </b-form-group>
          </div>
          <div class="col-sm-2">
            <b-form-group label="Bus" label-align-sm="left" style="color: #ffffff;">
              <button @click="getbible (form);"
                class="btn btn-outline-info">Buscar
              </button>
            </b-form-group>
          </div>
        </div>
      </div>
    </div>
    <!-- modal Filtros-->
    <div id="overlay" v-if=openModal>
      <button style="margin-top:0px;margin-rigth: 0px;" @click="openModal=false"
        class="btn btn-outline-info">
        <img src="../../img/close.png">
      </button>
      <div class="as">
        <div class="row">
          <div class="col-sm-1" style="padding: 0px;">
            <button style="margin-top:0px;margin-rigth: 0px;" v-on:click.37="form.id=(form.id-1);nextver (form)" @click="form.id=(form.id-1);nextver (form)"
              class="btn btn-outline-info">
              <img src="../../img/left.png">
            </button>
          </div>
          <div class="col-sm-10" style="padding: 0px;">
            <p>{{ form.texto }}</p>
          </div>
          <div class="col-sm-1" style="padding: 0px;">
            <button style="margin-right:0px;" v-on:click.right="form.id=(form.id+1);nextver (form)" @click="form.id=(form.id+1);nextver (form)"
              class="btn btn-outline-info">
              <img src="../../img/rigth.png">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./biblia.js">
</script>
<style lang="scss" scoped>
.p {
  font-size: 30px;
}
.as {
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
p {
  color: white;
  font-size: 30px;
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
button {
  color: #5e8a75;
  border-color:#5e8a75;
}
button:hover {
  background-color: #5e8a75;
  border-color:#5e8a75;
}
</style>

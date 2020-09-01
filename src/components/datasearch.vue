<template>
<transition>
  <div class="cargodts">
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular" style="z-index: 5002;"></loader>
      <div id="overlay" v-if="openDatasearch">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h6>Selecione o {{ title }}</h6>
              <button type="button" class="close"  @click="registros=[];destroy (0, '', '')">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <b-form-input class="mr-sm-2" placeholder="Buscar" v-model="contexto"  @keyup.enter="dataSearch (route, pagina, contexto, params)"></b-form-input>
              <br>
              <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
                <thead>
                  <tr class="text-left text-light" style="background-color: #5e8a75">
                    <th v-for="itcabe in cabecalho" :key="itcabe.ID">{{ itcabe }}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody style="overflow-y: scroll;height: 150px;">
                  <tr class="text-left" v-for="registro in registros" :key="registro.id">
                    <td  v-for="item in registro" :key="item.id"> {{ item }}</td>
                    <td>
                      <a href="#" class="text-success" @click="destroy (registro, params, extraparams);"><i class="far fa-check-square"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="row">
                <b-input-group >
                  <b-input-group-append>
                    <b-button variant="outline-info" style="margin-left:10px;" class="material-icons" @click="explorerflex.pagina = pagina - 1;dataSearch (explorerflex,'',params)">chevron_left</b-button>
                  </b-input-group-append>
                  <b-form-input  class="col-sm-1 text-center" v-model="pagina"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="explorerflex.pagina = pagina + 1;dataSearch (explorerflex,'',params)">chevron_right</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script src="./datasearch.js">
</script>

<style lang="scss" scoped>
label {
  background-color: #3498db;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin: 10px;
  padding: 6px 20px
}
p {
  font-size: 30px;
}
.table-sm {
  padding: 2px;
}
.cargodts {
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba($color: #ffffff, $alpha: 0.9);
  margin: 5px;
  overflow:auto;
}
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1000;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
#loading {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 5000;
  left: 0;
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

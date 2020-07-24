<template>
<transition>
  <div class="cargodts">
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
              <b-form-input class="mr-sm-2" placeholder="Buscar"  @keyup.enter="descricao;"></b-form-input>
              <br>
              <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
                <thead>
                  <tr class="text-left bg-info txt-light" style="height: 10px;">
                    <th v-for="itcabe in cabecalho" :key="itcabe.ID">{{ itcabe }}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody style="overflow-y: scroll;height: 150px;">
                  <tr class="text-left" v-for="registro in registros" :key="registro.id">
                    <td  v-for="item in registro" :key="item.id"> {{ item }}</td>
                    <td>
                      <a href="#" class="text-success" @click="destroy (route, registro);"><i class="far fa-check-square"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="row">
                <b-input-group >
                  <b-input-group-append>
                    <b-button variant="outline-info" style="margin-left:10px;" class="material-icons" @click="pagina = pagina - 1;dataSearch (route,pagina,contexto)">chevron_left</b-button>
                  </b-input-group-append>
                  <b-form-input  class="col-sm-1 text-center" v-model="pagina"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="pagina = pagina + 1;dataSearch (route,pagina,contexto)">chevron_right</b-button>
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
input[type='file'] {
  display: none
}
.table-sm {
  padding: 2px;
}
.despesas {
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
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
</style>

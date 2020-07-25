<template id="adonaigrid">
<div>
  <table class="table table-botdered table-striped table-sm table-hover table-fixed">
      <thead  style="max-height:10vh; overflow-y:auto;">
        <tr class="text-left bg-info txt-light style=height: 10px;">
          <th v-for="title in titulos" :key="title.ID">{{ title }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-left" v-for="registro in registros" :key="registro.id">
          <td v-for="item in registro" :key="item.id">{{ item }}</td>
          <td>
            <a href="#" @click="getbyId(registro.id); form.edit=true;form.add=false" class="text-success"><i class="fas fa-edit"></i></a>
            &nbsp;
            <a href="#" @click="form.id=registro.id; form.edit=false;form.add=false;form.del=true; deleteModal=true" class="text-danger"><i class="far fa-trash-alt"></i></a>
          </td>
        </tr>
      </tbody>
    </table>
    <b-input-group class="col-sm-5">
        <button class="btn btn-outline-info" v-bind:disabled="(pagina == 1)"><i class="fas fa-caret-left"></i></button>
        <b-form-input  class="col-sm-1 text-center" v-model="pagina"></b-form-input>
        <button class="btn btn-outline-info" v-bind:disabled="(pagina == 1)" ><i class="fas fa-caret-right"></i></button>
        <b-form-input placeholder="buscar" style="margin-left:10px" class="col-sm-5"></b-form-input>
        <b-button variant="outline-info" class="material-icons">search</b-button>
    </b-input-group>

    <div id="overlay" v-if=deleteModal>
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-danger">Deseja realmente Excluir ?</h5>
            <button type="button" class="close"  @click="deleteModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <button class="btn btn-outline-danger" @click="save(form);deleteModal=false;" >Sim</button>
            <button class="btn btn-outline-success float-right" @click="deleteModal=false">Não</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./grid.js">
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
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
</style>

<template id="adonaigrid">
<div style="padding-left:0px;">
  <loader v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
  <div class="fixed" style="">
    <table class=" table table-botdered table-striped table-sm table-hover table-fixed">
      <thead  style="overflow-y:auto;">
        <tr class="text-left text-light text-light" style="background-color: #5e8a75">
          <th @click="onSelectRsgister(title)" v-for="title in titulos" :key="title.ID">{{ title }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-left" v-for="registro in reg" :key="registro.id">
          <td v-for="item in registro" :key="item.id">{{ item }}</td>
          <td>
            <a v-show="type" href="#" @click="getbyId(registro.id); form.edit=true;form.add=false" class="text-success"><i class="fas fa-edit"></i></a>
            &nbsp;
            <a v-show="type" href="#" @click="onDelete(registro, form)" class="text-danger"><i class="far fa-trash-alt"></i></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="padding-top:0px;">
    <b-input-group class="col-sm-12" style="margin-top:0px;">
      <button class="btn btn-outline-info" v-bind:disabled="(explorer.pagina == 1)" @click="explorer.pagina = explorer.pagina - 1;get(explorer)"><i class="fas fa-caret-left"></i></button>
      <b-form-input  class="col-sm-1 text-center" v-model="explorer.pagina"></b-form-input>
      <button class="btn btn-outline-info" v-bind:disabled="(reg.length < 15)" @click="explorer.pagina = explorer.pagina + 1;get(explorer)"><i class="fas fa-caret-right"></i></button>
      <b-form-input placeholder="buscar" v-model="buscar" @keyup="getexplorer(buscar)" style="margin-left:10px" class="col-sm-5"></b-form-input>
    </b-input-group>
  </div>
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
tr {
  line-height: 14px;
  font-size: 13px;
}
.fixed{
  overflow-y: auto;
  height: 400px;
}
.fixed thead th {
  position: sticky;
  top: 0;
}
p {
  font-size: 30px;
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
button {
  color: #5e8a75;
  border-color:#050505;
}
button:hover {
  background-color: #5e8a75;
  border-color:#5e8a75;
}
footer {
  position: fixed;
  bottom:10px;
}
.footer {
  box-shadow:2px rgba(0, 0, 0, 0.25);
}
</style>

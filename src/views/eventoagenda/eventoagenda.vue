<template>
  <div>
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Cadastro de Tipo Eventos</p>
          <button class="btn btn-outline-info" @click="cleanForm(form); openModal=true">
            <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid :titulos="['ID','Descricao']"
          :form="form"
          :save="save"
          :getbyId="getbyId"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>
    <!-- modal -->
    <div id="overlay" v-if="openModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tipo Eventos</h5>
            <button type="button" class="close"  @click="cleanForm(form); openModal=false;">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <form>
              <div class="row">
                <div class="col-sm-10">
                  <div class="form-group">
                    <input type="text"
                    name="descricao"
                    autocomplete="off"
                    class="form-control"
                    placeholder="Descricao"
                    v-model="form.descricao">
                  </div>
                </div>
                <div class="col-sm-2">
                  <v-swatches v-model="form.cor"></v-swatches>
                </div>
              </div>
            </form>
            <button class="btn btn-outline-info float-right" @click="validate (form)" >Salvar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./eventoagenda.js">
</script>
<style lang="scss" scoped>
.table-overflow {
    max-height:90vh;
    overflow-y:auto;
}
p {
  font-size: 30px;
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

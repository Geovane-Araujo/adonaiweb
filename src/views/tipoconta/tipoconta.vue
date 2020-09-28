<template>
  <div class="tipoconta">
    <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Tipo Contas</p>
          <button class="btn btn-outline-info" @click="cleanForm (form);openModal=true;">
            <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12">
          <!-- table -->
          <adonaigrid :titulos="['ID','Descricao','Contexto']"
          :registros="tipocontas"
          :form="form"
          :getbyId="getbyId"
          :save="save"
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
            <h5 class="modal-title">Cadastro Tipo Conta</h5>
            <button type="button" class="close"  @click="cleanForm (form);openModal=false;">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="col-sm-12">
                <input type="text"
                name="descricao"
                autocomplete="off"
                class="form-control"
                placeholder="Descricao"
                v-model="form.descricao">
              </div>
              <div class="col-sm-12">
                <b-form-select
                :options="[{ text: 'Receitas', value: 0 }, {text: 'Despesas', value: 1}]"
                v-model="form.contexto"
                ></b-form-select>
              </div>
            </form>
            <button type="button" class="btn btn-outline-info float-right" @click="validate(form)">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./tipoconta.js">
</script>
<style lang="scss" scoped>
.table-overflow {
    max-height:90vh;
    overflow-y:auto;
}
p {
  font-size: 30px;
}
.tipoconta {
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba($color: #ffffff, $alpha: 0.9);
  margin: 5px;
  overflow:auto;
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
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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

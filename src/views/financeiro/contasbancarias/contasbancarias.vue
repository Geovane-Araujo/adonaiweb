<template>
  <div>
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12" >
          <p>Cadastro de Contas Bancárias</p>
          <button
            class="btn btn-outline-info"
            @click="form.del=false;form.add=true;form.edit=false;openModal=true;">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 200, name: 'descricao' }]"
          :registros="contasbancarias"
          :form="form"
          :save="save"
          :getbyId="getbyId"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>
    <Dialog style="font-size:10px;" header="Cadastro de Caixas" :visible.sync="openModal" :style="{width: '50vw'}" :modal="true">
      <form method="POST">
        <b-container>
          <div class="row">
            <div class="col-sm-12">
              <input type="text"
              class="form-control"
              v-model="form.descricao"
              placeholder="Descricao">
            </div>
            <div class="col-sm-6">
              <input type="text"
              class="form-control"
              v-model="form.agencia"
              placeholder="Agencia">
            </div>
            <div class="col-sm-6">
              <input type="text"
              class="form-control"
              v-model="form.conta"
              placeholder="Conta">
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <b-input-group >
                  <b-form-input placeholder="Banco" v-model="form.nomeBanco" @click="datasearch ()"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="outline-info" class="material-icons" @click="datasearch ()">search</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </div>
          </div>
        </b-container>
      </form>
      <template #footer>
        <Button label="Salvar" @click="validate(form)" class="p-button-raised p-button-success p-button-text button" />
        <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-danger p-button-text button"/>
      </template>
    </Dialog>
    <adonaidatasearch
    :title="ds.title"
    :cabecalho="ds.grid"
    :form="form"
    :destroy="destroy"
    ref="expl"/>
  </div>
</template>

<script src="./contas.js">
</script>
<style lang=scss scoped>
.table-overflow {
    max-height:90vh;
    overflow-y:auto;
}
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
.contas {
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

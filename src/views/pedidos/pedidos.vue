<template>
  <div style="padding: 0px">
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Pedidos de Oração</p>
          <button class="btn btn-outline-info" @click="cleanForm(form); openModal=true">
            <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid :titulos="['ID','data','titulo', 'Solicitante','status']"
          :registros="pedidos"
          :form="form"
          :save="save"
          :getbyId="getbyId"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
        <Dialog style="font-size:10px;" header="Pedidos" :visible.sync="openModal" :style="{width: '40vw'}" :modal="true">
          <form >
            <div class="row">
              <div class="col-sm-4">
                <b-form-group label-align-sm="left" label="Data">
                  <datetime  placeholder="data"
                    class="datePivker"
                    type="Date"
                    value-zone="UTC"
                    format="dd/MM/yyyy"
                    v-model="form.data">
                  </datetime>
                </b-form-group>
              </div>
              <div class="col-sm-4">
                <AutoComplete v-model="form.tipo" :suggestions="pedido" @complete="searchInput($event)" :dropdown="true" field="name">
                  <template #item="slotProps">
                      <div class="country-item">
                          <div>{{slotProps.item.name}}</div>
                      </div>
                  </template>
              </AutoComplete>
              </div>
            </div>
          </form>
          <template #footer>
              <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
              <Button label="Salvar" class="p-button-raised p-button-success p-button-text button" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script src="./pedidos.js">
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
.button {
  color: #5e8a75;
  border-color:#5e8a75;
}
.button:hover {
  background-color: #5e8a75;
  border-color:#5e8a75;
}
.datePivker{
  margin-left: 2px;
  padding: 5px;
  height: 35px;
  border:solid 1px;
  border-radius:3px;
  border-color:#cacdcf;
  text-align: center;
}
</style>

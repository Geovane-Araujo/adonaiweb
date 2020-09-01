<template>
  <div class="movimento">
   <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Histórico de Fechamento</p>
          <hr class="bg-info">
        </div>
        <div class="col-sm-12">
          <!-- table -->
          <table class="table table-botdered table-striped table-sm table-hover table-fixed">
            <thead  style="max-height:10vh; overflow-y:auto;">
              <tr class="text-left text-light" style="background-color: #5e8a75">
                <th>ID</th>
                <th>Caixa</th>
                <th>DataAbertura</th>
                <th>DataFechamento</th>
                <th>Saldo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left" v-for="registro in caixamovimento" :key="registro.ID">
                <td>{{ registro.ID }}</td>
                <td>{{ registro.Descricao }}</td>
                <td>{{ registro.DataAbertura }}</td>
                <td>{{ registro.DataFechamento }}</td>
                <td>{{ registro.Saldo }}</td>
                <td>
                  <a  style="margin-right: 15px;" id="link2" @click="imprimir ('report/financeiro/movimentacoes.jrxml',registro.ID)" class="text-info"><i class="fas fa-print"></i></a>
                  <b-tooltip target="link2" title="Imprimir"></b-tooltip>
                </td>
              </tr>
            </tbody>
          </table>
           <footer class="footer" >
            <b-input-group class="col-sm-12" style="padding-left: 0px;">
              <button class="btn btn-outline-info" v-bind:disabled="(pagina == 1)"><i class="fas fa-caret-left"></i></button>
              <b-form-input  class="col-sm-1 text-center" v-model="pagina"></b-form-input>
              <button class="btn btn-outline-info" v-bind:disabled="(pagina == 1)" ><i class="fas fa-caret-right"></i></button>
              <b-form-input placeholder="buscar" style="margin-left:10px" class="col-sm-5"></b-form-input>
              <b-button variant="outline-info" class="material-icons">search</b-button>
            </b-input-group>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./movimentoHistorico.js">
</script>
<style lang=scss scoped>
label {
  background-color: #3498db;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin: 10px;
  padding: 6px 20px;
}
p {
  font-size: 30px;
}
.table-sm {
  padding: 2px;
}
.movimento {
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
  z-index: 1000;
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
tr {
  line-height: 14px;
  font-size: 13px;
}
button {
  color: #5e8a75;
  border-color:#5e8a75;
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

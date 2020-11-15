<template>
  <div>
   <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Minhas Faturas</p>
          <hr class="bg-info">
        </div>
        <div class="col-sm-12" style="margin-top: -30px;">
          <!-- table -->
          <table class="table table-botdered table-striped table-sm table-hover table-fixed">
            <thead  style="max-height:10vh; overflow-y:auto;">
              <tr class="text-left text-light" style="background-color: #5e8a75">
                <th>Documento</th>
                <th>Descricao</th>
                <th>Valor</th>
                <th>Data Vencimento</th>
                <th>Data Pagamento</th>
                <th>Status</th>
                <th>Recibo</th>
                <th>Gerar Boleto</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left" v-for="registro in minhasfaturas" :key="registro.id">
                <td>{{ registro.documento }}</td>
                <td>{{ registro.descricao }}</td>
                <td>{{ registro.valor }}</td>
                <td>{{ registro.datavencimento }}</td>
                <td>{{ registro.datapagamento }}</td>
                <td>{{ registro.status }}</td>
                <td>
                  <a  id="link1"  class="text-success"><i class="fas fa-info"></i></a>
                  <b-tooltip target="link1" title="Imprimir Recibo"></b-tooltip>
                </td>
                <td>
                  <a id="link2" @click="geraBoleto(registro.id)"  class="text-info"><i class="far fa-eye"></i></a>
                  <b-tooltip target="link2" title="Gerar Boleto"></b-tooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./minhasfaturas.js">
</script>
<style lang=scss scoped>
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
  z-index: 1000;
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
#loading {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 5000;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
footer {
    position: fixed;
    bottom:10px;
}
.footer {
  box-shadow:2px rgba(0, 0, 0, 0.25);
}
</style>

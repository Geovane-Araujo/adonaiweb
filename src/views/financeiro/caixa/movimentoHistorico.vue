<template>
  <div>
   <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Histórico de Fechamento</p>
          <hr class="bg-info">
        </div>
        <div class="col-sm-12" style="margin-top: -30px;">
          <!-- table -->
          <DataTable
          class="p-datatable-sm"
          scrollHeight="400px"
          :scrollable="true"
          style="font-size:14px;"
          :value="caixamovimento"
          :paginator="true"
          :rows="15"
          :selection.sync="select"
          paginatorTemplate=""
          selectionMode="single" dataKey="ID"
          @row-select="onRowSelect"
          :resizableColumns="true"
          columnResizeMode="fit">
            <Column headerStyle="width: 30px;" field="ID" header="ID"></Column>
            <Column field="Descricao" header="Descricao"></Column>
            <Column field="DataAbertura" header="DataAbertura"></Column>
            <Column field="DataFechamento" header="DataFechamento"></Column>
            <Column field="Saldo" header="Saldo"></Column>
            <Column headerStyle="width: 200px;" bodyStyle=""  :exportable="false">
              <template #body="slotProps">
                  <Button icon="pi pi-print" class="p-button-rounded p-button-outlined p-button-info p-button-sm" @click="imprimir ('report/financeiro/fechamentoCaixa.jrxml',slotProps.data.ID)" />
              </template>
            </Column>
            <template style="font-size:14px;" #paginatorLeft>
              <Paginator @page="onPage($event)" class="p-paginator-success" :rows="15" :totalRecords="totalRows"></Paginator>
           </template>
          </DataTable>
      </div>
    </div>
    </div>
  </div>
</template>

<script src="./movimentoHistorico.js">
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

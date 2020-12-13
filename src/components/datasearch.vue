<template>
<transition>
  <div class="cargodts">
      <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
      <Dialog  :header="title" :visible.sync="openDatasearch" :style="{width: resize+'vw'}" :modal="true">
        <b-form-input class="mr-sm-2" placeholder="Buscar" v-model="contexto"  @keyup="getexplorer(contexto)"></b-form-input>
        <DataTable
        class="p-datatable-sm"
        scrollHeight="200px"
        :scrollable="true"
        style="font-size:14px;"
        :value="registros"
        :paginator="true"
        :rows="15"
        :selection.sync="select"
        selectionMode="single"
        dataKey="ID"
        @row-select="onRowSelect"
        paginatorTemplate=""
        columnResizeMode="fit">
          <Column headerStyle="width: 2rem" bodyStyle="height:5px;" v-for="itcabe in cabecalho" :field="itcabe" :header="itcabe" :key="itcabe.ID"></Column>
          <template style="font-size:14px;" #paginatorLeft>
            <Paginator @page="onPage($event)" class="p-paginator-success" :rows="15" :totalRecords="totalRows"></Paginator>
          </template>
      </DataTable>
        <template #footer>
          <Button label="Cancelar"  @click="openDatasearch=false" class="p-button-raised p-button-success p-button-text button"/>
        </template>
      </Dialog>
    </div>
  </transition>
</template>

<script src="./datasearch.js">
</script>

<style lang="scss" scoped>
.cargodts {
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
  z-index: 1000;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
#loading {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 9999;
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

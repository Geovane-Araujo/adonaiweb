<template id="adonaigrid">
<div style="padding-left:0px;">
  <loader v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
  <div>
<!--     <Toobar class="p-md-4">
      <template slot="left">
        <Button label="Adicionar" icon="pi pi-plus" class="p-button-success p-mr-2"/>
      </template>
    </Toobar> -->
    <DataTable class="p-datatable-sm"
        scrollHeight="400px"
        :scrollable="true"
        style="font-size:14px;"
        :value="reg"
        :paginator="true"
        :rows="15"
        :selection.sync="select"
        paginatorTemplate=""
        selectionMode="single" dataKey="ID"
        @row-select="onRowSelect"
        :resizableColumns="true"
        columnResizeMode="fit">
        <Column v-for="title in titulos" :key="title.ID" :field="title" :header="title"></Column>
        <Column :exportable="false">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="getbyId(slotProps.data.id); form.edit=true;form.add=false" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="onDelete(slotProps.data, form)" />
            </template>
        </Column>
        <template style="font-size:14px;" #paginatorLeft>
          <Paginator @page="onPage($event)" class="p-paginator-success" :rows="10" :totalRecords="totalRows"></Paginator>
        </template>
        <template style="font-size:14px;" #paginatorRight>
          <InputText style="margin-right:10px;" v-model="buscar" @keyup="getexplorer(buscar)"  placeholder="Pesquisar"/>
        </template>
    </DataTable>
  </div>
  <Dialog :visible.sync="deleteModal" :style="{width: '450px'}" header="Confirmar" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
      <span >Deseja Realmente Excluir?</span>
    </div>
    <template #footer>
        <Button label="Não" icon="pi pi-times" class="p-button-text" @click="deleteModal = false"/>
        <Button label="Sim" icon="pi pi-check" class="p-button-text" @click="save(form);deleteModal = false" />
    </template>
  </Dialog>
  </div>
</template>

<script src="./grid.js">
</script>
<style lang="scss" scoped>
tr {
  line-height: 14px;
  font-size: 13px;
}
.p-paginator-next{
  background-color: #000000;
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

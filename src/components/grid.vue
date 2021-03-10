<template id="adonaigrid">
<div style="padding-left:0px;">
  <loader v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
  <div>
    <DataTable class="p-datatable-sm"
        scrollHeight="50vh"
        :scrollable="true"
        style="font-size:14px;"
        :value="reg"
        :paginator="true"
        :rows="15"
        paginatorTemplate=""
        selectionMode="single" dataKey="ID"
        @row-select="onRowSelect"
        :resizableColumns="true"
        columnResizeMode="fit">
        <Column :headerStyle="'width:'+title.tamanho+'px'" headerClass="altura" bodyStyle="height:5px;" v-for="title in flex" :key="title.ID" :field="title.name" :header="title.name"></Column>
        <Column headerStyle="width: 20px;" bodyStyle=""  :exportable="false">
            <template #body="slotProps">
                <Button style="font-size: 10px;" icon="pi pi-pencil" class="p-button-rounded p-button-outlined p-button-success p-button-sm p-sm-2" @click="getbyId(slotProps.data.id); form.edit=true;form.add=false" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-outlined p-button-danger p-button-sm" @click="onDelete(slotProps.data, form)" />
            </template>
        </Column>
        <template style="font-size:14px;" #paginatorLeft>
          <Paginator @page="onPage($event)" class="p-paginator-success" :rows="15" :totalRecords="totalRows"></Paginator>
        </template>
        <template style="font-size:14px;" #paginatorRight>
          <InputText style="width: 40vw;margin-right:50px;" v-model="buscar" @keyup="getexplorer(buscar)"  placeholder="Pesquisar"/>
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
.p-datatable {
  .p-rowgroup-header{
    height: 10px;
  }
}
.altura{
  height: 5px;
}
</style>

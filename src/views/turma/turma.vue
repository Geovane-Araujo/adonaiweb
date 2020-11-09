<template>
  <div>
    <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Turmas</p>
          <button class="btn btn-outline-info" @click="getbyId(-100);">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid :titulos="['id','descricao']"
          :registros="tipopedido"
          :form="form"
          :getbyId="getbyId"
          :save="save"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>
    <Dialog style="font-size:10px;" header="Cadastro de Turmas" :visible.sync="openModal" :style="{width: '50vw'}" :modal="true">
      <div class="row">
        <div class="col-sm-4">
          <b-form-group label="Nome Turma">
            <input type="text"
            name="descricao"
            autocomplete="off"
            class="form-control"
            placeholder="Descricao"
            v-model="form.descricao">
          </b-form-group>
        </div>
        <div class="col-sm-3">
          <b-form-group label="Autor">
            <div class="p-inputgroup">
              <InputText v-model="form.classe"/>
              <Button @click="datasearch ();" icon="pi pi-search" class="p-button-success p-button-outlined"/>
            </div>
          </b-form-group>
        </div>
        <div class="col-sm-12">
          <b-form-group label="Alunos e Professores">
            <DataTable :value="form.matriculados" :scrollable="true" scrollHeight="200px" :loading="loading">
              <Column field="id" header="id"></Column>
              <Column field="nome" header="nome"></Column>
              <Column field="tipo" header="tipo"></Column>
            </DataTable>
          </b-form-group>
        </div>
      </div>
      <template #footer>
          <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
          <Button label="Salvar" @click="validate(form);" class="p-button-raised p-button-success p-button-text button" />
      </template>
    </Dialog>
  </div>
</template>

<script src="./turma.js">
</script>
<style lang="scss" scoped>
p {
  font-size: 30px;
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

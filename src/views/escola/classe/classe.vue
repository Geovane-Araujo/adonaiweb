<template>
  <div >
    <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Classes</p>
          <button class="btn btn-outline-info" @click="getbyId(-100);">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid class="grid"
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 50, name: 'curso' }, { tamanho: 100, name: 'descricao' }]"
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
    <Dialog style="font-size:10px;" header="Cadastro de Turmas" :visible.sync="openModal" :style="{width: '60vw'}" :modal="true">
      <b-container>
        <div class="row">
          <div class="col-sm-4">
            <b-form-group label="Nome Classe">
              <input type="text"
              name="descricao"
              autocomplete="off"
              class="form-control"
              placeholder="Classe"
              v-model="form.descricao">
            </b-form-group>
          </div>
          <div class="col-sm-4">
            <b-form-group label="Curso">
              <div class="form-group">
              <b-input-group >
                <b-form-input placeholder="Curso" v-model="form.curso" @click="datasearch(0);"></b-form-input>
                <b-input-group-append>

                  <b-button variant="outline-info" class="material-icons" @click="datasearch(0);">search</b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
            </b-form-group>
          </div>
          <div class="col-sm-4">
            <b-form-group label-align="left" label="Alunos e Professores">
              <div class="form-group">
                <Button label="Aluno" class="p-button-raised p-button-success p-button-text button" @click="datasearch(1);" />
                <Button style="margin-left:20px;" label="Professor" class="p-button-raised p-button-success p-button-text button" @click="datasearch(2);" />
              </div>
            </b-form-group>
          </div>
          <div class="col-sm-12">
            <b-form-group label="Alunos e Professores">
              <DataTable :value="form.matriculados" :scrollable="true" scrollHeight="200px" :loading="loading">
                <Column field="idpessoa" header="id"></Column>
                <Column field="nome" header="nome"></Column>
                <Column field="descricaoTipo" header="tipo"></Column>
                <Column headerStyle="width: 80px;" bodyStyle=""  :exportable="false">
                  <template #body="slotProps">
                      <Button icon="pi pi-trash" class="p-button-rounded p-button-outlined p-button-danger p-button-sm" @click="slotProps.data.del=true;slotProps.data.add=false;del(slotProps.data);" />
                  </template>
                </Column>
              </DataTable>
            </b-form-group>
          </div>
        </div>
      </b-container>
      <template #footer>
          <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-danger p-button-text button"/>
          <Button label="Salvar" @click="validate(form);" class="p-button-raised p-button-success p-button-text button" />
      </template>
    </Dialog>
    <Dialog :visible.sync="alunoModal" :style="{width: '450px'}" header="Confirmar" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span >Realmente deseja Excluir {{ nome }} </span>
      </div>
      <template #footer>
          <Button label="Sim" icon="pi pi-times" class="p-button-text" @click="add(1)"/>
          <Button label="Não" icon="pi pi-check" class="p-button-text" @click="alunoModal=false" />
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

<script src="./classe.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

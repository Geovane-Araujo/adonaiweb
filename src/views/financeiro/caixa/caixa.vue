<template>
  <div>
     <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Caixas</p>
          <button
            class="btn btn-outline-info "
            @click="getbyId(-100)">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid class="grid"
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 200, name: 'descricao' }]"
          :registros="caixa"
          :form="form"
          :getbyId="getbyId"
          :save="save"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>
    <Dialog style="font-size:10px;" header="Cadastro de Caixas" :visible.sync="openModal" :style="{width: '50vw'}" :modal="true">
      <b-container>
        <b-tabs>
          <b-tab title="Principal" active>
            <div class="row">
              <div class="col-sm-12">
                <b-form-group label="Descricao">
                  <input type="text"
                  class="form-control"
                  v-model="form.descricao">
                </b-form-group>
              </div>
              <div class="col-sm-12">
                <b-form-group label="Conta Padrão">
                  <b-input-group>
                    <b-form-input
                    v-model="form.nome"
                    ></b-form-input>
                      <b-input-group-append >
                      <b-button variant="outline-info" class="material-icons" @click="datasearch (1);" >search</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </div>
            </div>
          </b-tab>
          <b-tab title="Usuários Permitidos">
            <div class="row justify-content-end">
              <div class="col-2">
                <Button label="Adicionar" @click="datasearch(2);" class="p-button-raised p-button-info p-button-text button p-button-sm" />
              </div>
            </div>
            <DataTable class="p-datatable-sm" :value="form.usuariospermissoes" :scrollable="true" scrollHeight="200px">
              <Column headerStyle="width: 10%;" bodyStyle="width: 10%;"  field="idusuario" header="ID"></Column>
              <Column headerStyle="width: 80%;" bodyStyle="width: 80%;" field="nome" header="Nome"></Column>
              <Column headerStyle="width: 10%;" bodyStyle="width: 10%;"  :exportable="false">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" class="p-button-rounded-sm p-button-text" @click="onRemoveArra(slotProps.data)" />
                </template>
              </Column>
            </DataTable>
          </b-tab>
        </b-tabs>
      </b-container>
      <template #footer>
        <Button label="Salvar" @click="validate(form, 0)" class="p-button-raised p-button-success p-button-text button" />
        <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-danger p-button-text button"/>
      </template>
    </Dialog>
    <adonaidatasearch
    :title="ds.title"
    :cabecalho="ds.grid"
    :form="form"
    :destroy="destroy"
    ref="cmp"/>
  </div>
</template>

<script src="./caixa.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

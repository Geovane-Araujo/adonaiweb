<template>
  <div >
    <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Registro de Aulas</p>
          <button class="btn btn-outline-info" @click="getbyId(-100);initialize ();openModal=true">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Nova Aula
          </button>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid class="grid"
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 20, name: 'data' }, { tamanho: 50, name: 'classe' }, { tamanho: 100, name: 'curso' }]"
          :form="form"
          :getbyId="getbyId"
          :save="save"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>
    <Dialog style="font-size:10px;" header="Registro de Aula" :visible.sync="openModal" :style="{width: '65vw'}" :modal="true">
      <b-tabs content-class="mt-1">
        <b-tab title="Principal">
          <b-container>
            <div class="row">
              <div class="col-sm-2" style="padding-top:0px; padding-bottom:0px">
                <b-form-group label="Data">
                  <datetime
                    class="datePivker"
                    type="Date"
                    v-model="form.datachamada"
                    value-zone="UTC"
                    format="dd/MM/yyyy">
                  </datetime>
                </b-form-group>
              </div>
              <div class="col-sm-3" style="padding-top:0px; padding-bottom:0px">
                <b-form-group label="Tema">
                  <input type="text"
                  name="Tema"
                  autocomplete="off"
                  class="form-control"
                  placeholder="Tema"
                  v-model="form.tema">
                </b-form-group>
              </div>
              <div class="col-sm-3" style="padding-top:0px; padding-bottom:0px">
                <b-form-group label="Classe">
                  <div class="form-group">
                  <b-input-group >
                    <b-form-input placeholder="Classe" v-model="form.classe" @click="datasearch(0);"></b-form-input>
                    <b-input-group-append>
                      <b-button variant="outline-info" class="material-icons" @click="datasearch(0);">search</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </div>
                </b-form-group>
              </div>
              <div class="col-sm-4" style="padding-top:0px; padding-bottom:0px">
                <b-form-group label="Professor" label-align-sm="left">
                  <b-form-select
                  v-model="form.idprofessor"
                  :options="professores"
                ></b-form-select>
                </b-form-group>
              </div>
              <div class="col-sm-2" style="padding-top:0px; padding-bottom:0px">
                <b-form-group style="padding:0px;" label="Total Matriculados">
                  <input type="text"
                    disabled=""
                    v-model="form.matriculados"
                    class="form-control">
                </b-form-group>
              </div>
              <div class="col-sm-2" style="padding-top:0px; padding-bottom:0px">
                <b-form-group style="padding:0px;" label="Presentes">
                  <input type="text"
                    disabled=""
                    v-model="form.presentes"
                    class="form-control text-success">
                </b-form-group>
              </div>
              <div class="col-sm-2" style="padding-top:0px; padding-bottom:0px">
                <b-form-group style="padding:0px;" label="Ausentes">
                  <input type="text"
                    disabled=""
                    v-model="form.ausentes"
                    class="form-control text-danger">
                </b-form-group>
              </div>
              <div class="col-sm-2" style="padding-top:0px; padding-bottom:0px">
                <b-form-group style="padding:0px;" label="Visitas">
                  <input type="text"
                    v-model="form.visitas"
                    class="form-control text-info">
                </b-form-group>
              </div>
              <div class="col-sm-2" style="padding-top:0px; padding-bottom:0px">
                <b-form-group style="padding:0px;" label="Ofertas">
                  <money type="text"
                    class="form-control text-info"
                    v-bind="currency"
                    v-model="form.ofertas"/>
                </b-form-group>
              </div>
              <div class="col-sm-2" style="padding-top:0px; padding-bottom:0px">
                <b-form-group style="padding:0px;" label="Total">
                  <money type="text"
                    disabled=""
                    v-bind="percent"
                    v-model="form.total"
                    class="form-control text-info"/>
                </b-form-group>
              </div>
              <div class="col-sm-12">
                <b-form-group label="Chamada">
                  <DataTable :value="form.registroChamada" :scrollable="true" scrollHeight="200px" :loading="loading">
                    <Column headerStyle="width: 2rem" field="id" header="id"></Column>
                    <Column field="nomeMatriculado" header="nome"></Column>
                    <Column header="Presente" headerStyle="width: 80px;" bodyStyle=""  :exportable="false">
                      <template #body="slotProps">
                          <b-form-checkbox @change="marcarPresente(slotProps.data.presente)" :id="slotProps.data.id" v-model="slotProps.data.presente"  value="1"  unchecked-value="0">
                        </b-form-checkbox>
                      </template>
                    </Column>
                  </DataTable>
                </b-form-group>
              </div>
            </div>
          </b-container>
        </b-tab>
        <b-tab title="Anotações">
          <Editor v-model="form.detalhe" editorStyle="height: 320px"/>
        </b-tab>
      </b-tabs>
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

<script src="./aula.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

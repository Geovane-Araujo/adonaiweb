<template>
  <div class="visitantes">
    <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Registro de Visitas</p>
          <button
            class="btn btn-outline-info"
            @click="getbyId(-100)">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid class="grid" :titulos="['id','nome','datavisita']"
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 120, name: 'nome' }, { tamanho: 20, name: 'datavisita' }]"
          :registros="visitantes"
          :form="form"
          :getbyId="getbyId"
          :save="save"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>

    <!-- modal para cadastro-->
    <Dialog style="font-size:10px;" class="ocultarScroll" header="Cadastro Visitantes" :visible.sync="openModal" :style="{width: resize+'vw'}" :modal="true">
      <b-container method="POST">
        <div class="row">
          <div class="col-sm-8">
            <b-form-group label="Nome Visitante" style="padding:0px;" label-align="left">
              <div class="form-group">
                <b-input-group >
                  <b-form-input placeholder="Visitante" v-bind:disabled="disabled" v-model="form.nome" @click="datasearch(1);"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="outline-info" v-bind:disabled="disabled" class="material-icons" @click="datasearch(1);">search</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </b-form-group>
          </div>
          <div class="col-sm-4">
            <b-form-group label="Data Visita" label-align="left">
              <datetime v-bind:disabled="disabled" placeholder="Data Visita"
                class="datePivker"
                type="Date"
                value-zone="UTC"
                format="dd/MM/yyyy"
                v-model="form.datavisita">
              </datetime>
            </b-form-group>
          </div>
          <div class="col-sm-12">
            <b-form-group label="Observações" label-align="left">
              <Editor v-model="form.observacoes" editorStyle="height: 10vw"/>
            </b-form-group>
          </div>
        </div>
      </b-container>
      <template #footer>
        <div class=" p-mr-2 p-as-start" style="align: left">
          <Button label="Salvar" @click="validate(form)" class="p-button-raised p-button-success p-button-text button" />
          <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
        </div>
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

<script src="./registroVisita.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

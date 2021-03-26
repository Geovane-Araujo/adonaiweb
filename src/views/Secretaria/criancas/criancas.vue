<template>
  <div>
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Crianças e Adolescentes</p>
          <button
            class="btn btn-outline-info"
            @click="getbyId(-100);openModal=true;">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid class="grid"
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 80, name: 'nome' }, { tamanho: 50, name: 'pai' }, { tamanho: 30, name: 'mae' }, { tamanho: 20, name: 'idade' }]"
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
    <Dialog style="font-size:10px;" header="Cadastro Criancas e Adolescentes" :visible.sync="openModal" :style="{width: resize+'vw'}" :modal="true">
      <form>
        <b-container>
          <b-row class="text-center">
            <div class="col-sm-2">
              <div class="file-loading">
                <b-avatar :src="form.pathimg"
                size="5rem"></b-avatar>
                <div>
                  <label for='selecao-arquivo' class="material-icons">perm_media</label>
                  <input id='selecao-arquivo'  @change="getImg"  accept="image/*" type='file'>
                  <label class="material-icons label2" @click="form.foto='';img=''" >delete_forever</label>
                </div>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="row">
                <div class="col-sm-8">
                  <input type="text"
                  class="form-control"
                  v-model="form.nome"
                  placeholder="Nome Completo">
                </div>
                <div class="col-sm-4">
                  <datetime  placeholder="Data Nascimento"
                    class="datePivker"
                    type="Date"
                    value-zone="UTC"
                    format="dd/MM/yyyy"
                    v-model="form.datanascimento">
                  </datetime>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <b-input-group >
                      <b-form-input placeholder="Pai" v-model="form.nomePai" @click="datasearch(0);"></b-form-input>
                      <b-input-group-append>
                        <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="datasearch(0);">search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <b-input-group >
                      <b-form-input placeholder="Mae" v-model="form.nomeMae" @click="datasearch(1);"></b-form-input>
                      <b-input-group-append>
                        <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="datasearch(1);">search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
              </div>
            </div>
          </b-row>
        </b-container>
      </form>
      <template #footer>
        <Button label="Salvar" @click="validate(form)" class="p-button-raised p-button-success p-button-text button" />
        <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
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
<script src="./criancas.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

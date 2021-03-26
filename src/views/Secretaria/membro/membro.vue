<template>
  <div class="membro">
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Membros</p>
          <button
            class="btn btn-outline-info"
            @click="getbyId(-100);openModal=true;">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <button
            class="btn btn-outline-info float-right"
            @click="openloading=true;imprimir('report/pessoas/membrolist.jrxml');">
            <i class="fas fa-print"></i>&nbsp;&nbsp;{{ mobileI }}
          </button>
          <button
            class="btn btn-outline-info float-right" style="margin-right: 10px;"
            @click="openFilter=true">
            <img src="../../img/filter.png">&nbsp;&nbsp;{{ mobileF }}
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid class="grid"
          :flex="[{ tamanho: 15, name: 'id' }, { tamanho: 60, name: 'nome' }, { tamanho: 50, name: 'endereco' }, { tamanho: 30, name: 'bairro' }, { tamanho: 20, name: 'numero' }, { tamanho: 20, name: 'telefone' }]"
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
    <Dialog style="font-size:10px;" header="Cadastro Membros" :visible.sync="openModal" :style="{width: resize+'vw'}" :modal="true">
      <b-container>
        <b-tabs content-class="mt-1">
          <b-tab title="Principal" active>
            <b-row class="text-center">
              <div class="col-sm-2 adonai-pad">
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
              <div class="col-sm-10 adonai-pad">
                <div class="row">
                  <div class="col-sm-6 adonai-pad">
                    <b-form-group label="Nome" label-align-sm="left">
                      <input type="text"
                      class="form-control"
                      v-model="form.nome">
                    </b-form-group>
                  </div>
                  <div class="col-sm-4 adonai-pad">
                    <b-form-group label="Data Nascimento" label-align-sm="left">
                      <datetime
                        class="datePivker"
                        type="Date"
                        value-zone="UTC"
                        format="dd/MM/yyyy"
                        v-model="form.dataNascimento">
                      </datetime>
                    </b-form-group>
                  </div>
                  <div class="col-sm-2 adonai-pad">
                    <b-form-group label="Ativo" label-align-sm="left">
                      <b-form-select
                      :options="[{ text: 'Sim', value: 0 }, { text: 'Não', value: 1 }]"
                      v-model="form.ativo"
                      ></b-form-select>
                    </b-form-group>
                  </div>
                  <div class="col-sm-4 adonai-pad">
                    <b-form-group label="CPF" label-align-sm="left">
                      <the-mask
                        type="text"
                        the-mask :mask="['###.###.###-##']"
                        v-model="form.cpf"
                        class="form-control"/>
                      </b-form-group>
                  </div>
                  <div class="col-sm-4 adonai-pad">
                    <b-form-group label="RG" label-align-sm="left">
                      <the-mask
                        type="text"
                        the-mask :mask="['#.###.###-##']"
                        v-model="form.rg"
                        class="form-control"/>
                      </b-form-group>
                  </div>
                  <div class="col-sm-4 adonai-pad">
                    <b-form-group label="Sexo" label-align-sm="left">
                      <b-form-select
                      :options="[{ text: 'Masculino', value: 0 }, { text: 'Feminina', value: 1 }]"
                      v-model="form.sexo"
                      ></b-form-select>
                    </b-form-group>
                  </div>
                </div>
              </div>
            </b-row>
            <div class="row">
              <div class="col-sm-2 adonai-pad">
                <b-form-group label="Estado Civil" label-align-sm="left">
                  <b-form-select
                  :options="[{ text: 'Selecione(...)', value: 0 }, { text: 'Solteiro(a)', value: 1 }, { text: 'Casado(a)', value: 2 }, { text: 'União Estável', value: 3 }, { text: 'Divorciado(a)', value: 4 }, { text: 'Viuvo(a)', value: 5 }]"
                  v-model="form.idEstadoCivil"
                  ></b-form-select>
                </b-form-group>
              </div>
              <div class="col-sm-4 adonai-pad">
                <div class="form-group">
                  <b-form-group label="Cargo" label-align-sm="left">
                    <b-input-group >
                      <b-form-input  v-model="form.cargo" @click="datasearch(2);"></b-form-input>
                      <b-input-group-append>
                        <b-button variant="outline-info" class="material-icons" @click="datasearch(2);">search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </div>
              </div>
              <div class="col-sm-3 adonai-pad">
                  <b-form-group label="Membro Desde" label-align-sm="left">
                    <datetime
                      class="datePivker"
                      type="Date"
                      editable= "true"
                      value-zone="UTC"
                      format="dd/MM/yyyy"
                      v-model="form.membroDesde">
                  </datetime>
                  </b-form-group>
              </div>
              <div class="col-md-3 adonai-pad">
                <b-form-group label="Data de Batismo" label-align-sm="left">
                  <datetime
                    class="datePivker"
                    type="Date"
                    editable= "true"
                    value-zone="UTC"
                    format="dd/MM/yyyy"
                    v-model="form.dataBatismo">
                </datetime>
                </b-form-group>
              </div>
              <div class="col-md-3 adonai-pad">
                <b-form-group label="Telefone Residencial" label-align-sm="left">
                  <input type="text"
                    class="form-control"
                    v-mask="'(##)####-#####'"
                    v-model="form.telefone[0].telefone">
                  </b-form-group>
              </div>
              <div class="col-md-3 adonai-pad">
                <b-form-group label="Telefone Celular" label-align-sm="left">
                  <input type="text"
                    class="form-control"
                    v-mask="'(##)####-#####'"
                    v-model="form.telefone[1].telefone">
                  </b-form-group>
              </div>
              <div v-show="false" class="col-md-4 adonai-pad">
                <input  type="text"
                  class="form-control"
                  v-mask="'(##)####-#####'"
                  v-model="form.telefone[2].telefone"
                  placeholder="Telefone Comercial">
              </div>
              <div class="col-md-6 adonai-pad">
                <b-form-group label="Email" label-align-sm="left">
                  <input type="text"
                    class="form-control"
                    v-model="form.email[0].email">
                </b-form-group>
              </div>
              <div v-show="false" class="col-md-6 adonai-pad">
                <input type="text"
                  class="form-control"
                  v-model="form.email[1].email"
                  placeholder="E-mail 2">
              </div>
            </div>
          </b-tab>
          <!-- Endereços -->
          <b-tab title="Endereços">
              <div class="row">
                <div class="col-sm-3">
                  <div class="form-group">
                    <b-input-group>
                      <b-form-input placeholder="CEP" v-mask="'#####-###'" v-model="form.endereco[0].cep" ></b-form-input>
                        <b-input-group-append >
                        <b-button variant="outline-info" class="material-icons" @click="buscarcep (form.endereco[0].cep, form, 0)">search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
                <div class="col-sm-7">
                  <div class="form-group">
                    <input type="text"
                      class="form-control"
                      v-model="form.endereco[0].endereco"
                      placeholder="Endereço Principal">
                  </div>
                </div>
                <div class="col-sm-2">
                  <div class="form-group">
                    <input type="text"
                      class="form-control"
                      v-model="form.endereco[0].numero"
                      placeholder="Numero">
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <input type="text"
                      class="form-control"
                      v-model="form.endereco[0].bairro"
                      placeholder="Bairro Principal">
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <input type="text"
                      class="form-control"
                      v-model="form.endereco[0].complemento"
                      placeholder="Complemento Principal">
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <b-input-group >
                      <b-form-input placeholder="Cidade" v-model="form.endereco[0].cidade" @click="datasearch(1, 0);"></b-form-input>
                      <b-input-group-append>
                        <b-button variant="outline-info" class="material-icons" @click="datasearch(1, 0);">search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
              <!-- Endereço Secundário -->
                <div class="col-sm-3">
                  <div class="form-group">
                    <b-input-group>
                      <b-form-input placeholder="CEP" v-mask="'#####-###'" v-model="form.endereco[1].cep"></b-form-input>
                      <b-input-group-append>
                        <b-button variant="outline-info" class="material-icons" @click="buscarcep (form.endereco[1].cep, form, 1)">search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
                <div class="col-sm-7">
                  <div class="form-group">
                    <input type="text"
                      class="form-control"
                      v-model="form.endereco[1].endereco"
                      placeholder="Endereço Outro">
                  </div>
                </div>
                <div class="col-sm-2">
                  <div class="form-group">
                    <input type="text"
                      class="form-control"
                      v-model="form.endereco[1].numero"
                      placeholder="Numero">
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <input type="text"
                      class="form-control"
                      v-model="form.endereco[1].bairro"
                      placeholder="Bairro Outro">
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <input type="text"
                      class="form-control"
                      v-model="form.endereco[1].complemento"
                      placeholder="Complemento Outro">
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <b-input-group >
                      <b-form-input placeholder="Cidade Outro" v-model="form.endereco[1].cidade" @click="datasearch(1, 1);"></b-form-input>
                      <b-input-group-append>
                        <b-button variant="outline-info" class="material-icons" @click="datasearch(1, 1);">search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
              </div>
          </b-tab>
          <b-tab title="Observações">
            <b-form-textarea
              id="textarea"
              placeholder="Observações"
              rows="15"
              v-model="form.observacoes"
              max-rows="3"
            ></b-form-textarea>
          </b-tab>
        </b-tabs>
      </b-container>
      <template #footer>
        <Button label="Salvar" @click="validar(form)" class="p-button-raised p-button-success p-button-text button" />
        <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
      </template>
    </Dialog>
    <!-- modal Filtros-->
    <Dialog style="font-size:10px;" header="Filtros" :visible.sync="openFilter" :style="{width: '25vw'}" :modal="true">
      <form method="POST">
        <b-container>
          <b-row class="text-center">
            <b-col cols="12">
              <div class="row">
                <div class="col-sm-12" style="padding:3px;">
                  <b-form-group label="Cargo" label-align-sm="left">
                    <b-input-group>
                      <b-form-input
                      v-model="filters.cargo"
                      ></b-form-input>
                        <b-input-group-append >
                        <b-button variant="outline-info" class="material-icons"  @click="datasearch (2);" >search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </form>
      <template #footer>
        <Button label="Cancelar"  @click="openFilter=false" class="p-button-raised p-button-success p-button-text button"/>
        <Button label="Filtrar" @click="filter(filters)" class="p-button-raised p-button-success p-button-text button" />
      </template>
    </Dialog>
    <Dialog :visible.sync="mapsModal" :style="{width: '450px'}" header="Confirmar" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span >A T E N Ç Ã O os dados de endereço estão incompletos<br>se continuar o membro NÃO irá aparecer no mapa
          <br> deseja realmente continuar?</span>
      </div>
      <template #footer>
          <Button label="Não" icon="pi pi-times" class="p-button-text" @click="mapsModal=false"/>
          <Button label="Sim" icon="pi pi-check" class="p-button-text" @click="mapsModal=false;save(form);deleteModal = false" />
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
<script src="./membro.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

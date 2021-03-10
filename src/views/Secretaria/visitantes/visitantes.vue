<template>
  <div class="visitantes">
    <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Visitantes</p>
          <button
            class="btn btn-outline-info"
            @click="getbyId(-100)">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <button
            class="btn btn-outline-info float-right"
            @click="imprimir('report/pessoas/visitanteslist.jrxml')">
            <i class="fas fa-print"></i>&nbsp;&nbsp;Imprimir
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid class="grid"
          :flex="[{ tamanho: 15, name: 'id' }, { tamanho: 60, name: 'nome' }, { tamanho: 50, name: 'endereco' }, { tamanho: 30, name: 'bairro' }, { tamanho: 20, name: 'numero' }, { tamanho: 20, name: 'telefone' }]"
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
    <Dialog style="font-size:10px;" header="Cadastro Visitantes" :visible.sync="openModal" :style="{width: resize+'vw'}" :modal="true">
      <b-container>
        <div class="row">
          <div class="col-sm-6 adonai-pad">
            <b-form-group label="Nome Completo" label-align-sm="left">
              <input type="text"
              v-model="form.nome"
              class="form-control">
            </b-form-group>
          </div>
          <div class="col-sm-3 adonai-pad">
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
          <div class="col-sm-3 adonai-pad">
            <b-form-group label="Sexo" label-align-sm="left">
              <b-form-select
              :options="[{ text: 'Masculino', value: 0 }, { text: 'Feminina', value: 1 }]"
              v-model="form.sexo"
              ></b-form-select>
            </b-form-group>
          </div>
          <div class="col-sm-3 adonai-pad">
            <b-form-group label="Telefone Residencial" label-align-sm="left">
              <input type="text"
                class="form-control"
                v-mask="'(##)#####-####'"
                v-model="form.telefone[0].telefone">
            </b-form-group>
          </div>
          <div class="col-sm-3 adonai-pad">
            <b-form-group label="Telefone Celular" label-align-sm="left">
              <input type="text"
                class="form-control"
                v-mask="'(##)#####-####'"
                v-model="form.telefone[1].telefone">
              </b-form-group>
          </div>
          <div class="col-sm-6 adonai-pad">
            <b-form-group label="Email" label-align-sm="left">
              <input type="text"
                class="form-control"
                v-model="form.email[0].email">
            </b-form-group>
          </div>
          <div class="col-sm-3 adonai-pad">
            <b-form-group label="CEP" label-align-sm="left">
              <div class="form-group">
                <b-input-group>
                  <b-form-input
                  v-model="form.endereco[0].cep"
                  v-mask="'#####-###'"
                    ></b-form-input>
                    <b-input-group-append >
                    <b-button variant="outline-info" class="material-icons" @click="buscarcep (form.endereco[0].cep, form, 1)">search</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </b-form-group>
          </div>
          <div class="col-sm-7 adonai-pad">
            <b-form-group label="Endereço" label-align-sm="left">
              <div class="form-group">
                <input type="text"
                  class="form-control"
                  v-model="form.endereco[0].endereco">
              </div>
            </b-form-group>
          </div>
          <div class="col-sm-2 adonai-pad">
            <b-form-group label="Numero" label-align-sm="left">
              <div class="form-group">
                <input type="text"
                  class="form-control"
                  v-model="form.endereco[0].numero">
              </div>
            </b-form-group>
          </div>
          <div class="col-sm-4 adonai-pad">
            <b-form-group label="Numero" label-align-sm="left">
              <div class="form-group">
                <input type="text"
                  class="form-control"
                  v-model="form.endereco[0].bairro">
              </div>
            </b-form-group>
          </div>
          <div class="col-sm-4 adonai-pad">
            <b-form-group label="Complemento" label-align-sm="left">
              <div class="form-group">
                <input type="text"
                  class="form-control"
                  v-model="form.endereco[0].complemento">
              </div>
            </b-form-group>
          </div>
          <div class="col-sm-4 adonai-pad">
            <b-form-group label="Cidade" label-align-sm="left">
              <div class="form-group">
                <b-input-group >
                  <b-form-input v-model="form.endereco[0].cidade" @click="datasearch(1, 1);"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="outline-info" class="material-icons" @click="datasearch(1, 1);">search</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </b-form-group>
          </div>
          <div class="col-sm-12 adonai-pad">
            <b-form-group label="Observações" label-align-sm="left">
              <b-form-textarea
                rows="3"
                v-model="form.observacoes"
                max-rows="3"
              ></b-form-textarea>
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

<script src="./visitantes.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

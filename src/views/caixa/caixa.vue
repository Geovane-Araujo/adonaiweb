<template>
  <div class="caixas">
     <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Caixas</p>
          <button
            class="btn btn-outline-info "
            @click="getusers();form.del=false;form.add=true;form.edit=false;openModal=true;">
            <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12">
          <!-- table -->
          <adonaigrid :titulos="['ID','Descricao']"
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

    <!-- modal para cadastro-->
    <div id="overlay" v-if=openModal>
        <div class="modal-dialog modal-dialog-centered modal-md ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Cadastro de Caixas</h5>
              <button type="button" class="close"  @click="cleanForm(form); openModal=false;">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form method="POST">
                <b-container>
                  <b-tabs class="mt-1">
                    <b-tab title="Caixa">
                      <b-row class="text-center">
                        <b-col cols="12">
                          <div class="row">
                            <div class="col-sm-12">
                              <input type="text"
                              class="form-control"
                              placeholder="Descricao"
                              v-model="form.descricao">
                            </div>
                            <div class="col-sm-12">
                              <b-input-group>
                                <b-form-input placeholder="Conta Padrão"
                                v-bind:disabled="(form.status == 0)"
                                v-model="form.nome"
                                ></b-form-input>
                                  <b-input-group-append >
                                  <b-button variant="outline-info" class="material-icons" @click="datasearch (1);" >search</b-button>
                                </b-input-group-append>
                              </b-input-group>
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                    </b-tab>
                    <b-tab title="Usuarios Permitidos">
                      <b-row class="text-center">
                        <b-col cols="12">
                          <div class="row">
                            <div class="col-sm-12">
                              <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
                                <thead>
                                  <tr class="text-left text-light" style="background-color: #5e8a75">
                                    <th>ID</th>
                                    <th>Usuario</th>
                                    <th>Permite</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr class="text-left" v-for="users in form.usuariospermissoes" :key="users.id">
                                    <td>{{ users.idsuario }}</td>
                                    <td>{{ users.nome }}</td>
                                    <td class="text-center" >
                                      <input class="form-check-input"
                                      type="checkbox"
                                      checked="1"
                                      unchecked="0"
                                      :value="users.permissao"
                                      :id="user.idusuario"
                                      v-model="users.permissao">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                    </b-tab>
                  </b-tabs>
                </b-container>
              </form>
              <button type="button" class="btn btn-outline-info float-right" style="margin-left:5px;" @click="validate(form, 0)">Salvar</button>
            </div>
          </div>
        </div>
    </div>
    <adonaidatasearch
    :title="ds.title"
    :cabecalho="ds.grid"
    :form="form" v-bind:openDatasearch="open"
    :destroy="destroy"
    ref="cmp"/>
  </div>
</template>

<script src="./caixa.js">
</script>
<style lang=scss scoped>
p {
  font-size: 30px;
}
.table-sm {
  padding: 2px;
}
.caixas {
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba($color: #ffffff, $alpha: 0.9);
  margin: 5px;
  overflow:auto;
}
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1000;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
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

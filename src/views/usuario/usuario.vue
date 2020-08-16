<template>
  <div class="usuario">
    <loader v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Usuários</p>
          <button class="btn btn-outline-info" @click="openModal=true">
            <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12">
          <!-- table -->
          <adonaigrid :titulos="['ID','Nome']"
          :registros="usuarios"
          :form="form"
          :getbyId="getbyId"
          :save="save"
          :explorer="explorer"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>

    <!-- Tela cadastro -->
    <div id="overlay" v-if="openModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastro Usuario</h5>
            <button type="button" class="close"  @click="openModal=false;clean (form);">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <form method="POST">
              <div>
                <div class="form-group">
                  <input type="text"
                    name="nome"
                    autocomplete="off"
                    class="form-control"
                    placeholder="NomeUsuario / Login "
                    v-model="form.login ">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <input type="password"
                      name="senha"
                      autocomplete="off"
                      class="form-control"
                      placeholder="Senha"
                      v-model="form.senha">
                  </div>
                  <div class="col">
                    <input type="password"
                      name="confirmarsenha"
                      autocomplete="off"
                      class="form-control"
                      placeholder="Confirmar Senha"
                      v-model="form.confirmarSenha">
                  </div>
                </div>
                <h6 class="text-danger">Permissões:</h6>
                <div class="form-check-inline">
                  <b-form-checkbox
                    id="checkbox-1"
                    v-model="form.permissaoUsuario.membro"
                    value="1"
                    unchecked-value="0"
                    >Membros
                  </b-form-checkbox>
                </div>
                <span class="form-check-inline">
                  <b-form-checkbox
                    id="checkbox-2"
                    v-model="form.permissaoUsuario.despesas"
                    value="1"
                    unchecked-value="0"
                    >Despesas
                  </b-form-checkbox>
                </span>
                <span class="form-check-inline">
                   <b-form-checkbox
                    id="checkbox-3"
                    v-model="form.permissaoUsuario.multiIgreja"
                    value="1"
                    unchecked-value="0"
                    >Multi-Igreja
                  </b-form-checkbox>
                </span>
                <p></p>
                <div class="form-check-inline">
                  <b-form-checkbox
                    id="checkbox-4"
                    v-model="form.permissaoUsuario.relatorios"
                    value="1"
                    unchecked-value="0"
                    >Relatórios
                  </b-form-checkbox>
                </div>
                <div class="form-check-inline">
                  <b-form-checkbox
                    id="checkbox-5"
                    v-model="form.permissaoUsuario.usuarios"
                    value="1"
                    unchecked-value="0"
                    >Usuários
                  </b-form-checkbox>
                </div>
                <div class="form-check-inline">
                  <b-form-checkbox
                    id="checkbox-6"
                    v-model="form.permissaoUsuario.caixa"
                    value="1"
                    unchecked-value="0"
                    >Caixas
                  </b-form-checkbox>
                </div>
                <div class="form-check-inline">
                  <b-form-checkbox
                    id="checkbox-7"
                    v-model="form.permissaoUsuario.entradas"
                    value="1"
                    unchecked-value="0"
                    >Entradas
                  </b-form-checkbox>
                </div>
              </div>
            </form>
            <button class="btn btn-outline-info float-right" @click="validate(form)" >Salvar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="./routes.js">
</script>
<style lang="scss" scoped>
.table-overflow {
    max-height:90vh;
    overflow-y:auto;
}
p {
  font-size: 30px;
}
.usuario {
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

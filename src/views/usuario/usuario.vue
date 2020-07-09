<template>
  <div class="usuario">
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Cadastro de Usuários</p>
        </div>
      </div>
      <div class="tre">
        <button class="btn btn-outline-info" @click="openModal=true">
          <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
        </button>
      </div>
      <hr class="bg-info" >
      <div class="row">
        <div class="col-lg-12">
          <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
            <thead>
              <tr class="text-left bg-info txt-light" style="height: 10px;">
                <th>ID</th>
                <th>Nome</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left" v-for="item in usuario" :key="item.id">
                <td >{{ item.id }}</td>
                <td>{{ item.login }}</td>
                <td>
                  <a href="#" @click="openModal =true;form.id = item.id; form.edit=true;form.add=false;povoar(item); " class="text-success"><i class="fas fa-edit"></i></a>
                  &nbsp;
                  <a href="#" @click="deleteModal=true; form.id = item.id; form.edit=false;form.add=false; form.del = true" class="text-danger"><i class="far fa-trash-alt"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Tela cadastro -->
    <div id="overlay" v-if="openModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastro Usuario</h5>
            <button type="button" class="close"  @click="openModal=false;limparCampos (form)">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="submit()">
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
              <div class="form-group">
                <button class="btn btn-outline-info float-right" >Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Tela excluir -->
    <div id="overlay" v-if="deleteModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close"  @click="deleteModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <h5 class="text-danger">Deseja realmente Excluir ?</h5>
            <button class="btn btn-outline-danger" @click="submit(); deleteModal=false;" >Sim</button>
            <button class="btn btn-outline-success float-right" @click="deleteModal=false">Não</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./usuario.js">
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
  padding: 1px;
  max-height:89vh;
  overflow-y:auto;
}
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
</style>

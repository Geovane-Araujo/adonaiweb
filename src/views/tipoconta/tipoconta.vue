<template>
  <div class="tipoconta">
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Cadastro de Tipo Contas</p>
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
                <th>Descricao</th>
                <th>Contexto</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left" v-for="item in tipoconta" :key="item.id">
                <td >{{ item.id }}</td>
                <td>{{ item.descricao }}</td>
                <td>{{ alterar(item.contexto) }}</td>
                <td>
                  <a href="#" @click="openModal =true; form.id = item.id; form.descricao = item.descricao; form.contexto = item.contexto;  form.edit=true;form.add=false " class="text-success"><i class="fas fa-edit"></i></a>
                  &nbsp;
                  <a href="#" @click="deleteModal=true; form.id = item.id; form.edit=false;form.add=false; form.del = true" class="text-danger"><i class="far fa-trash-alt"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div id="overlay" v-if="openModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastro Tipo Conta</h5>
            <button type="button" class="close"  @click="openModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submit()">
              <div class="col-sm-12">
                <input type="text"
                name="descricao"
                autocomplete="off"
                class="form-control"
                placeholder="Descricao"
                v-model="form.descricao">
              </div>
              <div class="col-sm-12">
                <b-form-select
                :options="[{ text: 'Receitas', value: 0 }, {text: 'Despesas', value: 1}]"
                v-model="form.contexto"
                ></b-form-select>
              </div>
              <div class="form-group">
                <button class="btn btn-outline-info float-right" >Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- modal excluir -->
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

<script src="./tipoconta.js">
</script>
<style lang="scss" scoped>
.table-overflow {
    max-height:90vh;
    overflow-y:auto;
}
p {
  font-size: 30px;
}
.tipoconta {
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

<template>
  <div class="membro">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Contas Bancárias</p>
          <button
            class="btn btn-outline-info"
            @click="form.del=false;form.add=true;form.edit=false;openModal=true;">
            <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12">
          <table class="table table-botdered table-striped table-sm table-hover table-fixed">
            <thead  style="max-height:10vh; overflow-y:auto;">
              <tr class="text-left bg-info txt-light style=height: 10px;">
                <th>ID</th>
                <th>Descricao</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left" v-for="item in contasbancarias" :key="item.id">
                <td >{{ item.id }}</td>
                <td>{{ item.descricao }}</td>
                <td>
                  <a href="#" @click="getConta (item.id);  form.edit= true;form.del=false;form.add=false;"  class="text-success"><i class="fas fa-edit"></i></a>
                  &nbsp;
                  <a href="#" @click="deleteModal=true; form.id = item.id; form.edit=false;form.add=false; form.del = true" class="text-danger"><i class="far fa-trash-alt"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-sm-5">
          <b-input-group >
              <button class="btn btn-outline-info" @click="pagina = pagina - 1;b (pagina)"><i class="fas fa-caret-left"></i></button>
              <b-form-input v-model="pagina" class="col-sm-1 text-center"></b-form-input>
              <button class="btn btn-outline-info"  @click="pagina = pagina + 1;b (pagina)"><i class="fas fa-caret-right"></i></button>
              <b-form-input placeholder="buscar"  style="margin-left:10px" class="col-sm-5"></b-form-input>
              <b-button variant="outline-info" class="material-icons">search</b-button>
          </b-input-group>
        </div>
      </div>
    </div>

    <!-- modal para cadastro-->
    <div id="overlay" v-if=openModal>
        <div class="modal-dialog modal-dialog-centered modal-md ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Cadastro de Contas Bancárias</h5>
              <button type="button" class="close"  @click="cleanForm(form); openModal=false;">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form method="POST">
                <b-container>
                  <b-row>
                      <div class="col-sm-12">
                        <input type="text"
                        class="form-control"
                        v-model="form.descricao"
                        placeholder="Descricao">
                      </div>
                      <div class="col-sm-6">
                        <input type="text"
                        class="form-control"
                        v-model="form.agencia"
                        placeholder="Agencia">
                      </div>
                      <div class="col-sm-6">
                        <input type="text"
                        class="form-control"
                        v-model="form.conta"
                        placeholder="Conta">
                      </div>
                      <div class="col-sm-12">
                        <div class="form-group">
                          <b-input-group >
                            <b-form-input placeholder="Banco" v-model="form.nomeBanco" @click="buscarBanco(pagina);openBanco=true;"></b-form-input>
                            <b-input-group-append>
                              <b-button variant="outline-info" class="material-icons" @click="buscarBanco(pagina);openBanco=true;">search</b-button>
                            </b-input-group-append>
                          </b-input-group>
                        </div>
                      </div>
                  </b-row>
                </b-container>
              </form>
              <button type="button" class="btn btn-outline-info float-right" @click="validate(form)">Salvar</button>
            </div>
          </div>
        </div>
    </div>
    <!-- modal excluir -->
    <div id="overlay" v-if=deleteModal>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-danger">Deseja realmente Excluir ?</h5>
            <button type="button" class="close"  @click="deleteModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <button class="btn btn-outline-danger" @click="save (form);deleteModal=false;" >Sim</button>
            <button class="btn btn-outline-success float-right" @click="deleteModal=false">Não</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal para seleção da Bancos-->
    <div class="cargodts">
      <div id="overlay" v-if=openBanco>
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h6>Selecione o Cargo</h6>
              <button type="button" class="close"  @click="openBanco=false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <b-form-input class="mr-sm-2" placeholder="Buscar" v-model="form.nomeBanco" @keyup.enter="buscarBanco(pagina)"></b-form-input>
              <br>
              <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
                <thead>
                  <tr class="text-left bg-info txt-light" style="height: 10px;">
                    <th>ID</th>
                    <th>Nome</th>
                    <th>UF</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody style="overflow-y: scroll;height: 150px;">
                  <tr class="text-left" v-for="bank in bancos" :key="bank.id">
                    <td >{{ bank.id }}</td>
                    <td>{{ bank.nome }}</td>
                    <td>
                      <a href="#" class="text-success" @click="form.nomeBanco=bank.nome;form.idbanco=bank.id;openBanco=false;"><i class="far fa-check-square"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="row">
                <b-input-group >
                  <b-input-group-append>
                    <b-button variant="outline-info" style="margin-left:10px;" class="material-icons" @click="pagina = pagina - 1;buscarBanco(pagina)">chevron_left</b-button>
                  </b-input-group-append>
                  <b-form-input v-model="pagina" class="col-sm-1 text-center"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="pagina = pagina + 1;buscarBanco(pagina)">chevron_right</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./contas.js">
</script>
<style lang=scss scoped>
.table-overflow {
    max-height:90vh;
    overflow-y:auto;
}
label {
  background-color: #3498db;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin: 10px;
  padding: 6px 20px
}
p {
  font-size: 30px;
}
input[type='file'] {
  display: none
}
.table-sm {
  padding: 2px;
}
.membro {
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

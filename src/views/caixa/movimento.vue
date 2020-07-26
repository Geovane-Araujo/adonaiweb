<template>
  <div class="movimento">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Movimentações dos Caixas</p>
          <button
            class="btn btn-outline-info"
            @click="form.del=false;form.add=true;form.edit=false;openModal=true;">
            <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-sm-12">
          <!-- table -->
          <table class="table table-botdered table-striped table-sm table-hover table-fixed">
            <thead  style="max-height:10vh; overflow-y:auto;">
              <tr class="text-left text-light text-light" style="background-color: #5e8a75">
                <th>ID</th>
                <th>Caixa</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left" v-for="registro in caixamovimento" :key="registro.id">
                <td>{{ registro.id }}</td>
                <td>{{ registro.descricao }}</td>
                <td>
                  <a style="margin-right: 15px;" @click="getbyId(registro.id); form.edit=true;form.add=false" class="text-success"><i class="fas fa-edit"></i></a>
                  &nbsp;&nbsp;&nbsp;
                  <a style="margin-right: 15px;" @click="form.id=registro.id; form.edit=false;form.add=false;form.del=true; deleteModal=true" class="text-danger"><i class="far fa-trash-alt"></i></a>
                  &nbsp;&nbsp;
                  <a @click="form.id=registro.id; form.edit=false;form.add=false;form.del=true; deleteModal=true" class="text-info"><i class="far fa-eye"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="row">
            <div class="col-sm-2">
              <h6 class="text-info">Saldo Inicial</h6>
              <money type="text"
                class="form-control text-info"
                v-bind="currency"
                disabled=""
                v-model="form.saldoInicial"/>
            </div>
            <div class="col-sm-2">
              <h6 class="text-success">Entradas</h6>
              <money type="text"
                class="form-control text-success "
                v-bind="currency"
                disabled=""
                v-model="form.receitas"/>
            </div>
            <div class="col-sm-2">
              <h6 class="text-danger">Despesas</h6>
              <money type="text"
                class="form-control text-danger"
                v-bind="currency"
                disabled=""
                v-model="form.despesas"/>
            </div>
            <div class="col-sm-2">
              <h6 class="text-info">Saldo Total</h6>
              <money type="text"
                class="form-control text-info"
                v-bind="currency"
                disabled=""
                v-model="form.despesas"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal para cadastro-->
    <div id="overlay" v-if=openModal>
        <div class="modal-dialog modal-dialog-centered modal-lg ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Lançamento de Despesa</h5>
              <button type="button" class="close"  @click="cleanForm(form); openModal=false;">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form method="POST">
                <b-container>
                  <b-row class="text-center">
                    <b-col cols="12">
                      <div class="row">
                      </div>
                    </b-col>
                  </b-row>
                </b-container>
              </form>
              <button type="button" id="estornar" class="btn btn-outline-info float-left" style="margin-left:10px;" v-bind:disabled="(form.status == 1)" @click="validate(form, 2)">Estornar</button>
              <button type="button" class="btn btn-outline-info float-right" style="margin-left:10px;" v-bind:disabled="(form.status == 0)" @click="validate(form, 1)">Lançar e Quitar</button>
              <button type="button" class="btn btn-outline-info float-right" style="margin-left:5px;" v-bind:disabled="(form.status == 0)" @click="validate(form, 0)">Lançar</button>
            </div>
          </div>
        </div>
    </div>
    <adonaidatasearch
    :title="ds.title"
    :cabecalho="ds.grid"
    :form="form" v-bind:openDatasearch="open"
    :destroy="destroy"
    ref="teste"/>
  </div>
</template>

<script src="./movimento.js">
</script>
<style lang=scss scoped>
label {
  background-color: #3498db;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin: 10px;
  padding: 6px 20px;
}
p {
  font-size: 30px;
}
.table-sm {
  padding: 2px;
}
.movimento {
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

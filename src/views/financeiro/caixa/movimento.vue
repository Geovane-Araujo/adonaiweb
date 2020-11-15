<template>
  <div>
   <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Movimentações dos Caixas</p>
          <button
            class="btn btn-outline-info"
            @click="form.del=false;form.add=true;form.edit=false; fechamento=false; abertura=true; title='Abertura de Caixa'; openModal=true; ">
            <i class="fas fa-lock-open"></i>&nbsp;&nbsp;Abrir Caixa
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-sm-12" style="margin-top: -30px;">
          <!-- table -->
          <table class="table table-botdered table-striped table-sm table-hover table-fixed">
            <thead  style="max-height:10vh; overflow-y:auto;">
              <tr class="text-left text-light" style="background-color: #5e8a75">
                <th>ID</th>
                <th>Caixa</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left" v-for="registro in caixamovimento" :key="registro.id">
                <td>{{ registro.ID }}</td>
                <td>{{ registro.Descricao }}</td>
                <td>
                  <a style="margin-right: 15px;" id="link1" @click="getSaldos (registro.ID, 0);" class="text-success"><i class="fas fa-info"></i></a>
                  <b-tooltip target="link1" title="Detalhar Entradas e Saídas"></b-tooltip>
                  &nbsp;&nbsp;&nbsp;
                  <a  style="margin-right: 15px;" id="link2" @click="getSaldos (registro.ID, 1)" class="text-info"><i class="far fa-eye"></i></a>
                  <b-tooltip target="link2" title="Mostrar Saldo"></b-tooltip>
                  &nbsp;&nbsp;&nbsp;
                  <a style="margin-right: 0px;" id="link3" @click="form.id=registro.ID; form.edit=true;form.add=false; fechamento=true; abertura=false;title='Fechamento de Caixa'; openModal=true; " class="text-danger"><i class="fas fa-lock"></i></a>
                  <b-tooltip target="link3" title="Fechar Caixa"></b-tooltip>
                </td>
              </tr>
            </tbody>
          </table>
          <footer class="footer">
            <div class="row">
              <div class="col-sm-2">
                <h6 class="text-info">Saldo Inicial</h6>
                <money type="text"
                  class="form-control text-info"
                  v-bind="currency"
                  disabled=""
                  v-model="saldos.saldoinicial"/>
              </div>
              <div class="col-sm-2">
                <h6 class="text-success">Entradas</h6>
                <money type="text"
                  class="form-control text-success "
                  v-bind="currency"
                  disabled=""
                  v-model="saldos.receitas"/>
              </div>
              <div class="col-sm-2">
                <h6 class="text-danger">Despesas</h6>
                <money type="text"
                  class="form-control text-danger"
                  v-bind="currency"
                  disabled=""
                  v-model="saldos.despesas"/>
              </div>
              <div class="col-sm-2">
                <h6 class="text-info">Saldo Total</h6>
                <money type="text"
                  class="form-control text-info"
                  v-bind="currency"
                  disabled=""
                  v-model="saldos.saldototal"/>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>

    <!-- modal para cadastro-->
    <div id="overlay" v-if=openModal>
        <div class="modal-dialog modal-dialog-centered modal-md ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ title }}</h5>
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
                        <div v-show="abertura" class="col-sm-12">
                          <b-input-group>
                            <b-form-input placeholder="Caixa"
                            v-model="form.descricao"
                            ></b-form-input>
                              <b-input-group-append >
                              <b-button variant="outline-info" class="material-icons" @click="datasearch (1);" >search</b-button>
                            </b-input-group-append>
                          </b-input-group>
                        </div>
                        <div v-show="abertura" class="col-sm-12">
                          <money  type="text"
                          class="form-control"
                          v-bind="currency"
                          placeholder="Saldo Inicial"
                          v-model="form.saldoInicial"/>
                        </div>
                        <div v-show="fechamento" class="col-sm-12">
                          <money  type="text"
                          class="form-control"
                          v-bind="currency"
                          placeholder="Valor Conferido"
                          v-model="form.conferido"/>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-container>
              </form>
              <button type="button" class="btn btn-outline-info float-right" style="margin-left:5px;" @click="validate(form)">Salvar</button>
            </div>
          </div>
        </div>
    </div>
    <!-- modal para cadastro-->
    <div id="overlay" v-if=openDetail>
        <div class="modal-dialog modal-dialog-centered modal-md ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Detalhes</h5>
              <button type="button" class="close"  @click="cleanForm(form); openDetail=false;">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form method="POST">
                <b-container>
                  <b-row class="text-center">
                    <b-col cols="12">
                      <div class="row">
                        <div class="col-sm-12">
                          <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
                            <thead>
                              <tr class="text-left text-light" style="background-color: #5e8a75">
                                <th>Tipo</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr class="text-left" v-for="detail in saldos.detalhes" :key="detail.tipo">
                                <td>{{ detail.tipo }}</td>
                                <td>{{ detail.valor }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-container>
              </form>
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
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
tr {
  line-height: 14px;
  font-size: 13px;
}
button {
  color: #5e8a75;
  border-color:#5e8a75;
}
button:hover {
  background-color: #5e8a75;
  border-color:#5e8a75;
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
footer {
    position: fixed;
    bottom:10px;
}
.footer {
  box-shadow:2px rgba(0, 0, 0, 0.25);
}
</style>

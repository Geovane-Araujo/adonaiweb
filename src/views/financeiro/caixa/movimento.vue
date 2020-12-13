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
          <DataTable
          class="p-datatable-sm"
          scrollHeight="400px"
          :scrollable="true"
          style="font-size:14px;"
          :value="caixamovimento"
          :paginator="false"
          :selection.sync="select"
          paginatorTemplate=""
          selectionMode="single" dataKey="ID"
          @row-select="onRowSelect"
          :resizableColumns="true"
          columnResizeMode="fit">
            <Column headerStyle="width: 30px;" field="ID" header="ID"></Column>
            <Column field="Descricao" header="Descricao"></Column>
            <Column headerStyle="width: 200px;" bodyStyle=""  :exportable="false">
              <template #body="slotProps">
                  <Button icon="fas fa-info" style="margin-left:10px;" class="p-button-rounded p-button-outlined p-button-success p-button-sm" @click="getSaldos (slotProps.data.ID, 0);" />
                  <Button icon="far fa-eye" class="p-button-rounded p-button-outlined p-button-info p-button-sm" @click="getSaldos (slotProps.data.ID, 1)" />
                  <Button icon="fas fa-lock" class="p-button-rounded p-button-outlined p-button-danger p-button-sm" @click="form.id=slotProps.data.ID; form.edit=true;form.add=false; fechamento=true; abertura=false;title='Fechamento de Caixa'; openModal=true;" />
              </template>
            </Column>
          </DataTable>
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

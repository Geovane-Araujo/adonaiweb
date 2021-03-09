<template>
  <div>
   <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Movimentações dos Caixas</p>
          <button
            class="btn btn-outline-info"
            @click="openCashier()">
            <i class="fas fa-lock-open"></i>&nbsp;&nbsp;Abrir Caixa
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-sm-12 grid" style="margin-top: -30px;">
          <DataTable
          class="p-datatable-sm"
          scrollHeight="400px"
          :scrollable="true"
          style="font-size:14px;"
          :value="caixamovimento"
          :paginator="false"
          paginatorTemplate=""
          selectionMode="single" dataKey="ID"
          @row-select="onRowSelect"
          :resizableColumns="true"
          columnResizeMode="fit">
            <Column headerStyle="width: 30px;" field="ID" header="ID"></Column>
            <Column field="Descricao" header="Descricao"></Column>
            <Column headerStyle="width: 200px;" bodyStyle=""  :exportable="false">
              <template #body="slotProps">
                  <Button icon="pi pi-eye" class="p-button-rounded p-button-outlined p-button-info p-button-sm" @click="getSaldos (slotProps.data.ID, 1)" />
                  <Button icon="pi pi-lock" class="p-button-rounded p-button-outlined p-button-danger p-button-sm" @click="closeCashier(slotProps.data)" />
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
    <Dialog style="font-size:10px;" header="Abertura de Caixa" :visible.sync="openModalAbertura" :style="{width: resizeAbertura+'vw'}" :modal="true">
      <form method="POST">
        <b-container>
          <b-row class="text-center">
            <b-col cols="12">
              <div class="row">
                <div v-show="abertura" class="col-sm-3">
                  <b-form-group label="Data Abertura" label-align-sm="left">
                    <datetime
                      class="datePivker"
                      v-bind:disabled="(true)"
                      type="Date"
                      value-zone="UTC"
                      format="dd/MM/yyyy"
                      v-model="form.dataAbertura">
                    </datetime>
                  </b-form-group>
                </div>
                <div v-show="abertura" class="col-sm-9">
                  <b-form-group label="Caixa" label-align="left">
                    <b-input-group>
                      <b-form-input placeholder="Caixa"
                      v-model="form.descricao"
                      ></b-form-input>
                        <b-input-group-append >
                        <b-button variant="outline-info" class="material-icons" @click="datasearch (1);" >search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </div>
                <div v-show="abertura" class="col-sm-6">
                  <b-form-group label="Saldo Anterior" label-align="left">
                    <money  type="text"
                      class="form-control"
                      v-bind="currency"
                      v-bind:disabled="true"
                      placeholder="Saldo Anterior"
                      v-model="saldoAnterior"/>
                  </b-form-group>
                </div>
                <div v-show="abertura" class="col-sm-6">
                  <b-form-group label="Saldo Inicial" label-align="left">
                    <money  type="text"
                    class="form-control"
                    v-bind="currency"
                    placeholder="Saldo Inicial"
                    v-model="form.saldoInicial"/>
                  </b-form-group>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </form>
      <template #footer>
          <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
          <Button label="Salvar" @click="validate(form);" class="p-button-raised p-button-success p-button-text button" />
      </template>
    </Dialog>

    <Dialog style="font-size:10px;" header="Fechamento de Caixa" :visible.sync="openModalFechamento" :style="{width: resizeFechamento+'vw'}" :modal="true">
      <form method="POST">
        <b-container>
          <b-row class="text-center">
            <b-col cols="12">
              <div class="row">
                <div class="col-sm-3">
                  <b-form-group label="Data Abertura" label-align-sm="left">
                    <datetime
                      class="datePivker"
                      v-bind:disabled="(true)"
                      type="Date"
                      value-zone="UTC"
                      format="dd/MM/yyyy"
                      v-model="form.dataFechamento">
                    </datetime>
                  </b-form-group>
                </div>
                <div class="col-sm-9">
                  <b-form-group label="Caixa" label-align="left">
                    <b-input-group v-bind:disabled="true">
                      <b-form-input v-bind:disabled="true" placeholder="Caixa" v-model="form.descricao"
                      ></b-form-input>
                        <b-input-group-append >
                        <b-button v-bind:disabled="true" variant="outline-info" class="material-icons" @click="datasearch (1);" >search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </div>
                <div class="col-sm-12">
                  <b-form-group label="Valor das Movimentações por tipo" label-align="left">
                    <DataTable :value="movimentacoes.movimento" :scrollable="true" scrollHeight="200px" :loading="loading">
                      <Column headerStyle="width: 30vw;" field="descricao" header="descricao"></Column>
                      <Column field="valor" header="valor"></Column>
                      <Column field="tipo" header="tipo"></Column>
                    </DataTable>
                  </b-form-group>
                </div>
                <div class="col-sm-12">
                    <div class="row">
                    <div class="col-sm-3">
                      <b-form-group label="Saldo Inicial" label-align="left" class="text-info">
                        <money type="text"
                          class="form-control text-info"
                          v-bind="currency"
                          disabled=""
                          v-model="movimentacoes.saldos.saldoinicial"/>
                        </b-form-group>
                    </div>
                    <div class="col-sm-3">
                      <b-form-group label="Receitas" label-align="left" class="text-success">
                        <money type="text"
                          class="form-control text-success "
                          v-bind="currency"
                          disabled=""
                          v-model="movimentacoes.saldos.receitas"/>
                        </b-form-group>
                    </div>
                    <div class="col-sm-3">
                      <b-form-group label="Despesas" label-align="left" class="text-danger">
                        <money type="text"
                          class="form-control text-danger"
                          v-bind="currency"
                          disabled=""
                          v-model="movimentacoes.saldos.despesas"/>
                      </b-form-group>
                    </div>
                    <div class="col-sm-3">
                      <b-form-group label="Saldo Total" label-align="left" class="text-info">
                        <money type="text"
                        class="form-control text-info"
                        v-bind="currency"
                        disabled=""
                        v-model="movimentacoes.saldos.saldototal"/>
                      </b-form-group>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </form>
      <template #footer>
          <Button label="Cancelar"  @click="openModalFechamento=false" class="p-button-raised p-button-success p-button-text button"/>
          <Button label="Fechar Caixa" @click="validate(form);" class="p-button-raised p-button-success p-button-text button" />
      </template>
    </Dialog>

    <adonaidatasearch
    :title="ds.title"
    :cabecalho="ds.grid"
    :form="form"
    :destroy="destroy"
    ref="teste"/>
  </div>
</template>

<script src="./movimento.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

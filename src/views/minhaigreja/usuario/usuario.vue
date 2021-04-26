<template>
  <div >
    <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Usuários</p>
          <button class="btn btn-outline-info" @click="getbyId(-100)">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid class="grid"
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 200, name: 'nome' }]"
          :registros="usuarios"
          :form="form"
          :getbyId="getbyId"
          :save="save"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>
        <Dialog style="font-size:10px;" header="Cadastro de Usuários" :visible.sync="openModal" :style="{width: resize+'vw'}" :modal="true">
          <form method="POST">
            <b-container>
              <b-tabs class="mt-1">
                <b-tab title="Principal">
                  <b-row class="text-center">
                    <div class="col-sm-2">
                      <div class="file-loading">
                        <b-avatar :src="form.pathimg" size="5rem"></b-avatar>
                        <div>
                          <label for='selecao-arquivo' class="material-icons">perm_media</label>
                          <input id='selecao-arquivo'  @change="getImg"  accept="image/*" type='file'>
                          <label class="material-icons label2" @click="form.foto='';img=''" >delete_forever</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-10">
                      <div class="row">
                        <div class="col-sm-6">
                          <input type="text"
                            name="nome"
                            autocomplete="off"
                            class="form-control"
                            placeholder="Nome"
                            v-model="form.nome">
                        </div>
                        <div class="col-sm-6">
                          <input type="text"
                            name="nome"
                            autocomplete="off"
                            class="form-control"
                            placeholder="Login"
                            v-model="form.login ">
                        </div>
                        <div class="col-sm-6">
                          <input type="password"
                            name="senha"
                            autocomplete="off"
                            class="form-control"
                            placeholder="Senha"
                            v-model="form.senha">
                        </div>
                        <div class="col-sm-6">
                          <input type="password"
                            name="confirmarsenha"
                            autocomplete="off"
                            class="form-control"
                            placeholder="Confirmar Senha"
                            v-model="form.confirmarSenha">
                        </div>
                      </div>
                    </div>
                  </b-row>
                </b-tab>
                <b-tab title="Permissões de Acesso">
                  <div class="row">
                    <div class="col-sm-3">
                      <b-form-checkbox
                        id="checkbox-1"
                        v-model="form.permissaoUsuario.membro"
                        value="1"
                        unchecked-value="0"
                        >Membros
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-2"
                        v-model="form.permissaoUsuario.despesas"
                        value="1"
                        unchecked-value="0"
                        >Despesas
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-3"
                        v-model="form.permissaoUsuario.multiIgreja"
                        value="1"
                        unchecked-value="0"
                        >Multi-Igreja
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-4"
                        v-model="form.permissaoUsuario.relatorios"
                        value="1"
                        unchecked-value="0"
                        >Relatórios
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-17"
                        v-model="form.permissaoUsuario.notaversao"
                        value="1"
                        unchecked-value="0"
                        >Notas Versao
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-21"
                        v-model="form.permissaoUsuario.tipoconta"
                        value="1"
                        unchecked-value="0"
                        >Tipo Conta
                      </b-form-checkbox>
                    </div>
                    <div class="col-sm-3">
                      <b-form-checkbox
                        id="checkbox-6"
                        v-model="form.permissaoUsuario.caixa"
                        value="1"
                        unchecked-value="0"
                        >Caixas
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-7"
                        v-model="form.permissaoUsuario.entradas"
                        value="1"
                        unchecked-value="0"
                        >Entradas
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-5"
                        v-model="form.permissaoUsuario.usuarios"
                        value="1"
                        unchecked-value="0"
                        >Usuários
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-8"
                        v-model="form.permissaoUsuario.visitante"
                        value="1"
                        unchecked-value="0"
                        >Visitantes
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-18"
                        v-model="form.permissaoUsuario.agenda"
                        value="1"
                        unchecked-value="0"
                        >Agenda
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-22"
                        v-model="form.permissaoUsuario.tipoevento"
                        value="1"
                        unchecked-value="0"
                        >Tipo Evento
                      </b-form-checkbox>
                    </div>
                    <div class="col-sm-3">
                      <b-form-checkbox
                        id="checkbox-9"
                        v-model="form.permissaoUsuario.aniversariante"
                        value="1"
                        unchecked-value="0"
                        >Aniversariantes
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-10"
                        v-model="form.permissaoUsuario.congregacao"
                        value="1"
                        unchecked-value="0"
                        >Congregações
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-11"
                        v-model="form.permissaoUsuario.novoconvertido"
                        value="1"
                        unchecked-value="0"
                        >Novos Convertidos
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-12"
                        v-model="form.permissaoUsuario.contabancaria"
                        value="1"
                        unchecked-value="0"
                        >Contas Bancárias
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-19"
                        v-model="form.permissaoUsuario.auditoria"
                        value="1"
                        unchecked-value="0"
                        >Auditoria
                      </b-form-checkbox>
                    </div>
                    <div class="col-sm-3">
                      <b-form-checkbox
                        id="checkbox-16"
                        v-model="form.permissaoUsuario.biblia"
                        value="1"
                        unchecked-value="0"
                        >Biblia
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-13"
                        v-model="form.permissaoUsuario.termouso"
                        value="1"
                        unchecked-value="0"
                        >Termos de Uso
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-14"
                        v-model="form.permissaoUsuario.politicaprivacidade"
                        value="1"
                        unchecked-value="0"
                        >Politicas Priva.
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-15"
                        v-model="form.permissaoUsuario.minhasfaturas"
                        value="1"
                        unchecked-value="0"
                        >Minhas Faturas
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-20"
                        v-model="form.permissaoUsuario.cargos"
                        value="1"
                        unchecked-value="0"
                        >Cargos
                      </b-form-checkbox>
                    </div>
                  </div>
                </b-tab>
              </b-tabs>
            </b-container>
          </form>
      <template #footer>
        <Button label="Salvar" @click="validate(form)" class="p-button-raised p-button-success p-button-text button" />
        <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
      </template>
    </Dialog>
  </div>
</template>

<script src="./usuario.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

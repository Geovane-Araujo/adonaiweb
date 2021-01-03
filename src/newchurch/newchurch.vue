<template>
<div class="login">
    <loader v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <form @submit.prevent="submit()" >
        <div class="login-page">
            <Dialog style="font-size:10px;" header="AdonaiSoft Registro" :visible.sync="openModal" :style="{width: '60vw'}" :modal="true">
                <form method="POST">
                <b-tabs content-class="mt-1">
                    <b-tab title="Principal" active>
                    <b-container>
                        <div class="row">
                            <div class="col-sm-5">
                                <the-mask
                                type="text"
                                the-mask :mask="['###.###.###-##', '##.###.###/####-##']"
                                v-model="form.cnpjcpf"
                                @click="onsearchCnpj(form.cnpjcpf)"
                                class="form-control"
                                placeholder="CNPJ/CPF"/>
                            </div>
                            <div class="col-sm-7">
                                <input type="text"
                                class="form-control"
                                @click="onsearchCnpj(form.cnpjcpf)"
                                v-model="form.nome"
                                placeholder="Nome Igreja">
                            </div>
                            <div class="col-sm-4">
                                <input
                                type="text"
                                v-model="form.pastorResponsavel"
                                class="form-control"
                                placeholder="Pastor Responsável">
                            </div>
                            <div class="col-sm-4">
                                <input
                                type="text"
                                v-model="form.tesoureiro"
                                class="form-control"
                                placeholder="Tesoureiro">
                            </div>
                            <div class="col-sm-4">
                                <input
                                type="text"
                                v-model="form.secretario"
                                class="form-control"
                                placeholder="Secretário(a)">
                            </div>
                        </div>
                        <H6 class="text-success">Dados de Contatos</H6>
                        <div class="row">
                        <div class="col-md-3">
                            <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[0].telefone"
                            placeholder="Telefone Principal">
                        </div>
                        <div class="col-md-3">
                            <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[1].telefone"
                            placeholder="Telefone Celular">
                        </div>
                        <div v-show="false" class="col-md-4">
                            <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[2].telefone"
                            placeholder="Telefone Outros">
                        </div>
                        <div class="col-md-6">
                            <input type="text"
                            class="form-control"
                            v-model="form.email[0].email"
                            placeholder="E-mail Principal">
                        </div>
                        <div v-show="false" class="col-md-6">
                            <input type="text"
                            class="form-control"
                            v-model="form.email[1].email"
                            placeholder="E-mail Outros">
                        </div>
                        </div>
                        <H6 class="text-success">Dados de Login</H6>
                        <div class="row">
                        <div class="col-md-4">
                            <input type="text"
                            class="form-control"
                            v-model="user.login"
                            placeholder="Login">
                        </div>
                        <div class="col-md-4">
                            <input type="password"
                            class="form-control"
                            v-model="user.senha"
                            placeholder="Senha">
                        </div>
                        <div class="col-md-4">
                            <input type="password"
                            class="form-control"
                            v-model="user.confirmarSenha"
                            placeholder="Confirmar Senha">
                        </div>
                        </div>
                    </b-container>
                    </b-tab>
                    <b-tab title="Igreja Sede">
                    <b-container>
                        <div class="row">
                            <div class="col-sm-12">
                                <input type="text"
                                class="form-control"
                                v-model="form.igrejaSede"
                                placeholder="Nome Igreja Sede">
                            </div>
                            <div class="col-sm-6">
                                <input
                                type="text"
                                v-model="form.presidente"
                                class="form-control"
                                placeholder="Pastor Presidente">
                            </div>
                            <div class="col-sm-6">
                                <input
                                type="text"
                                v-model="form.vice"
                                class="form-control"
                                placeholder="Pastor Vice">
                            </div>
                            <H6 class="text-success" style="padding-left:10px;">Dados de Contatos</H6>
                            <div class="row">
                            <div class="col-md-4">
                                <input type="text"
                                class="form-control"
                                v-mask="'(##)####-#####'"
                                v-model="form.telefone[3].telefone"
                                placeholder="Telefone Principal">
                            </div>
                            <div class="col-md-4">
                                <input type="text"
                                class="form-control"
                                v-mask="'(##)####-#####'"
                                v-model="form.telefone[4].telefone"
                                placeholder="Telefone Celular">
                            </div>
                            <div class="col-md-4">
                                <input type="text"
                                class="form-control"
                                v-mask="'(##)####-#####'"
                                v-model="form.telefone[5].telefone"
                                placeholder="Telefone Outros">
                            </div>
                            <div class="col-md-6">
                                <input type="text"
                                class="form-control"
                                v-model="form.email[2].email"
                                placeholder="E-mail Principal">
                            </div>
                            <div class="col-md-6">
                                <input type="text"
                                class="form-control"
                                v-model="form.email[3].email"
                                placeholder="E-mail Outros">
                            </div>
                            <H6 class="text-success" style="padding-left:20px;"> </H6>
                            <H6 class="text-success" style="padding-left:20px;"> </H6>
                            <H6 class="text-success" style="padding-left:20px;"> </H6>
                            </div>
                        </div>
                    </b-container>
                    </b-tab>
                    <!-- Endereços -->
                    <b-tab title="Enderecos">
                        <b-container>
                            <H6 class="text-success" style="padding-left:20px;">Endereço Local</H6>
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="form-group">
                                    <b-input-group>
                                        <b-form-input
                                        placeholder="CEP"
                                        v-model="form.endereco[0].cep" v-mask="'#####-###'">
                                        </b-form-input>
                                        <b-input-group-append >
                                        <b-button variant="outline-info" class="material-icons" @click="buscarcep (form.endereco[0].cep, form, 1)">search</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                    </div>
                                </div>
                                <div class="col-sm-7">
                                    <div class="form-group">
                                    <input type="text"
                                        class="form-control"
                                        v-model="form.endereco[0].endereco"
                                        placeholder="Endereço Local">
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group">
                                    <input type="text"
                                        class="form-control"
                                        v-model="form.endereco[0].numero"
                                        placeholder="Numero">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                    <input type="text"
                                        class="form-control"
                                        v-model="form.endereco[0].bairro"
                                        placeholder="Bairro Local">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                    <input type="text"
                                        class="form-control"
                                        v-model="form.endereco[0].complemento"
                                        placeholder="Complemento Local">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                    <b-input-group >
                                        <b-form-input placeholder="Cidade" v-model="form.endereco[0].cidade"  @keyup="datasearch(1, 0);"></b-form-input>
                                        <b-input-group-append>
                                        <b-button variant="outline-info" class="material-icons" @click="datasearch(1, 0);">search</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                    </div>
                                </div>
                            </div>
                            <!-- Endereço Secundário -->
                            <H6 class="text-success" style="padding-left:10px;">Endereço Sede</H6>
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="form-group">
                                    <b-input-group>
                                        <b-form-input
                                        placeholder="CEP Sede"
                                        v-model="form.endereco[1].cep" v-mask="'#####-###'">
                                        </b-form-input>
                                        <b-input-group-append>
                                        <b-button variant="outline-info" class="material-icons" @click="buscarcep (form.endereco[0].cep, form, 2)">search</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                    </div>
                                </div>
                                <div class="col-sm-7">
                                    <div class="form-group">
                                    <input type="text"
                                        class="form-control"
                                        v-model="form.endereco[1].endereco"
                                        placeholder="Endereço Sede">
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group">
                                    <input type="text"
                                        class="form-control"
                                        v-model="form.endereco[1].numero"
                                        placeholder="Numero">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                    <input type="text"
                                        class="form-control"
                                        v-model="form.endereco[1].bairro"
                                        placeholder="Bairro Sede">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                    <input type="text"
                                        class="form-control"
                                        v-model="form.endereco[1].complemento"
                                        placeholder="Complemento Sede">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                    <b-input-group >
                                        <b-form-input placeholder="Cidade Sede" v-model="form.endereco[1].cidade" @keyup="datasearch(1, 1);"></b-form-input>
                                        <b-input-group-append>
                                        <b-button variant="outline-info" class="material-icons" @click="datasearch(1, 1);">search</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                    </div>
                                </div>
                            </div>
                        </b-container>
                    </b-tab>
                    <b-tab title="Configurações">
                    <b-container>
                        <H6 class="text-success">Configurações de Mala Direta</H6>
                        <div class="row">
                            <div class="col-sm-5">
                                <input type="e-mail"
                                class="form-control"
                                v-model="form.emailmala"
                                placeholder="Email">
                            </div>
                            <div class="col-sm-5">
                                <input
                                    type="text"
                                    v-model="form.smtp"
                                    class="form-control"
                                    placeholder="SMPT">
                            </div>
                            <div class="col-sm-2">
                                <input
                                    type="text"
                                    v-model="form.porta"
                                    class="form-control"
                                    placeholder="Porta">
                            </div>
                            <div class="col-md-4">
                                <input type="text"
                                    class="form-control"
                                    v-model="form.usuario"
                                    placeholder="Usuário">
                            </div>
                            <div class="col-md-4">
                                <input type="password"
                                    class="form-control"
                                    v-model="form.senha"
                                    placeholder="senha">
                            </div>
                            <div class="col-md-4">
                                <b-form-select
                                    :options="[{ text: 'Não Requer', value: 'Não Requer' }, 'SSL', 'TSL']"
                                    v-model="form.autenticacao"
                                    ></b-form-select>
                            </div>
                            <div class="col-sm-12">
                                <b-form-textarea
                                    placeholder="Cabeçalho Relatórios"
                                    rows="3"
                                    v-model="form.textoRelatorio"
                                    max-rows="3"
                                ></b-form-textarea>
                            </div>
                        </div>
                    </b-container>
                    </b-tab>
                </b-tabs>
                </form>
            <template #footer>
                <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
                <Button label="Salvar" @click="validate(form)" class="p-button-raised p-button-success p-button-text button" />
            </template>
            </Dialog>
        </div>
    </form>
    <adonaidatasearch
    :title="ds.title"
    :cabecalho="ds.grid"
    :form="form"
    :destroy="destroy"
    :newchurch="'9999'"
    ref="expl"/>
</div>
</template>

<script src="./newchurch.js">
</script>

<style scoped lang="scss">
.login-page {
    height: 100vh;
    background-image: url('/static/imagem.jpg');
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    .card {
        width: 100vh;
    }
}
label {
  background-color: #5e8a75;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin: 5px;
  padding: 6px
}
.label2 {
  background-color: #a13b3b;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin: 5px;
  padding: 6px
}
#loading {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 9999;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
input[type='file'] {
  display: none
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

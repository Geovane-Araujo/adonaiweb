<template>
<div class="login">
    <loader v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <form @submit.prevent="submit()" >
        <div class="login-page">
            <loader v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
            <div class="card">
                <div class="card-header">Cadastro para Testes</div>
                <div class="card-body">
                    <form>
                        <div class="row">
                            <dir class="col-sm-12" style="padding:0px;">
                                <h4><span style="color: #808000;">Ol&aacute; seja bem vindo ao periodo de testes do sistema </span><span style="color: #808000;">Solicitamos que n&atilde;o inclua dados reais pois esta &eacute; uma base de dados compartilhada. </span><span style="color: #808000;">Sinta-se avontade para nos solicitar no chat para esclarecimento de duvidas</span></h4>
                            </dir>
                            <div class="col-sm-7">
                                <b-form-group label="Nome">
                                    <input type="text"
                                        autocomplete="off"
                                        class="form-control"
                                        placeholder="Nome"
                                        v-model="form.nome">
                                </b-form-group>
                            </div>
                            <div class="col-sm-5">
                                <b-form-group label="Login">
                                    <input type="text"
                                        autocomplete="off"
                                        class="form-control"
                                        v-model="form.login">
                                </b-form-group>
                            </div>
                            <div class="col-sm-7">
                                <b-form-group label="Email">
                                    <input type="text"
                                    autocomplete="off"
                                    class="form-control"
                                    v-model="form.email">
                                </b-form-group>
                            </div>
                            <div class="col-sm-5">
                                <b-form-group label="Telefone">
                                    <input type="text"
                                        class="form-control"
                                        v-mask="'(##)####-#####'"
                                        v-model="form.telefone">
                                </b-form-group>
                            </div>
                        </div>
                    </form>
                    <Button label="Registrar" @click="validade(form)" style="margin-right:10px;"  class="p-button-raised p-button-success p-button-text button" />
                    <Button label="Sair" class="p-button-raised p-button-danger p-button-text button"/>
                </div>
            </div>
        </div>
    </form>
</div>
</template>

<script src="./register.js">
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
        width: 90vh;
    }
}
</style>

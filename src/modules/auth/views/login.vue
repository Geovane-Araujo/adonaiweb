<template>
  <form @submit.prevent="submit()" >
    <div class="login-page">
        <div class="card">
            <div class="card-header">Adonai Soft Login</div>
            <div class="card-body">
                <div class="form-group">
                  <div class="row">
                    <div class="col-sm-12">
                      <the-mask
                        type="text"
                        the-mask :mask="['###.###.###-##', '##.###.###/####-##']"
                        v-model="form.cnpj"
                        class="form-control"
                        placeholder="CNPJ/CPF"/>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                    <input
                    required
                    type="text"
                    v-model="form.nome"
                    class="form-control"
                    placeholder="Usuário">
                </div>
                <div class="form-group">
                    <input
                    required
                    type="password"
                    v-model="form.senha"
                    class="form-control"
                    placeholder="Senha">
                </div>
                <button class="btn btn-light w-100">
                    Entrar
                </button>
                <button class="btn btn-dark w-100">
                    Esqueci a minha Senha
                </button>
            </div>
        </div>
    </div>
</form>
</template>

<script src="./login.js">
</script>

<style scoped lang="scss">
.login-page {
    height: 100vh;
    background-image: url(https://cdn.pixabay.com/photo/2017/02/16/23/46/book-2073023_960_720.jpg);
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    .card {
        width: 60vh;
    }
}
</style>

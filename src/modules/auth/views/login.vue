<template>
  <form @submit.prevent="submit()" >
    <div class="login-page">
        <div class="card">
            <div class="card-header">Adonai Soft Login</div>
            <div class="card-body">
                <div class="form-group">
                    <input
                    type="text"
                    v-mask="'###.###.###-##'"
                    v-model="form.cnpj"
                    class="form-control"
                    placeholder="CPF">
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

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    form: {
      cnpj: '',
      nome: '',
      senha: '',
      auth: '',
      token: navigator.name
    }
  }),
  methods: {
    ...mapActions('auth', ['ActionLogin']),
    async submit () {
      try {
        await this.ActionLogin(this.form)
        this.$router.push({ name: 'home' })
      } catch (err) {
        alert('O dados de Autenticação estão inválidos')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login-page {
    height: 100vh;
    background-image: url(https://cdn.pixabay.com/photo/2017/07/02/16/33/church-2464899_960_720.jpg);
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    .card {
        width: 30%;
    }
}
</style>

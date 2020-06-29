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
import util from '../../../assets/scss/util'

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
        this.$toastr.success('Seja BEm Vindo(a)', 'AdonaiSoft - Web', util.toast)
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.$toastr.error('Verifique os dados de Autenticação', 'AdonaiSoft - Web', util.toast)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login-page {
    height: 100vh;
    background-image: url(https://cdn.pixabay.com/photo/2019/07/14/07/24/jesus-4336337_960_720.jpg);
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    .card {
        width: 50vh;
    }
}
</style>

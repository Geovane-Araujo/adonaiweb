<template>
  <div class="usuario">
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Cadastro de Usuários</p>
        </div>
      </div>
      <div class="tre">
        <button class="btn btn-outline-info" @click="openModal=true">
          <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
        </button>
      </div>
      <hr class="bg-info" >
      <div class="row">
        <div class="col-lg-12">
          <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
            <thead>
              <tr class="text-left bg-info txt-light" style="height: 10px;">
                <th>ID</th>
                <th>Nome</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left" v-for="item in usuario" :key="item.id">
                <td >{{ item.id }}</td>
                <td>{{ item.nomeUsuario }}</td>
                <td>
                  <a href="#" @click="openModal =true; povoar(item);form.id = item.id; form.edit=true;form.add=false " class="text-success"><i class="fas fa-edit"></i></a>
                  &nbsp;
                  <a href="#" @click="deleteModal=true; form.id = item.id; form.edit=false;form.add=false; form.del = true" class="text-danger"><i class="far fa-trash-alt"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Tela cadastro -->
    <div id="overlay" v-if="openModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastro Usuario</h5>
            <button type="button" class="close"  @click="openModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="submit()">
              <div>
                <div class="form-group">
                  <input type="text"
                    name="nome"
                    autocomplete="off"
                    class="form-control"
                    placeholder="NomeUsuario / Login "
                    v-model="form.nomeUsuario ">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <input type="password"
                      name="senha"
                      autocomplete="off"
                      class="form-control"
                      placeholder="Senha"
                      v-model="form.senha">
                  </div>
                  <div class="col">
                    <input type="password"
                      name="confirmarsenha"
                      autocomplete="off"
                      class="form-control"
                      placeholder="Confirmar Senha"
                      v-model="form.confirmarSenha">
                  </div>
                </div>
                <h6 class="text-danger">Permissões:</h6>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.permissaoUsuario.membro">
                    <label class="form-check-label">Membros</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.permissaoUsuario.despesas">
                    <label class="form-check-label">Despesas</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.permissaoUsuario.entradas">
                    <label class="form-check-label">Entradas</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.permissaoUsuario.caixa">
                    <label class="form-check-label">Caixa</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.permissaoUsuario.multiIgreja">
                    <label class="form-check-label">Multi-Igreja</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.permissaoUsuario.usuarios">
                    <label class="form-check-label">Usuários</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.permissaoUsuario.relatorios">
                    <label class="form-check-label">Relatórios</label>
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-outline-info float-right" >Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Tela excluir -->
    <div id="overlay" v-if="deleteModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close"  @click="deleteModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <h5 class="text-danger">Deseja realmente Excluir ?</h5>
            <button class="btn btn-outline-danger" @click="submit(); deleteModal=false;" >Sim</button>
            <button class="btn btn-outline-success float-right" @click="deleteModal=false">Não</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import util from '../../assets/scss/util'

export default {
  data: () => ({
    openModal: false,
    deleteModal: false,
    status: '',
    form: {
      add: true,
      edit: false,
      del: false,
      id: '',
      nomeUsuario: '',
      senha: '',
      confirmarSenha: '',
      motivo: '',
      retorno: '',
      permissaoUsuario: {
        idPessoa: 0,
        membro: 0,
        despesas: 0,
        entradas: 0,
        caixa: 0,
        multiIgreja: 0,
        usuarios: 0,
        relatorios: 0
      }
    }
  }),
  mounted () {
    this.ActionSetUsuario()
  },
  methods: {
    ...mapActions('usuario', ['ActionSetUsuario']),
    ...mapActions('usuario', ['SalvarUsuario']),
    async submit () {
      try {
        await this.SalvarUsuario(this.form)
        if (this.form.add === true) {
          this.status = 'Salvo com Sucesso'
        } else if (this.form.edit === true) {
          this.status = 'Alterado com Sucesso'
          this.openModal = false
        } else {
          this.status = 'Excluido com Sucesso'
        }
        this.$toastr.success(this.status, 'Cadastro de Clientes', util.toast)
        this.ActionSetUsuario()
        this.limparCampos(this.form)
      } catch (err) {
        this.$toastr.error(err, 'Cadastro de Usuários', util.toast)
      }
    },
    limparCampos (form) {
      form.edit = false
      form.del = false
      form.add = true
      form.id = ''
      form.nomeUsuario = ''
      form.senha = ''
      form.confirmarSenha = ''
      form.permissaoUsuario.idPessoa = ''
      form.permissaoUsuario.membro = ''
      form.permissaoUsuario.despesas = ''
      form.permissaoUsuario.entradas = ''
      form.permissaoUsuario.caixa = ''
      form.permissaoUsuario.multiIgreja = ''
      form.permissaoUsuario.relatorios = ''
      form.permissaoUsuario.usuarios = ''
    },
    povoar (form) {
      this.form.id = form.id
      this.form.nomeUsuario = form.nomeUsuario
      this.form.senha = form.senha
      this.form.permissaoUsuario.idPessoa = form.permissaoUsuario.idPessoa
      this.form.confirmarSenha = form.confirmarSenha
      this.form.permissaoUsuario.membro = form.permissaoUsuario.membro
      this.form.permissaoUsuario.despesas = form.permissaoUsuario.despesas
      this.form.permissaoUsuario.entradas = form.permissaoUsuario.entradas
      this.form.permissaoUsuario.caixa = form.permissaoUsuario.caixa
      this.form.permissaoUsuario.multiIgreja = form.permissaoUsuario.multiIgreja
      this.form.permissaoUsuario.relatorios = form.permissaoUsuario.relatorios
      this.form.permissaoUsuario.usuarios = form.permissaoUsuario.usuarios
    }
  },
  computed: {
    ...mapState('usuario', ['usuario'])
  },
  props: {
    usuarios: { type: Object, required: false }
  }
}
</script>
<style lang="scss" scoped>
.table-overflow {
    max-height:90vh;
    overflow-y:auto;
}
p {
  font-size: 30px;
}
.usuario {
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba($color: #ffffff, $alpha: 0.7);
  margin: 5px;
  padding: 1px;
  max-height:89vh;
  overflow-y:auto;
}
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
</style>

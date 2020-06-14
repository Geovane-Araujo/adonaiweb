<template>
  <div class="cargo">
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Cadastro de Cargos</p>
        </div>
      </div>
      <div class="tre">
        <button class="btn btn-info" @click="openModal=true">
          <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
        </button>
      </div>
      <hr class="bg-info" >
      <div class="alert alert-danger" v-if="errorMsg">
        {{ errorMsg }}
      </div>
      <div class="alert alert-success" v-if="successMsg">
        {{ successMsg }}
      </div>
      <div class="row">
        <div class="col-lg-12">
          <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
            <thead>
              <tr class="text-left bg-info txt-light" style="height: 10px;">
                <th>ID</th>
                <th>Descricao</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left" v-for="item in cargo" :key="item.id">
                <td >{{ item.id }}</td>
                <td>{{ item.descricao }}</td>
                <td>
                  <a href="#" class="text-success"><i class="fas fa-edit"></i></a>
                  &nbsp;
                  <a href="#" @click="deleteModal=true" class="text-danger"><i class="far fa-trash-alt"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div id="overlay" v-if="openModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastro Cargo</h5>
            <button type="button" class="close"  @click="openModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="submi()">
              <div class="form-group">
                <input type="text"
                name="descricao"
                autocomplete="off"
                class="form-control"
                placeholder="Descricao"
                v-model="form.descricao">
              </div>
              <div class="form-group">
                <button class="btn btn-info btn-lg float-right" @click="form.del = true">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- modal excluir -->
    <div id="overlay" v-if="deleteModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Deletar Cargo</h5>
            <button type="button" class="close"  @click="deleteModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <h4 class="text-danger">Deseja realmente Excluir ?</h4>
            <br><br>
            <button class="btn btn-danger btn-lg">Sim</button>
            <button class="btn btn-success btn-lg float-right" @click="deleteModal=false">Não</button>
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
    errorMsg: '',
    successMsg: '',
    openModal: false,
    deleteModal: false,
    form: {
      add: true,
      edit: false,
      del: false,
      id: '',
      descricao: ''
    }
  }),
  mounted () {
    this.ActionSetCargo()
  },
  methods: {
    ...mapActions('cargo', ['ActionSetCargo']),
    ...mapActions('cargo', ['SalvarCargo']),
    async submi () {
      try {
        await this.SalvarCargo(this.form)
        this.$toastr.success('Salvo com Sucesso', 'Cadastro de Cargos', util.toast)
        this.ActionSetCargo()
      } catch (err) {
        this.$toastr.warning(err, 'Falha ao Salvar', util.toast)
        this.errorMsg = true
      }
    }
  },
  computed: {
    ...mapState('cargo', ['cargo'])
  },
  props: {
    cargos: { type: Object, required: true }
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
.cargo {
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

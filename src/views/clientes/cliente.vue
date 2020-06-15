<template>
  <div class="cargo">
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Cadastro de Clientes (Administrativo)</p>
        </div>
      </div>
      <div class="tre">
        <button
        class="btn btn-outline-info"
        @click="openModal=true; limparCampos(item);">
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
                <th>Nome Igreja</th>
                <th>CNPJ</th>
                <th>DB</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left" v-for="item in cliente" :key="item.id">
                <td >{{ item.id }}</td>
                <td>{{ item.igreja }}</td>
                <td>{{ item.cnpj }}</td>
                <td>{{ item.db }}</td>
                <td>
                  <a href="#" @click="openModal =true; povoar(item); form.edit= true;form.del=false;form.add=false " class="text-success"><i class="fas fa-edit"></i></a>
                  &nbsp;
                  <a href="#" @click="deleteModal=true; form.id = item.id; form.edit=false;form.add=false; form.del = true" class="text-danger"><i class="far fa-trash-alt"></i></a>
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
            <h5 class="modal-title">Cadastro Igrejas Clientes</h5>
            <button type="button" class="close"  @click="openModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="submit()">
              <div class="form-group">
                <input type="text"
                name="igreja"
                autocomplete="off"
                class="form-control"
                placeholder="Nome Igreja ou Instituição"
                v-model="form.igreja">
                <br>
                <input type="text"
                name="cnpj"
                autocomplete="off"
                class="form-control"
                placeholder="CNPJ/CPF"
                v-model="form.cnpj">
                <br>
                <input type="text"
                name="cnpj"
                autocomplete="off"
                class="form-control"
                placeholder="DB"
                v-model="form.db">
              </div>
              <div class="form-group">
                <button class="btn btn-outline-info float-right" >Salvar</button>
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
      igreja: '',
      db: '',
      cnpj: ''
    }
  }),
  mounted () {
    this.ActionSetCliente()
  },
  methods: {
    ...mapActions('cliente', ['ActionSetCliente']),
    ...mapActions('cliente', ['SalvarCliente']),
    async submit () {
      try {
        await this.SalvarCliente(this.form)
        this.ActionSetCliente()
        if (this.form.add === true) {
          this.status = 'Salvo com Sucesso'
        } else if (this.form.edit === true) {
          this.status = 'Alterado com Sucesso'
        } else {
          this.status = 'Excluido com Sucesso'
        }
        this.$toastr.success(this.status, 'Cadastro de Clientes', util.toast)
        this.limparCampos(this.form)
      } catch (err) {
        this.$toastr.error(err, 'Falha ao Salvar', util.toast)
      }
    },
    limparCampos (form) {
      form.igreja = ''
      form.edit = false
      form.del = false
      form.add = true
      form.id = ''
      form.db = ''
      form.cnpj = ''
    },
    povoar (form) {
      this.form.igreja = form.igreja
      this.form.id = form.id
      this.form.db = form.db
      this.form.cnpj = form.cnpj
    }
  },
  computed: {
    ...mapState('cliente', ['cliente'])
  },
  props: {
    clientes: { type: Object, required: true }
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

<template>
  <div class="cargo">
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Cadastro de Cargos</p>
        </div>
      </div>
      <div class="tre">
        <button class="btn btn-info">
          <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
        </button>
      </div>
      <hr class="bg-info" >
      <div class="alert alert-danger" v-if="errorMsg">
        Ocorreu um Erro
      </div>
      <div class="alert alert-success" v-if="successMsg">
        Salvo com Sucesso
      </div>
      <div class="row">
        <div class="col-lg-12">
          <table class="table table-botdered table-striped">
            <thead>
              <tr class="text-center bg-info txt-light" style="height: 10px;">
                <th><input type="checkbox"></th>
                <th>ID</th>
                <th>Descricao</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="item in cargo" :key="item.id">
                <td><input type="checkbox"></td>
                <td>{{ item.id }}</td>
                <td>{{ item.descricao }}</td>
                <td>
                  <a href="#" class="text-success"><i class="fas fa-edit"></i></a>
                  &nbsp;
                  <a href="#" class="text-danger"><i class="far fa-trash-alt"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  errorMsg: false,
  successMsg: false,
  mounted () {
    this.ActionSetCargo()
  },
  methods: {
    ...mapActions('cargo', ['ActionSetCargo'])
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
p {
  font-size: 30px;
}
.cargo {
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba($color: #ffffff, $alpha: 0.7);
  margin: 5px;
  padding: 1px;
}
</style>

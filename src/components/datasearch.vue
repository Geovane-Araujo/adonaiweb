<template>
  <div class="datasearch">
    <div class="input-group mb-3">
      <input type="text" class="form-control" v-bind:placeholder="place" aria-describedby="basic-addon1">
      <div class="input-group-prepend">
         <span class="input-group-text" id="basic-addon1">
            <a href="#" @click="openDatasearch=true;" class="text-info"><i class="fas fa-search"></i></a>
         </span>
      </div>
    </div>

    <div class="cargodts">
      <div id="overlay" v-if=openDatasearch>
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close"  @click="openDatasearch=false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h6>{{ titulo }}</h6>
              <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
                <thead>
                  <tr class="text-left bg-info txt-light" style="height: 10px;">
                    <th>ID</th>
                    <th>Nome</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-left" v-for="iten in cargo" :key="iten.id">
                    <td >{{ iten.id }}</td>
                    <td>{{ iten.descricao }}</td>
                    <td>
                      <a href="#" class="text-success" @click=" openDatasearch=false"><i class="far fa-check-square"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: [
    {
      cargos: { type: Object, required: false }
    },
    'titulo', 'place', 'state', 'importa'
  ],
  data: () => ({
    openDatasearch: false,
    descricao: '',
    id: '',
    state: '',
    action: ''
  }),
  computed: {
    ...mapState('cargo', ['cargo'])
  },
  mounted () {
    this.ActionSetCargo()
  },
  methods: {
    ...mapActions('cargo', ['ActionSetCargo'])
  }
}
</script>

<style lang="scss" scoped>
.table-overflow {
    max-height:90vh;
    overflow-y:auto;
}
.datasearch {
  background-color: rgba($color: #ffffff, $alpha: 0.7);
  margin: 5px;
  padding: 1px;
  max-height:200px;
  width: 200px;
  overflow-y:auto;
}
.cargodts {
  max-width: 100%;
}
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
.icone {
  background-image: "/search.png";
}
</style>

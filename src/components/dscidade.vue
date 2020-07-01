<template>
  <div class="cargodts">
    <div id="overlay" v-if=openCidade>
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h6>Selecione o Cargo</h6>
            <button type="button" class="close"  @click="openCidade=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
            <br>
            <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
              <thead>
                <tr class="text-left bg-info txt-light" style="height: 10px;">
                  <th>ID</th>
                  <th>Nome</th>
                  <th>UF</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style="overflow-y: scroll;height: 150px;">
                <tr class="text-left" v-for="city in cidade" :key="city.id">
                  <td >{{ city.id }}</td>
                  <td>{{ city.cidade }}</td>
                  <td>{{ city.uf }}</td>
                  <td>
                    <a href="#" class="text-success" @click="form.endereco[1].cidade = city.cidade;form.endereco[1].idcidade=city.id; openCidade=false; "><i class="far fa-check-square"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="row">
              <b-input-group >
                <b-input-group-append>
                  <b-button variant="outline-info" style="margin-left:10px;" class="material-icons" @click="pagina = pagina - 1;buscarCidade (pagina)">chevron_left</b-button>
                </b-input-group-append>
                <b-form-input v-model="pagina" class="col-sm-1 text-center"></b-form-input>
                <b-input-group-append>
                  <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="pagina = pagina + 1;buscarCidade (pagina)">chevron_right</b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

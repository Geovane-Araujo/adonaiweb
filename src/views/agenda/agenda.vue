<template>
  <div class="agenda">
    <loader v-if="openloadin" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Agenda</p>
          <hr class="bg-info">
          <div class="row">
            <div class="col-sm-12">
              <FullCalendar style="font-size:12px;" :options="calendarOptions" @dateClick="eventClick"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="overlay" v-if=openModal>
        <div class="modal-dialog modal-dialog-centered modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Agendamento</h5>
              <button type="button" class="close"  @click="openModal=false;cleanForm ()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form method="POST">
                <b-container>
                  <b-row class="text-center">
                    <b-col cols="12">
                      <div class="row">
                        <div class="col-sm-6">
                          <datetime  placeholder="Data Inicio"
                            class="datePivker"
                            type="datetime"
                            id="startDate"
                            format="dd/MM/yyyy HH:mm"
                            v-model="form.startdate">
                          </datetime>
                        </div>
                        <div class="col-sm-6">
                          <datetime  placeholder="Data Fim"
                            class="datePivker"
                            type="datetime"
                            id="startDate"
                            format="dd/MM/yyyy HH:mm"
                            v-model="form.enddate">
                          </datetime>
                        </div>
                        <div class="col-sm-12">
                          <b-input-group>
                            <b-form-input placeholder="Evento" v-model="form.descricaoEvento"
                            ></b-form-input>
                              <b-input-group-append >
                              <b-button variant="outline-info" class="material-icons" @click="datasearch (1);" >search</b-button>
                            </b-input-group-append>
                          </b-input-group>
                        </div>
                        <div class="col-sm-12">
                          <b-input-group>
                            <b-form-input placeholder="Usuario evento" v-model="form.nome"
                            ></b-form-input>
                              <b-input-group-append >
                              <b-button variant="outline-info" class="material-icons"  @click="datasearch (0);" >search</b-button>
                            </b-input-group-append>
                          </b-input-group>
                        </div>
                        <div class="col-sm-12">
                           <b-form-textarea
                              placeholder="Descricao"
                              v-model="form.descricao"
                              rows="3"
                              max-rows="3"
                            ></b-form-textarea>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-container>
              </form>
              <button type="button" v-show="form.edit" class="btn btn-outline-danger float-left" style="margin-left:5px;" @click="form.edit=false;form.del=true;save(form)">Excluir</button>
              <button type="button" class="btn btn-outline-info float-right" style="margin-left:5px;" @click="validate(form)">Agendar</button>
            </div>
          </div>
        </div>
    </div>
    <adonaidatasearch
    :title="ds.title"
    :cabecalho="ds.grid"
    :form="form" v-bind:openDatasearch="open"
    :destroy="destroy"
    ref="expl"/>
  </div>
</template>

<script src="./agenda.js">
</script>
<style lang=scss scoped>
label {
  background-color: #3498db;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin: 10px;
  padding: 6px 20px
}
.datePivker{
  margin-left: 2px;
  padding: 5px;
  height: 35px;
  border:solid 1px;
  border-radius:3px;
  border-color:#cacdcf;
  text-align: center;
}
.fc button {
    text-transform: uppercase;
      border-radius: 2px;
      font-size: 13px;
      font-weight: 600;
      transition: box-shadow linear 0.4s;
      background-color: #2196F3;
      border-color: #2196F3;
      margin-top: 10px;
    cursor: pointer;
}
p {
  font-size: 30px;
}
input[type='file'] {
  display: none
}
.table-sm {
  padding: 2px;
}
.agenda {
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba($color: #ffffff, $alpha: 0.9);
  margin: 5px;
  overflow:auto;
}
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
button {
  color: #5e8a75;
  border-color:#5e8a75;
}
button:hover {
  background-color: #5e8a75;
  border-color:#5e8a75;
}
</style>

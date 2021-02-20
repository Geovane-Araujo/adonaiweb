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
    <Dialog style="font-size:10px;" header="Agenda" :visible.sync="openModal" :style="{width: resize+'vw'}" :modal="true">
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
      <template #footer>
          <Button label="Excluir" v-show="form.edit"  @click="form.edit=false;form.del=true;save(form)" class="p-button-raised p-button-danger p-button-text button"/>
          <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
          <Button label="Agendar" @click="validate(form)" class="p-button-raised p-button-success p-button-text button" />
      </template>
    </Dialog>
    <adonaidatasearch
    :title="ds.title"
    :cabecalho="ds.grid"
    :form="form"
    :destroy="destroy"
    ref="expl"/>
  </div>
</template>

<script src="./agenda.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

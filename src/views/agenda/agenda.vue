<template>
  <div class="agenda">
    <loader v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Agenda</p>
          <hr class="bg-info">
          <div class="row">
            <div class="col-sm-12">
              <FullCalendar :options="calendarOptions" @dateClick="eventClick"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="overlay" v-if=openModal>
        <div class="modal-dialog modal-dialog-centered modal-md ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Agendamento</h5>
              <button type="button" class="close"  @click="openModal=false;">
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
                          <datetime  placeholder="Data Inicio" style="margin-left: 2px;padding: 5px; height: 35px; border:solid 1px; border-radius:3px; border-color:#cacdcf; text-align: center; "
                            class="theme-orange"
                            type="datetime"
                            id="startDate"
                            format="dd/MM/yyyy HH:mm"
                            v-model="form.startdate">
                          </datetime>
                        </div>
                        <div class="col-sm-6">
                          <datetime  placeholder="Data Fim" style="margin-left: 2px;padding: 5px; height: 35px; border:solid 1px; border-radius:3px; border-color:#cacdcf; text-align: center; "
                            class="theme-orange"
                            type="datetime"
                            id="startDate"
                            format="dd/MM/yyyy HH:mm"
                            v-model="form.enddate">
                          </datetime>
                        </div>
                        <div class="col-sm-12">
                          <b-input-group>
                            <b-form-input placeholder="Evento" v-model="form.descricaoevento"
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
                              <b-button variant="outline-info" class="material-icons"  @click="datasearch (1);" >search</b-button>
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
              <button type="button" class="btn btn-outline-info float-right" style="margin-left:5px;" @click="validate(form, 0)">Agendar</button>
            </div>
          </div>
        </div>
    </div>
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
  .popper,
  .tooltip {
    position: absolute;
    z-index: 9999;
    background: #FFC107;
    color: black;
    width: 150px;
    border-radius: 3px;
    box-shadow: 0 0 2px rgba(0,0,0,0.5);
    padding: 10px;
    text-align: center;
  }
  .style5 .tooltip {
    background: #1E252B;
    color: #FFFFFF;
    max-width: 200px;
    width: auto;
    font-size: .8rem;
    padding: .5em 1em;
  }
  .popper .popper__arrow,
  .tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
  }

  .tooltip .tooltip-arrow,
  .popper .popper__arrow {
    border-color: #FFC107;
  }
  .style5 .tooltip .tooltip-arrow {
    border-color: #1E252B;
  }
  .popper[x-placement^="top"],
  .tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }
  .popper[x-placement^="top"] .popper__arrow,
  .tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  .popper[x-placement^="bottom"],
  .tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }
  .tooltip[x-placement^="bottom"] .tooltip-arrow,
  .popper[x-placement^="bottom"] .popper__arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  .tooltip[x-placement^="right"],
  .popper[x-placement^="right"] {
    margin-left: 5px;
  }
  .popper[x-placement^="right"] .popper__arrow,
  .tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
  .popper[x-placement^="left"],
  .tooltip[x-placement^="left"] {
    margin-right: 5px;
  }
  .popper[x-placement^="left"] .popper__arrow,
  .tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #FF9800;
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: #ff9800;
}
.picker {
  border:solid 1px;
  border-radius:3px;
  border-color:#dee1e3;
}
</style>

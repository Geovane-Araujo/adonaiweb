<template>
  <div class="agenda">
    <loader v-if="openloadin" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Agenda do Campo</p>
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
                  <input class="form-control"
                  type="datetime-local"
                  :value="form.startdate">
                </div>
                <div class="col-sm-6">
                  <input class="form-control"
                  type="datetime-local"
                  :value="form.enddate">
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

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../../http/router'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import utilExpl from '../../util/utilClass'
import 'vue-datetime/dist/vue-datetime.css'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

var moment = require('moment')
// var data = new Date()

export default {
  data () {
    return {
      openModal: false,
      openloadin: false,
      resize: 30,
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        startdate: '',
        enddate: '',
        idmultiigreja: 1,
        idevento: '',
        descricaoEvento: '',
        idpessoa: '',
        nome: '',
        descricao: ''
      },
      ds: {
        grid: [],
        title: ''
      },
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: 'dayGridMonth',
        height: 'auto',
        locale: 'pt-br',
        editable: true,
        themeSystem: 'bootstrap',
        selectable: true,
        dateClick: this.handleDateClick, // clicar no dia
        eventClick: this.eventDateClick, // clicar evento
        eventDrop: this.eventDrop,
        headerToolbar: {
          left: 'prev,next',
          center: '',
          right: 'adicionar,dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [],
        buttonText: {
          today: 'Hoje',
          month: 'Mês',
          week: 'Semana',
          day: 'Hoje',
          list: 'Lista'
        },
        customButtons: {
          adicionar: {
            text: 'Adicionar',
            click: function () {
              alert('deu certo')
            }
          },
          editar: {
            text: 'Editar',
            click: function () {
              alert('deu certo')
            }
          }
        }
      }
    }
  },
  mounted () {
    this.onResize()
    this.get()
  },
  methods: {
    async save (form) {
      this.openloadin = true
      await axios.post(adonai.url + 'agenda', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com sucesso', life: 5000 })
          this.cleanForm()
          this.openloadin = false
          this.openModal = false
          this.get()
        } else {
          this.openloadin = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
      }).catch(err => {
        this.openloadin = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    get () {
      this.openloadin = true
      utilExpl.explorer.route = 'menu_agenda'
      axios.post(adonai.url + 'aexplorer', utilExpl.explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.calendarOptions.events = res.data.obj
          this.openloadin = false
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
          this.openloadin = false
        }
      }).catch(err => {
        this.openloadin = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    async getById (id, tp) {
      this.openloadin = true
      axios.get(adonai.url + 'agenda/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (tp === 1) {
          this.form = res.data.obj
          this.form.edit = true
          this.form.add = false
          this.form.idmultiigreja = 1
          this.openModal = true
          this.openloadin = false
        } else {
          this.form = res.data.obj
          this.openloadin = false
        }
      }).catch(err => {
        this.openloadin = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    handleDateClick: function (arg) {
      var a = new Date(arg.dateStr)
      var b = new Date(arg.dateStr)
      this.form.startdate = moment((moment(a).add(1, 'days').toDate()) + (new Date().getHours())).format('YYYY-MM-DDTHH:mm')
      this.form.enddate = moment((moment(b).add(1, 'days').toDate()) + (new Date().getHours())).format('YYYY-MM-DDTHH:mm')
      this.openModal = true
    },
    eventDateClick: function (arg) {
      this.getById(parseInt(arg.event.id), 1)
    },
    async eventDrop (arg) {
      this.form.startdate = arg.event.start
      if (arg.event.endStr === '') {
        this.form.enddate = arg.event.start
      } else {
        this.form.enddate = arg.event.endStr
      }
      this.form.id = parseInt(arg.event.id)
      this.form.descricao = ''
      this.form.add = false
      this.form.edit = true
      this.save(this.form)
    },
    datasearch (route) {
      if (route === 1) {
        utilExpl.explorerflex.route = 'menu_eventos_tipos'
        utilExpl.explorerflex.criterios = 'ORDER BY ID DESC'
        this.ds.grid = ['id', 'descricao']
        this.ds.title = 'Agenda Eventos'
        this.$refs.expl.dataSearch(utilExpl.explorerflex, 1, 1)
      } else {
        utilExpl.explorerflex.route = 'exp_agenda_usuarios'
        utilExpl.explorerflex.criterios = 'ORDER BY ID DESC'
        this.ds.grid = ['ID', 'Nome']
        this.ds.title = 'Agenda Eventos'
        this.$refs.expl.dataSearch(utilExpl.explorerflex, 2, 2)
      }
    },
    destroy (registro, params) {
      if (params === 1) {
        this.form.descricaoEvento = registro.descricao
        this.form.idevento = registro.id
      } else {
        this.form.nome = registro.Nome
        this.form.idpessoa = registro.ID
      }
    },
    validate (form) {
      if (form.startdate === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios não preenchidos', life: 5000 })
      } else if (form.enddate === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios não preenchidos', life: 5000 })
      } else if (form.descricaoevento === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios não preenchidos', life: 5000 })
      } else if (form.descricao === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios não preenchidos', life: 5000 })
      } else {
        this.save(form)
      }
    },
    cleanForm () {
      this.form.add = true
      this.form.edit = false
      this.form.del = false
      this.form.id = ''
      this.form.nome = ''
      this.form.idpessoa = ''
      this.form.descricao = ''
      this.form.enddate = ''
      this.form.startdate = ''
      this.form.descricaoEvento = ''
      this.form.idevento = ''
      this.form.idmultiigreja = 1
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.resize = 100
      } else {
        this.resize = 40
      }
    }
  },
  components: {
    FullCalendar,
    Dialog,
    Button
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>
<style lang=scss scoped src="../../assets/scss/adonai.scss">
</style>

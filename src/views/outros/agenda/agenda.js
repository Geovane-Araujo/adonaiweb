import { mapState } from 'vuex'
import axios from 'axios'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../../../http/router'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import { TableModel } from '../../../model/TableModel'

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
        selectable: true,
        dateClick: this.handleDateClick, // clicar no dia
        eventClick: this.eventDateClick, // clicar evento
        eventDrop: this.eventDrop,
        headerToolbar: {
          locale: 'pt-br',
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [],
        eventColor: '#f2fceb',
        buttonText: {
          today: 'Hoje',
          month: 'Mês',
          week: 'Semana',
          day: 'Hoje',
          list: 'Lista'
        }
      },
      utilExpl: {
        explorer: new TableModel(),
        explorerflex: new TableModel()
      }
    }
  },
  mounted () {
    this.utilExpl.explorer = new TableModel()
    this.utilExpl.explorerflex = new TableModel()
    this.onResize()
    this.get()
  },
  methods: {
    async save (form) {
      this.openloadin = true
      await axios.post(adonai.url + 'agenda', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com Sucesso', life: 5000 })
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
      this.utilExpl.explorer.route = 'menu_agenda'
      axios.post(adonai.url + 'aexplorer', this.utilExpl.explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
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
          this.form.startdate = moment(this.form.startdate).format('YYYY-MM-DDTHH:mm')
          this.form.enddate = moment(this.form.enddate).format('YYYY-MM-DDTHH:mm')
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
        this.utilExpl.explorerflex.route = 'menu_eventos_tipos'
        this.ds.title = 'Agenda Eventos'
        this.$refs.expl.dataSearch(this.utilExpl.explorerflex, 1, 1)
      } else {
        this.utilExpl.explorerflex.route = 'exp_agenda_usuarios'
        this.ds.title = 'Agenda Eventos'
        this.$refs.expl.dataSearch(this.utilExpl.explorerflex, 2, 2)
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
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios Data Inicial sem preenchimento', life: 5000 })
      } else if (form.enddate === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios Data Final sem preenchimento', life: 5000 })
      } else if (form.descricaoevento === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos ObrigatóriosDescricao Evento sem preenchimento', life: 5000 })
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
    datetime: Datetime,
    Dialog,
    Button,
    InputText,
    Calendar
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

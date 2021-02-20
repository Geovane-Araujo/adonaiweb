import { mapState } from 'vuex'
import axios from 'axios'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../../../http/router'
import FullCalendar from '@fullcalendar/vue'
import util from '../../../assets/scss/util'
import dayGridPlugin from '@fullcalendar/daygrid'
import utilExpl from '../../../util/utilClass'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import 'fullcalendar/dist/locale/pt-br'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'

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
          locale: 'pt-br',
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [],
        buttonText: {
          today: 'Hoje',
          month: 'Mês',
          week: 'Semana',
          day: 'Hoje',
          list: 'Lista'
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
          this.$toastr.success('Salvo com Sucesso', 'AdonaiSoft Diz:', util.toast)
          this.cleanForm()
          this.openloadin = false
          this.openModal = false
          this.get()
        } else {
          this.$toastr.error(res.data.motivo, 'Falha ao Salvar', util.toast)
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    get () {
      this.openloadin = true
      utilExpl.explorer.route = 'menu_agenda'
      axios.post(adonai.url + 'aexplorer', utilExpl.explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.calendarOptions.events = res.data.obj
          this.openloadin = false
        } else {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz: ', util.toast)
          this.openloadin = false
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz: ', util.toast))
    },
    getById (id) {
      this.openloadin = true
      axios.get(adonai.url + 'agenda/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.form = res.data.obj
        this.form.edit = true
        this.form.add = false
        this.form.idmultiigreja = 1
        this.openModal = true
        this.openloadin = false
      }).catch(err => util.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    handleDateClick: function (arg) {
      this.openModal = true
      var data = arg.dateStr.split('-')
      var date = ''
      for (let i = 0; i < data.length; i++) {
        date += data[i] + ','
      }
      date = date.replace(/,\s*$/, '')
      this.form.startdate = moment(new Date(date).getTime()).format()
      this.form.enddate = moment(new Date(date).getTime()).format()
    },
    eventDateClick: function (arg) {
      this.getById(parseInt(arg.event.id))
    },
    eventDrop: function (arg) {
      this.form.startdate = arg.event.startStr
      this.form.enddate = arg.event.endStr
      this.form.id = parseInt(arg.event.id)
      this.form.descricao = ''
      this.form.add = false
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
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'AdonaiSpft diz:', util.toast)
      } else if (form.enddate === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'AdonaiSpft diz:', util.toast)
      } else if (form.descricaoevento === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'AdonaiSpft diz:', util.toast)
      } else if (form.descricao === '') {
        this.$toastr.warning('Campos Obrigatórios (Descricao,Valor,Caixa e Tipo)', 'AdonaiSpft diz:', util.toast)
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

import { mapState } from 'vuex'
import axios from 'axios'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../router/services'
import FullCalendar from '@fullcalendar/vue'
import util from '../../assets/scss/util'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Datetime } from 'vue-datetime'
import utilExpl from '../../util/utilClass'
import 'vue-datetime/dist/vue-datetime.css'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import 'fullcalendar/dist/locale/pt-br'

var moment = require('moment')
var data = new Date()

export default {
  data () {
    return {
      openModal: false,
      open: false,
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        startdate: '',
        enddate: '',
        idmultiigreja: 1,
        idevento: '',
        descricaoevento: '',
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
        locale: 'pt-br',
        editable: true,
        themeSystem: 'bootstrap',
        selectable: true,
        dateClick: this.handleDateClick, // clicar no dia
        eventClick: this.eventDateClick, // clicar evento
        eventDrop: this.eventDrop,
        headerToolbar: {
          locale: 'pt-br',
          left: 'prev,next today',
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
    this.get()
  },
  methods: {
    async save (form) {
      this.openloading = true
      if (form.del === true && form.dataPagamento !== '') {
        this.$toastr.info('Para excluir uma duplicata paga é necessário estornar', 'AdonaiSoft diz:', util.toast)
        this.openloading = false
      } else {
        await axios.post(adonai.url + 'agenda', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.$toastr.success('Salvo com Sucesso', 'AdonaiSoft Diz:', util.toast)
            this.cleanForm()
            this.get()
            this.openModal = false
            this.openloading = false
          } else {
            this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
          }
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      }
    },
    get () {
      utilExpl.explorer.route = 'menu_agenda'
      this.openloading = true
      axios.post(adonai.url + 'aexplorer', utilExpl.explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.openloading = false
        if (res.data.ret === 'success') {
          this.calendarOptions.events = res.data.obj
        } else {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
        }
        this.openloading = false
      }).catch(err => util.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    getById (id) {
      axios.get(adonai.url + 'igrejagrid/' + 1, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.igreja = res.data
        this.openloading = false
      }).catch(err => util.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    handleDateClick: function (arg) {
      this.openModal = true
      var hora = data.getHours() + ':' + data.getMinutes()
      var aux = moment(arg.dateStr + ' ' + hora).format('DD/MM/yyyy h:mm')
      this.form.startdate = aux
    },
    eventDateClick: function (arg) {
      alert('Olá! ' + arg)
    },
    eventDrop: function (arg) {
      alert('Olá! ' + arg)
    },
    datasearch (route) {
      if (route === 1) {
        utilExpl.explorerflex.route = 'menu_eventos_tipos'
        utilExpl.explorerflex.criterios = 'ORDER BY ID DESC'
        this.ds.grid = ['ID', 'Descricao']
        this.ds.title = 'Agenda Eventos'
        this.$refs.expl.dataSearch(utilExpl.explorerflex, 1, 1)
        this.open = true
      } else {
        utilExpl.explorerflex.route = 'exp_agenda_usuarios'
        utilExpl.explorerflex.criterios = 'ORDER BY ID DESC'
        this.ds.grid = ['ID', 'Nome']
        this.ds.title = 'Agenda Eventos'
        this.$refs.expl.dataSearch(utilExpl.explorerflex, 2, 2)
        this.open = true
      }
    },
    destroy (registro, params) {
      if (params === 1) {
        this.form.descricaoevento = registro.descricao
        this.form.idevento = registro.id
        this.open = false
      } else {
        this.form.nome = registro.Nome
        this.form.idpessoa = registro.ID
        this.open = false
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
      this.form.descricaoevento = ''
      this.form.idevento = ''
      this.form.idmultiigreja = 1
    },
    read (form) {
      this.form.add = form.add
      this.form.edit = form.edit
      this.form.del = form.del
      this.form.id = form.id
      this.form.nome = form.nome
      this.form.idpessoa = form.idpessoa
      this.form.descricao = form.descricao
      this.form.enddate = form.enddate
      this.form.startdate = form.startdate
      this.form.descricaoevento = form.descricaoevento
      this.form.idevento = form.idevento
      this.form.idmultiigreja = 1
    }
  },
  components: {
    FullCalendar,
    datetime: Datetime
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

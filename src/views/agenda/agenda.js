import { mapState } from 'vuex'
import axios from 'axios'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../router/services'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import 'fullcalendar/dist/locale/pt-br'
var moment = require('moment')

export default {
  data () {
    return {
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
        events: [
          {
            title: 'Pregação Com Aloisio',
            color: '#1c4769',
            start: '2020-08-31',
            end: '2020-09-02',
            description: 'This is a cool event'
          },
          {
            title: 'another test',
            start: moment().add(2, 'd'),
            end: moment()
              .add(2, 'd')
              .add(2, 'h')
          }
        ],
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
  },
  methods: {
    get () {
      axios.get(adonai.url + 'igrejagrid/' + 1, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.igreja = res.data
        this.openloading = false
      })
      /* this.$refs.expl.explorer('igrejagrid',1,'') */
    },
    handleDateClick: function (arg) {
      alert('date click! ' + arg.dateStr)
    },
    eventDateClick: function (arg) {
      alert('Olá! ' + arg)
    },
    eventDrop: function (arg) {
      alert('Olá! ' + arg)
    }
  },
  components: {
    FullCalendar
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

import { mapState } from 'vuex'
import axios from 'axios'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../router/services'
import 'fullcalendar/dist/locale/pt-br'
import 'fullcalendar/dist/fullcalendar.css'
var moment = require('moment')

export default {
  data () {
    return {
      events: [
        {
          title: 'Riader',
          allDay: true,
          color: '#f87979',
          start: moment(),
          end: moment().add(3, 'd')
        },
        {
          title: 'another test',
          start: moment().add(2, 'd'),
          end: moment()
            .add(2, 'd')
            .add(2, 'h')
        }
      ],
      config: {
        defaultView: 'month',
        themeSystem: 'standard',
        eventRender: function (event, element) {}
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
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

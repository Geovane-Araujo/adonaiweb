import { mapState } from 'vuex'
import axios from 'axios'
import adonai from '../../../http/router'
import util from '../../../assets/scss/util'
import Toolbar from 'primevue/toolbar'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Paginator from 'primevue/paginator'

export default {
  data () {
    return {
      pagina: 1,
      openModal: false,
      openloading: false,
      aniversariantes: [],
      resize: 50,
      explorer: {
        route: 'menu_aniversariantes',
        pagina: 1,
        criterios: 'order by id desc'
      },
      form: {
        nome: '',
        telefone: '',
        datanascimento: '',
        mensagem: ''
      }
    }
  },
  mounted () {
    this.onResize()
    this.buscaraniversariante()
  },
  methods: {
    validate (props) {
      this.form.telefone = props.data.Telefone
      this.form.edit = true
      this.form.add = false
      this.openModal = true
    },
    buscaraniversariante () {
      this.openloading = true
      axios.post(adonai.url + 'aexplorer', this.explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.aniversariantes = res.data.obj
        this.openloading = false
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    enviarMensagem (form) {
      form.telefone = form.telefone.replace('(', '')
      form.telefone = form.telefone.replace(')', '')
      form.telefone = form.telefone.replace('-', '')
      window.open('https://api.whatsapp.com/send?phone=${encodeURIComponent(55' + form.telefone + ')}&text=' + form.mensagem)
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.resize = 100
      } else {
        this.resize = 50
      }
    }
  },
  components: {
    Dialog,
    Button,
    DataTable,
    Column,
    Toolbar,
    InputText,
    Paginator
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

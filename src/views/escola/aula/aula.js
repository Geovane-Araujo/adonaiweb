import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import adonai from '../../router/services'
import axios from 'axios'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import adExplo from '../../../util/utilClass'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Editor from 'primevue/editor'
import { Datetime } from 'vue-datetime'
var r

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    open: false,
    alunoModal: false,
    form: {
      add: true,
      edit: false,
      del: false,
      id: '',
      idclasse: '',
      classe: '',
      datachamada: '',
      presentes: '',
      ausentes: '',
      visitas: '',
      ofertas: '',
      total: '',
      idprofessor: '',
      professor: '',
      tema: '',
      detalhe: '',
      registroChamada: null,
      matriculados: ''
    },
    professores: [],
    ds: {
      grid: [],
      title: ''
    },
    currency: {
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      suffix: '',
      precision: 2,
      masked: false
    }
  }),
  mounted () {
    adExplo.explorer.route = 'menu_registro_chamada'
    this.$refs.grid.get(adExplo.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'classe', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.$toastr.success('Salvo com Sucesso', 'AdonaiSoft Diz:', util.toast)
          this.openModal = false
          adExplo.explorer.route = 'menu_registro_chamada'
          this.$refs.grid.get(adExplo.explorer)
          this.openloading = false
        } else {
          this.openloading = false
          this.$toastr.error(res.data.motivo, 'Falha ao Salvar', util.toast)
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    validate (form) {
      if (this.form.descricao === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        if (r !== undefined) {
          r.forEach(element => {
            this.form.matriculados.push(element)
          })
        }
        this.save(form)
      }
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'aula/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.form = res.data.obj
        if (id !== -100) {
          this.form.add = false
          this.form.edit = true
        }
        this.openloading = false
        this.openModal = true
      })
    },
    datasearch (route) {
      if (route === 0) {
        adExplo.explorerflex.route = 'exp_classe'
        adExplo.explorerflex.criterios = 'ORDER BY ID DESC'
        this.ds.grid = ['id', 'descricao']
        this.ds.title = 'Classes'
        this.$refs.expl.dataSearch(adExplo.explorerflex, route, 0)
      }
    },
    destroy (registro, params) {
      if (params === 0) {
        this.form.curso = registro.descricao
        this.form.idcurso = registro.id
        this.openloading = true
        axios.get(adonai.url + 'getprofessores/' + registro.id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          this.professores = res.data.obj
          this.openloading = false
        })
      }
    },
    del (data) {
      if (r === undefined) {
        r = []
        r.push(data)
      } else {
        r.push(data)
      }
      var i = 0
      var indice = 0
      this.form.matriculados.forEach(element => {
        if (element === data) {
          indice = i
        }
        i++
      })
      this.form.matriculados.splice(indice, 1)
    }
  },
  components: {
    Dialog,
    Button,
    InputText,
    DataTable,
    Editor,
    Column,
    datetime: Datetime
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

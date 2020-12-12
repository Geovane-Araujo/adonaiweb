import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import adonai from '../../../http/router'
import axios from 'axios'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import adExplo from '../../../util/utilClass'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Editor from 'primevue/editor'
import { Datetime } from 'vue-datetime'
import Checkbox from 'primevue/checkbox'
var moment = require('moment')
var data = new Date()

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
      registroChamada: [],
      matriculados: ''
    },
    selectAlunos: null,
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
    },
    percent: {
      decimal: ',',
      thousands: '.',
      prefix: '',
      suffix: '%',
      precision: 2,
      masked: false
    }
  }),
  mounted () {
    adExplo.explorer.route = 'menu_registro_chamada'
    this.$refs.grid.get(adExplo.explorer)
  },
  methods: {
    initialize () {
      this.form.datachamada = moment(data).format()
    },
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'aula', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
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
      if (this.form.idprofessor === '' || this.form.tema === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
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
        this.form.classe = registro.descricao
        this.form.idclasse = registro.id
        this.openloading = true
        axios.get(adonai.url + 'getprofessores/' + registro.id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          this.professores = res.data.obj.professores
          this.form.registroChamada = res.data.obj.alunos
          this.form.matriculados = this.form.registroChamada.length
          this.form.ausentes = this.form.matriculados
          this.openloading = false
        })
      }
    },
    marcarPresente (e) {
      this.$nextTick(() => {
        var pre = 0
        var aus = 0
        this.form.registroChamada.forEach(element => {
          if (element.presente === '1') {
            pre += 1
          } else {
            aus += 1
          }
        })
        this.form.ausentes = aus
        this.form.presentes = pre
        this.form.total = (pre / this.form.matriculados) * 100
      })
    }
  },
  components: {
    Dialog,
    Button,
    InputText,
    DataTable,
    Editor,
    Column,
    Checkbox,
    datetime: Datetime
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

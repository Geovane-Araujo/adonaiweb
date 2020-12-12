import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import adonai from '../../../http/router'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
var moment = require('moment')
var data = new Date()

export default {
  data () {
    return {
      openModal: false,
      openloading: false,
      open: false,
      explorer: {
        route: 'menu_contas_bancarias',
        pagina: 1,
        criterios: 'order by id desc'
      },
      explorerflex: {
        route: '',
        pagina: 1,
        criterios: 'order by id desc'
      },
      ds: {
        grid: [],
        title: '',
        params: ''
      },
      status: '',
      form: {
        add: true,
        edit: false,
        dela: false,
        id: '',
        descricao: '',
        idbanco: '',
        nomeBanco: '',
        agencia: '',
        conta: '',
        tipo: '',
        motivo: '',
        moment: moment(data).format('YYYY-MM-DD h:mm:ss')
      }
    }
  },
  mounted () {
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      if (form.del === true && form.id < 0) {
        this.$toastr.info('Não é permitido Excluir Registros Padrões do Sistema', 'AdonaiSoft Diz:', util.toast)
      } else {
        this.openloading = true
        await axios.post(adonai.url + 'contabancaria', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            if (this.form.add === true) {
              this.status = 'Salvo com Sucesso'
            } else if (this.form.edit === true) {
              this.status = 'Alterado com Sucesso'
            } else {
              this.status = 'Excluido com Sucesso'
            }
            this.$toastr.success(this.status, 'Cadastro de Contas Bancárias', util.toast)
            this.openloading = false
            this.openModal = false
            this.cleanForm()
            this.$refs.grid.get(this.explorer)
          } else {
            this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
            this.openloading = false
          }
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      }
    },
    validate (form) {
      if (this.form.nome === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        this.save(form)
      }
    },
    cleanForm () {
      this.form.id = ''
      this.form.descricao = ''
      this.form.idbanco = ''
      this.form.nomeBanco = ''
      this.form.agencia = ''
      this.form.conta = ''
      this.form.tipo = ''
      this.form.motivo = ''
    },
    read (form) {
      this.form.id = form.id
      this.form.descricao = form.descricao
      this.form.idbanco = form.idbanco
      this.form.nomeBanco = form.nomeBanco
      this.form.agencia = form.agencia
      this.form.conta = form.conta
      this.form.tipo = 0
      this.form.motivo = form.motivo

      this.openModal = true
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'conta/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data.obj)
        this.openloading = false
      })
    },
    datasearch () {
      this.ds.grid = ['ID', 'nome', 'Codigo']
      this.explorerflex.route = 'exp_banco'
      this.ds.title = 'Bancos'
      this.$refs.expl.dataSearch(this.explorerflex, 1, 1)
      this.open = true
    },
    destroy (registro, params) {
      this.form.nomeBanco = registro.nome
      this.form.idbanco = registro.id
      this.open = false
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

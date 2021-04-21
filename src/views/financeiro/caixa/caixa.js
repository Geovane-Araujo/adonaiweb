import { mapState } from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import adonai from '../../../http/router'
import rel from '../../../util/utilClass'

export default {
  data () {
    return {
      openModal: false,
      open: false,
      openloading: false,
      caixa: [],
      ds: {
        grid: [],
        title: ''
      },
      tipo: 1,
      status: 1,
      explorer: {
        route: 'menu_pessoas_caixa',
        pagina: 1,
        criterios: 'order by id desc'
      },
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        nome: '',
        codigo: '',
        idbanco: '',
        descricao: '',
        idusuario: '',
        usuariospermissoes: [
          {
            id: '',
            idusuario: '',
            idcaixa: '',
            permissao: '',
            nome: ''
          }
        ]
      },
      selected: [
        {
          id: '',
          idUsuario: '',
          idcaixa: '',
          permissao: '',
          nome: ''
        }
      ]
    }
  },
  mounted () {
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      if (form.del === true && form.id < 0) {
        this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Não é permitido Excluir Registros Padrões do Sistema', life: 5000 })
      } else {
        await axios.post(adonai.url + 'caixa', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com Sucesso', life: 5000 })
            this.cleanForm()
            this.openModal = false
            this.openloading = false
            this.$refs.grid.get(this.explorer)
          } else {
            this.openloading = false
            this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
          }
        }).catch(err => {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        })
      }
    },
    validate (form, quitar) {
      if (this.form.descricao === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios (Descricao)', life: 5000 })
      } else {
        for (this.selected in form.usuariospermissoes) {
          if (form.usuariospermissoes[this.selected].permissao === false) {
            form.usuariospermissoes[this.selected].permissao = 0
          } else if (form.usuariospermissoes[this.selected].permissao === true) {
            form.usuariospermissoes[this.selected].permissao = 1
          }
        }
        this.save(form)
      }
    },
    getusers () {
      axios.get(adonai.url + 'users', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.form.usuariospermissoes = res.data
        this.openloading = false
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    datasearch (route) {
      rel.explorerflex.route = 'exp_contabancaria'
      rel.explorerflex.criterios = 'ORDER BY ID DESC'
      this.ds.grid = ['ID', 'descricao']
      this.ds.title = 'Contas Bancárias'
      this.$refs.cmp.dataSearch(rel.explorerflex, 1, 1)
      this.open = true
    },
    cleanForm () {
      this.form.add = true
      this.form.edit = false
      this.form.del = false
      this.form.id = ''
      this.form.descricao = ''
      this.form.nome = ''
      this.form.codigo = ''
      this.form.idbanco = ''
      this.form.descricao = ''
      this.form.idusuario = ''
      this.form.usuariospermissoes = []
    },
    read (form) {
      this.form.add = false
      this.form.edit = true
      this.form.del = false
      this.form.id = form.id
      this.form.descricao = form.descricao
      this.form.nome = form.nome
      this.form.codigo = form.codigo
      this.form.idbanco = form.idbanco
      this.form.descricao = form.descricao
      this.form.idusuario = form.idusuario
      this.form.usuariospermissoes = form.usuariospermissoes
      this.openModal = true
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'caixabyid/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data.obj)
        this.openloading = false
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    destroy (registro, params) {
      this.form.nome = registro.descricao
      this.form.idbanco = registro.id
      this.open = false
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

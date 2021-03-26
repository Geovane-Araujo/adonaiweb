import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import adonai from '../../../http/router'
import axios from 'axios'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    resize: 50,
    open: false,
    explorer: {
      route: 'menu_pessoas_usuarios',
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
      del: false,
      id: '',
      login: '',
      nome: '',
      senha: '',
      confirmarSenha: '',
      motivo: '',
      foto: '',
      retorno: '',
      idPessoa: '',
      permissaoUsuario: {
        idPessoa: 0,
        membro: 0,
        despesas: 0,
        entradas: 0,
        caixa: 0,
        multiIgreja: 0,
        usuarios: 0,
        relatorios: 0
      }
    },
    img: ''
  }),
  mounted () {
    this.onResize()
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'usuario', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.$toastr.success('Salvo com Sucesso', 'Cadastro de Igrejas', util.toast)
          this.openloading = false
          this.openModal = false
          this.$refs.grid.get(this.explorer)
        } else {
          this.$toastr.error(res.data.motivo, 'Falha ao Salvar', util.toast)
          this.openloading = false
        }
      })
    },
    getImg (e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.form.pathimg = e.target.result
      }
    },
    validate (form) {
      if (this.form.nome === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        this.save(form)
      }
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'usuariobyid/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (id === -100) {
          this.form = res.data.obj
          this.img = adonai.urli + this.form.foto
        } else {
          this.form = res.data.obj
          this.form.add = false
          this.form.edit = true
          this.img = adonai.urli + this.form.foto
        }
        this.openModal = true
        this.openloading = false
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.resize = 100
      } else {
        this.resize = 60
      }
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  props: {
    usuarios: { type: Object, required: false }
  },
  components: {
    Dialog,
    Button
  }
}

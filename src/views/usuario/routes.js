import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import adonai from '../router/services'
import axios from 'axios'

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    open: false,
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
      senha: '',
      confirmarSenha: '',
      motivo: '',
      retorno: '',
      idpessoa: '',
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
    usuarios: []
  }),
  mounted () {
    this.openloading = true
    this.get()
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'usuario', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data === 'success') {
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.$toastr.success(this.status, 'Cadastro de Igrejas', util.toast)
          this.get(1)
          this.clean()
          this.openloading = true
          this.openModal = false
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
          this.openloading = true
        }
      })
    },
    validate (form) {
      if (this.form.nome === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        this.save(form)
      }
    },
    clean (form) {
      form.edit = false
      form.del = false
      form.add = true
      form.id = ''
      form.idpessoa = ''
      form.login = ''
      form.senha = ''
      form.confirmarSenha = ''
      form.permissaoUsuario.idPessoa = 0
      form.permissaoUsuario.membro = 0
      form.permissaoUsuario.despesas = 0
      form.permissaoUsuario.entradas = 0
      form.permissaoUsuario.caixa = 0
      form.permissaoUsuario.multiIgreja = 0
      form.permissaoUsuario.relatorios = 0
      form.permissaoUsuario.usuarios = 0
    },
    read (form) {
      this.form.id = form.id
      this.form.login = form.login
      this.form.senha = form.senha
      this.form.idpessoa = form.idpessoa
      this.form.permissaoUsuario.idPessoa = form.permissaoUsuario.idPessoa
      this.form.confirmarSenha = form.confirmarSenha
      this.form.permissaoUsuario.membro = form.permissaoUsuario.membro
      this.form.permissaoUsuario.despesas = form.permissaoUsuario.despesas
      this.form.permissaoUsuario.entradas = form.permissaoUsuario.entradas
      this.form.permissaoUsuario.caixa = form.permissaoUsuario.caixa
      this.form.permissaoUsuario.multiIgreja = form.permissaoUsuario.multiIgreja
      this.form.permissaoUsuario.relatorios = form.permissaoUsuario.relatorios
      this.form.permissaoUsuario.usuarios = form.permissaoUsuario.usuarios
      this.openModal = true
    },
    get () {
      axios.get(adonai.url + 'usuario/' + 1 + '/a', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.usuarios = res.data
        this.openloading = false
      })
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'usuariobyid/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.read(res.data)
        this.openloading = false
      })
    }
  },
  computed: {
    ...mapState('usuario', ['usuario']),
    ...mapState('auth', ['user'])
  },
  props: {
    usuarios: { type: Object, required: false }
  }
}

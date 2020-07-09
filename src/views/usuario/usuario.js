import { mapActions, mapState } from 'vuex'
import util from '../../assets/scss/util'

export default {
  data: () => ({
    openModal: false,
    deleteModal: false,
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
    }
  }),
  mounted () {
    this.ActionSetUsuario()
  },
  methods: {
    ...mapActions('usuario', ['ActionSetUsuario']),
    ...mapActions('usuario', ['SalvarUsuario']),
    async submit () {
      try {
        await this.SalvarUsuario(this.form)
        this.ActionSetUsuario()

        if (this.form.add === true) {
          this.status = 'Salvo com Sucesso'
        } else if (this.form.edit === true) {
          this.status = 'Alterado com Sucesso'
          this.openModal = false
        } else {
          this.status = 'Excluido com Sucesso'
        }
        this.$toastr.success(this.status, 'Cadastro de Clientes', util.toast)
        this.limparCampos(this.form)
      } catch (err) {
        this.$toastr.error(err, 'Cadastro de Usuários', util.toast)
      }
    },
    limparCampos (form) {
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
    povoar (form) {
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
    }
  },
  computed: {
    ...mapState('usuario', ['usuario'])
  },
  props: {
    usuarios: { type: Object, required: false }
  }
}

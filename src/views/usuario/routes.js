import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import adonai from '../router/services'
import axios from 'axios'

export default {
  data: () => ({
    openModal: false,
    openloading: false,
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
      pathimg: '',
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
    }
  }),
  mounted () {
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'usuario', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.$toastr.success(this.status, 'Cadastro de Igrejas', util.toast)
          this.clean(form)
          this.openloading = false
          this.openModal = false
          this.$refs.grid.get(this.explorer)
        } else {
          this.$toastr.error(res.data.motivo, 'Falha ao Salvar', util.toast)
          this.openloading = false
        }
      })
    },
    previewFiles (e) {
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
    clean (form) {
      form.edit = false
      form.del = false
      form.add = true
      form.id = ''
      form.idPessoa = ''
      form.login = ''
      form.nome = ''
      form.senha = ''
      form.pathimg = ''
      form.confirmarSenha = ''
      form.permissaoUsuario.idPessoa = 1
      form.permissaoUsuario.membro = 1
      form.permissaoUsuario.despesas = 1
      form.permissaoUsuario.entradas = 1
      form.permissaoUsuario.caixa = 1
      form.permissaoUsuario.multiIgreja = 1
      form.permissaoUsuario.relatorios = 1
      form.permissaoUsuario.usuarios = 1

      form.permissaoUsuario.visitante = 1
      form.permissaoUsuario.aniversariante = 1
      form.permissaoUsuario.congregacao = 1
      form.permissaoUsuario.novoconvertido = 1
      form.permissaoUsuario.contabancaria = 1
      form.permissaoUsuario.biblia = 1
      form.permissaoUsuario.termouso = 1
      form.permissaoUsuario.politicaprivacidade = 1
      form.permissaoUsuario.minhasfaturas = 1
      form.permissaoUsuario.notaversao = 1
      form.permissaoUsuario.agenda = 1
      form.permissaoUsuario.auditoria = 1
      form.permissaoUsuario.cargos = 1
      form.permissaoUsuario.tipoconta = 1
      form.permissaoUsuario.tipoevento = 1
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'usuariobyid/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.form = res.data.obj
        this.form.edit = true
        this.form.add = false
        this.openModal = true
        this.openloading = false
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  props: {
    usuarios: { type: Object, required: false }
  }
}

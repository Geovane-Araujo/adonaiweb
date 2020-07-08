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
      descricao: '',
      contexto: 0
    }
  }),
  mounted () {
    this.ActionSetTipoconta()
  },
  methods: {
    ...mapActions('tipoconta', ['ActionSetTipoconta']),
    ...mapActions('tipoconta', ['SalvarTipoconta']),
    async submit () {
      try {
        await this.SalvarTipoconta(this.form)
        this.ActionSetTipoconta()
        if (this.form.add === true) {
          this.status = 'Salvo com Sucesso'
        } else if (this.form.edit === true) {
          this.status = 'Alterado com Sucesso'
        } else {
          this.status = 'Excluido com Sucesso'
        }
        this.$toastr.success(this.status, 'Cadastro de Tipocontas', util.toast)
        this.limparCampos(this.form)
      } catch (err) {
        this.$toastr.warning(err, 'Falha ao Salvar', util.toast)
      }
    },
    limparCampos (form) {
      form.descricao = ''
      form.edit = false
      form.del = false
      form.add = true
      form.id = ''
      form.contexto = 0
    },
    alterar (form) {
      var a = ''
      if (form === 0) {
        a = 'Receitas'
      } else {
        a = 'Despesas'
      }
      return a
    }
  },
  computed: {
    ...mapState('tipoconta', ['tipoconta'])
  },
  props: {
    tipocontas: { type: Object, required: false }
  }
}

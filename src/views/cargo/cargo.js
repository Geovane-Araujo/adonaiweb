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
      descricao: ''
    }
  }),
  mounted () {
    this.ActionSetCargo()
  },
  methods: {
    ...mapActions('cargo', ['ActionSetCargo']),
    ...mapActions('cargo', ['SalvarCargo']),
    async submit () {
      try {
        await this.SalvarCargo(this.form)
        this.ActionSetCargo()
        if (this.form.add === true) {
          this.status = 'Salvo com Sucesso'
        } else if (this.form.edit === true) {
          this.status = 'Alterado com Sucesso'
        } else {
          this.status = 'Excluido com Sucesso'
        }
        this.$toastr.success(this.status, 'Cadastro de Cargos', util.toast)
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
    }
  },
  computed: {
    ...mapState('cargo', ['cargo'])
  },
  props: {
    cargos: { type: Object, required: false }
  }
}

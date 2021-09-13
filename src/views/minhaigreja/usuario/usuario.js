import { mapState } from 'vuex'
import adonai from '../../../http/router'
import axios from 'axios'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import utils from '../../../util/utilClass'

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
    urlimg: adonai.arquivos,
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
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com Sucesso', life: 5000 })
          this.openloading = false
          this.openModal = false
          this.$refs.grid.get(this.explorer)
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
          this.openloading = false
        }
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    getImg (e) {
      utils.uploadImg(e, this.form.idPessoa, this.user).then(res => {
        this.form.pathimg = res
      })
    },
    validate (form) {
      if (this.form.nome === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios não preenchidos', life: 5000 })
      } else {
        console.log(form)
        // form.pathimg = JSON.stringify(form.pathimg)
        this.save(form)
      }
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'usuariobyid/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
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
        } else {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
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

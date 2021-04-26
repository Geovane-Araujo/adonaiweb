import { mapState } from 'vuex'
import adonai from '../../../http/router'
import axios from 'axios'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Editor from 'primevue/editor'
import { Datetime } from 'vue-datetime'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  data: () => ({
    openModal: false,
    openloading: false,
    open: false,
    resize: 80,
    explorer: {
      route: 'menu_esbocos',
      pagina: 1,
      criterios: 'order by id desc'
    },
    config: {
      height: 500
    },
    editor: ClassicEditor,
    form: {
      add: true,
      edit: false,
      del: false,
      id: '',
      idtipo: '',
      descricao: '',
      texto: ''
    }
  }),
  mounted () {
    /* this.onResize()
    this.$refs.grid.get(this.explorer) */
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'documentoseditaveis', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.openloading = false
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com Sucesso', life: 5000 })
          this.openModal = false
          this.$refs.grid.get(this.explorer)
        } else {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    validate (form) {
      if (this.form.descricao === '') {
        this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios não preenchidos', life: 5000 })
      } else {
        this.save(form)
      }
    },
    getbyId (id) {
      this.openloading = false
      axios.get(adonai.url + 'documentoseditaveis/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.form = res.data.obj
          if (id !== -100) {
            this.form.add = false
            this.form.edit = true
          }
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
        this.openloading = false
        this.openModal = true
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.resize = 100
      } else {
        this.resize = 70
      }
    }
  },
  components: {
    Dialog,
    Button,
    InputText,
    Editor,
    datetime: Datetime
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

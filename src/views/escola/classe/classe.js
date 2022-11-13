import { mapState } from 'vuex'
import adonai from '../../../http/router'
import axios from 'axios'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { TableModel } from '../../../model/TableModel'
var a
var r

export default {
  data: () => ({
    openModal: false,
    openloading: false,
    open: false,
    alunoModal: false,
    form: {
      id: '',
      descricao: '',
      idcurso: '',
      curso: '',
      matriculados: null
    },
    matri: {
      id: '',
      nome: '',
      tipo: '',
      descricaotipo: ''
    },
    nome: '',
    tipopedido: [],
    ds: {
      grid: [],
      title: ''
    }
  }),
  mounted () {
    this.$refs.grid.get(this.onGridInitialize('menu_classe'))
  },
  methods: {
    onGridInitialize (route) {
      var filter = new TableModel()
      filter.route = route
      return filter
    },
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'classe', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com Sucesso', life: 5000 })
          this.openModal = false
          this.$refs.grid.get(this.onGridInitialize('menu_classe'))
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
    validate (form) {
      if (this.form.descricao === '') {
        this.$toast.add({ severity: 'warn', summary: 'AdonaiSoft', detail: 'Campos Obrigatórios não preenchidos', life: 5000 })
      } else {
        if (r !== undefined) {
          r.forEach(element => {
            this.form.matriculados.push(element)
          })
        }
        this.save(form)
      }
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'classe/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          this.form = res.data.obj
          if (id !== -100) {
            this.form.add = false
            this.form.edit = true
          }
          a = undefined
          this.openloading = false
          this.openModal = true
        } else {
          this.openloading = false
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
      }).catch(err => {
        this.openloading = false
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    datasearch (route) {
      if (route === 0) {
        this.ds.title = 'Cursos'
        this.$refs.expl.dataSearch(this.onGridInitialize('menu_curso'), route, 0)
      } else if (route === 1 || route === 2) {
        this.ds.title = 'Membro'
        this.$refs.expl.dataSearch(this.onGridInitialize('exp_membro'), route, 1)
      }
    },
    destroy (registro, params) {
      if (params === 0) {
        this.form.curso = registro.descricao
        this.form.idcurso = registro.id
      } else if (params === 1) {
        params = {
          idpessoa: registro.id,
          nome: registro.nome,
          descricaoTipo: 'Aluno',
          tipo: 0,
          add: true,
          del: false
        }
        if (this.form.matriculados === null) {
          if (a === undefined) {
            a = []
            a.push(params)
          } else {
            a.push(params)
          }
          this.form.matriculados = a
        } else {
          this.form.matriculados.push(params)
        }
      } else if (params === 2) {
        params = {
          idpessoa: registro.id,
          nome: registro.nome,
          descricaoTipo: 'Professor',
          tipo: 1,
          add: true,
          del: false
        }
        if (this.form.matriculados === null) {
          if (a === undefined) {
            a = []
            a.push(params)
          } else {
            a.push(params)
          }
          this.form.matriculados = a
        } else {
          this.form.matriculados.push(params)
        }
      }
    },
    del (data) {
      if (r === undefined) {
        r = []
        r.push(data)
      } else {
        r.push(data)
      }
      var i = 0
      var indice = 0
      this.form.matriculados.forEach(element => {
        if (element === data) {
          indice = i
        }
        i++
      })
      this.form.matriculados.splice(indice, 1)
    }
  },
  components: {
    Dialog,
    Button,
    InputText,
    DataTable,
    Column
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

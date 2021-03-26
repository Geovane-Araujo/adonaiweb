import { mapState } from 'vuex'
import util from '../../../assets/scss/util'
import adonai from '../../../http/router'
import axios from 'axios'
import utc from '../../../util/utilClass'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
var r
var a
export default {
  data () {
    return {
      openModal: false,
      deleteModal: false,
      openloading: false,
      resize: 50,
      mobileI: 'Imprimir',
      mobileF: 'Filtrar',
      openConfiguration: false,
      mult: false,
      titleMult: 'AdonaiSoft',
      open: false,
      ds: {
        grid: [],
        title: ''
      },
      status: '',
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        nome: '',
        idPessoa: '',
        observacoes: '',
        imagem: [],
        cnpjcpf: '',
        pathimg: '',
        pastorResponsavel: '',
        secretario: '',
        tesoureiro: '',
        tipo: 0,
        foto: '',
        igrejaSede: '',
        filiais: [],
        textoRelatorio: '',
        smtp: '',
        porta: '',
        emailmala: '',
        senha: '',
        usuario: '',
        autenticacao: 'Não Requer',
        fone: '',
        vice: '',
        presidente: '',
        campoEclesiastico: null,
        endereco: [
          {
            id: '',
            idPessoa: '',
            endereco: '',
            bairro: '',
            idCidade: 0,
            cidade: '',
            numero: '',
            uf: '',
            cep: '',
            complemento: '',
            tipo: 0
          },
          {
            id: '',
            idPessoa: '',
            endereco: '',
            bairro: '',
            idCidade: 0,
            cidade: '',
            numero: '',
            uf: '',
            cep: '',
            complemento: '',
            tipo: 1
          }
        ],
        telefone: [
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 0
          },
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 1
          },
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 2
          },
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 3
          },
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 4
          },
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 5
          }
        ],
        email: [
          {
            id: '',
            iPpessoa: '',
            email: '',
            tipo: 0
          },
          {
            id: '',
            iPpessoa: '',
            email: '',
            tipo: 1
          },
          {
            id: '',
            iPpessoa: '',
            email: '',
            tipo: 2
          },
          {
            id: '',
            iPpessoa: '',
            email: '',
            tipo: 3
          }
        ],
        pessoaIgrejaPlanos: {
          id: '',
          multiigreja: '',
          celula: '',
          idpessoa: ''
        }
      },
      configuration: {
        textocertificado: '',
        modelocarteira: '',
        modelocertificado: ''
      },
      campoecle: {
        id: '',
        nome: ''
      },
      img: ''
    }
  },
  mounted () {
    utc.explorer.route = 'menu_pessoas_igreja'
    utc.explorer.pagina = 1
    utc.explorer.criterios = ' order by id desc'
    this.$refs.grid.get(utc.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'igreja', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret !== undefined && res.data.ret === 'success') {
          this.openloading = false
          this.openModal = false
          utc.explorer.route = 'menu_pessoas_igreja'
          utc.explorer.pagina = 1
          utc.explorer.criterios = ' order by id desc'
          this.$refs.grid.get(utc.explorer)
          this.$toastr.success('Salvo com Sucesso', 'AdonaiSoft Diz:', util.toast)
        } else {
          this.$toastr.error(res.data.motivo, 'Falha ao Salvar', util.toast)
          this.openloading = true
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    },
    validate (doc, tipo, form) {
      if (this.form.nome === '') {
        this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
      } else {
        if (r !== undefined) {
          r.forEach(element => {
            this.form.campoEclesiastico.push(element)
          })
        }
        this.save(form)
      }
    },
    getImg (e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.form.pathimg = e.target.result
      }
    },
    imprimir (relatorio) {
      utc.imprimir(relatorio)
    },
    globais (tipo) {
      this.openloading = true
      if (tipo === 1) {
        axios.post(adonai.url + 'configuracoes', this.configuration, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          this.openloading = false
          if (res.data.ret === 'success') {
            this.$toastr.success('Salvo com Sucesso', 'AdonaiSoft Diz:', util.toast)
            this.openConfiguration = false
          } else {
            this.$toastr.success(res.data.motivo, 'AdonaiSoft Diz:', util.toast)
          }
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      } else {
        axios.get(adonai.url + 'configuracoes/0', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          this.configuration = res.data.obj
          this.openConfiguration = true
          this.openloading = false
        }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
      }
    },
    buscarcep (cep, form, local) {
      cep = cep.replace('-', '')
      axios.get(adonai.url + 'cep/' + cep, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'unsuccess') {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz: ', util.toast)
        } else {
          if (local === 1) {
            form.endereco[0].endereco = res.data.obj.logradouro
            form.endereco[0].bairro = res.data.obj.bairro
            form.endereco[0].cidade = res.data.obj.localidade
            form.endereco[0].uf = res.data.obj.uf
            form.endereco[0].idCidade = res.data.obj.idCidade
          } else {
            form.endereco[1].endereco = res.data.obj.logradouro
            form.endereco[1].bairro = res.data.obj.bairro
            form.endereco[1].cidade = res.data.obj.localidade
            form.endereco[1].uf = res.data.obj.uf
            form.endereco[1].idCidade = res.data.obj.idCidade
          }
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz: ', util.toast))
    },
    getbyId (id) {
      this.onResize()
      this.openloading = true
      axios.get(adonai.url + 'igreja/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        var planos = this.form.pessoaIgrejaPlanos
        if (id === -100) {
          this.form = res.data.obj
          this.form.pessoaIgrejaPlanos = planos
          this.img = adonai.urli + 'avatar.png'
          a = []
          r = []
        } else {
          if (this.user.auth !== '9999') {
            this.form = res.data.obj
            this.form.pessoaIgrejaPlanos = planos
            this.mult = true
            this.titleMult = ''
          } else {
            this.form = res.data.obj
          }
          this.form.add = false
          this.form.edit = true
          this.img = adonai.urli + this.form.foto
          a = []
          r = []
        }
        this.openModal = true
        this.openloading = false
      }).catch(err => util.error(err))
    }, // params serve pra qualquer coisa que precisa mandar seja um id ou um critério
    datasearch (route, params) {
      if (route === 1) {
        utc.explorerflex.route = 'exp_municipio'
        utc.explorerflex.criterios = 'ORDER BY ID DESC'
        this.ds.grid = ['id', 'nome', 'uf']
        this.ds.title = 'Cidades'
        this.$refs.expl.dataSearch(utc.explorerflex, 1, params)
        this.open = true
      } else if (route === 2) {
        utc.explorerflex.route = 'exp_campoeclesiastico'
        utc.explorerflex.criterios = 'ORDER BY ID DESC'
        utc.explorerflex.pagina = 1
        this.ds.title = 'Igrejas'
        this.ds.grid = ['id', 'nome']
        this.$refs.expl.dataSearch(utc.explorerflex, 2, 2)
        this.open = true
      }
    },
    destroy (registro, params, e) {
      if (params === 1) {
        this.form.endereco[e].cidade = registro.nome
        this.form.endereco[e].idCidade = registro.id
      } else if (params === 2) {
        params = {
          idsede: this.form.idPessoa,
          nome: registro.nome,
          idfilial: registro.id,
          add: true,
          del: false
        }
        if (this.form.campoEclesiastico === null || this.form.campoEclesiastico === undefined) {
          if (a === undefined) {
            a = []
            a.push(params)
          } else {
            a.push(params)
          }
          this.form.campoEclesiastico = a
        } else {
          this.form.campoEclesiastico.push(params)
        }
      }
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.resize = 100
        this.mobileF = ''
        this.mobileI = ''
      } else {
        this.resize = 65
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
      this.form.campoEclesiastico.forEach(element => {
        if (element === data) {
          indice = i
        }
        i++
      })
      this.form.campoEclesiastico.splice(indice, 1)
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

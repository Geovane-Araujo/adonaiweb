import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../router/services'
import axios from 'axios'
var moment = require('moment')
var data = new Date()

export default {
  data () {
    return {
      openModal: false,
      deleteModal: false,
      openloading: false,
      open: false,
      explorer: {
        route: 'menu_pessoa_membros',
        pagina: 1,
        criterios: 'order by id desc'
      },
      explorerflex: {
        route: '',
        pagina: 1,
        criterios: 'order by id desc'
      },
      ds: {
        grid: [],
        title: ''
      },
      campocidade: 0,
      status: '',
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        nome: '',
        idPessoa: '',
        dataNascimento: '',
        ativo: '',
        idCargo: '',
        cargo: '',
        observacoes: '',
        dataBatismo: '',
        estadoCivil: null,
        pathimg: '',
        batizado: '',
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
          }
        ],
        criterios: {
          criterios: ''
        },
        retorno: '',
        motivo: '',
        moment: moment(data).format('YYYY-MM-DD h:mm:ss')
      },
      a: null
    }
  },
  mounted () {
    this.$refs.grid.get(this.explorer)
  },
  methods: {
    async save (form) {
      this.openloading = true
      await axios.post(adonai.url + 'membro', form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data.ret === 'success') {
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.$toastr.success(this.status, 'Cadastro de Igrejas', util.toast)
          this.openModal = false
          this.openloading = false
          this.$refs.grid.get(this.explorer)
          this.cleanForm(form)
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
          this.openloading = false
        }
      })
    },
    cleanForm (form) {
      form.id = ''
      form.nome = ''
      form.idPessoa = ''
      form.dataNascimento = ''
      form.ativo = ''
      form.idCargo = ''
      form.cargo = ''
      form.observacoes = ''
      form.dataBatismo = ''
      form.estadoCivil = null
      form.pathimg = ''
      form.batizado = ''

      form.endereco[0].id = ''
      form.endereco[0].idPessoa = ''
      form.endereco[0].endereco = ''
      form.endereco[0].bairro = ''
      form.endereco[0].idCidade = ''
      form.endereco[0].cidade = ''
      form.endereco[0].numero = ''
      form.endereco[0].uf = ''
      form.endereco[0].cep = ''
      form.endereco[0].complemto = ''
      form.endereco[0].tipo = 0

      form.endereco[1].id = ''
      form.endereco[1].idPessoa = ''
      form.endereco[1].endereco = ''
      form.endereco[1].bairro = ''
      form.endereco[1].idCidade = ''
      form.endereco[1].cidade = ''
      form.endereco[1].numero = ''
      form.endereco[1].uf = ''
      form.endereco[1].cep = ''
      form.endereco[1].complemto = ''
      form.endereco[1].tipo = 1

      form.telefone[0].id = ''
      form.telefone[0].idPessoa = ''
      form.telefone[0].telefone = ''
      form.telefone[0].tipo = 0

      form.telefone[1].id = ''
      form.telefone[1].idPessoa = ''
      form.telefone[1].telefone = ''
      form.telefone[1].tipo = 1

      form.telefone[2].id = ''
      form.telefone[2].idPessoa = ''
      form.telefone[2].telefone = ''
      form.telefone[2].tipo = 2

      form.email[0].id = ''
      form.email[0].idPessoa = ''
      form.email[0].email = ''
      form.email[0].tipo = 0

      form.email[1].id = ''
      form.email[1].idPessoa = ''
      form.email[1].email = ''
      form.email[1].tipo = 1

      form.retorno = ''
      form.motivo = ''
    },
    povoar (form) {
      this.form.id = form.id
      this.form.nome = form.nome
      this.form.idPessoa = form.idPessoa
      this.form.dataNascimento = form.dataNascimento
      this.form.ativo = form.ativo
      this.form.idCargo = form.idCargo
      this.form.cargo = form.cargo
      this.form.observacoes = form.observacoes
      this.form.dataBatismo = form.dataBatismo
      this.form.estadoCivil = form.estadoCivil
      this.form.pathimg = form.pathimg
      this.form.batizado = form.batizado
      this.moment = moment(data).format('YYYY-MM-DD h:mm:ss')

      this.form.endereco[0].id = form.endereco[0].id
      this.form.endereco[0].idPessoa = form.endereco[0].idPessoa
      this.form.endereco[0].endereco = form.endereco[0].endereco
      this.form.endereco[0].bairro = form.endereco[0].bairro
      this.form.endereco[0].idCidade = form.endereco[0].idCidade
      this.form.endereco[0].cidade = form.endereco[0].cidade
      this.form.endereco[0].numero = form.endereco[0].numero
      this.form.endereco[0].uf = form.endereco[0].uf
      this.form.endereco[0].cep = form.endereco[0].cep
      this.form.endereco[0].complemto = form.endereco[0].complemto
      this.form.endereco[0].tipo = 0

      this.form.endereco[1].id = form.endereco[1].id
      this.form.endereco[1].idPessoa = form.endereco[1].idPessoa
      this.form.endereco[1].endereco = form.endereco[1].endereco
      this.form.endereco[1].bairro = form.endereco[1].bairro
      this.form.endereco[1].idCidade = form.endereco[1].idCidade
      this.form.endereco[1].cidade = form.endereco[1].cidade
      this.form.endereco[1].numero = form.endereco[1].numero
      this.form.endereco[1].uf = form.endereco[1].uf
      this.form.endereco[1].cep = form.endereco[1].cep
      this.form.endereco[1].complemto = form.endereco[1].complemto
      this.form.endereco[1].tipo = 1

      this.form.telefone[0].id = form.telefone[0].id
      this.form.telefone[0].idPessoa = form.telefone[0].idPessoa
      this.form.telefone[0].telefone = form.telefone[0].telefone
      this.form.telefone[0].tipo = 0

      this.form.telefone[1].id = form.telefone[1].id
      this.form.telefone[1].idPessoa = form.telefone[1].idPessoa
      this.form.telefone[1].telefone = form.telefone[1].telefone
      this.form.telefone[1].tipo = 1

      this.form.telefone[2].id = form.telefone[2].id
      this.form.telefone[2].idPessoa = form.telefone[2].idPessoa
      this.form.telefone[2].telefone = form.telefone[2].telefone
      this.form.telefone[2].tipo = 2

      this.form.email[0].id = form.email[0].id
      this.form.email[0].idPessoa = form.email[0].idPessoa
      this.form.email[0].email = form.email[0].email
      this.form.email[0].tipo = 0

      this.form.email[1].id = form.email[1].id
      this.form.email[1].idPessoa = form.email[1].idPessoa
      this.form.email[1].email = form.email[1].email
      this.form.email[1].tipo = 1

      this.form.retorno = ''
      this.form.motivo = ''
      this.openModal = true
    },
    validar (form) {
      if (form.nome === '') {
        this.$toastr.error('Por favor preencha o campo Nome Completo', 'Campos Inválidos', util.toast)
      } else if (form.idCargo === '') {
        this.$toastr.error('Por favor preencha o campo Cargo', 'Campos Inválidos', util.toast)
      } else {
        this.save(form)
      }
    },
    previewFiles (e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.form.pathimg = e.target.result
      }
    },
    imprimir (relatorio) {
      this.openloading = true
      axios.post(adonai.url + 'imprimir', relatorio, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.openloading = false
        var winparams = 'dependent=yes,locationbar=no,scrollbars=yes,menubar=yes,resizable,screenX=50,screenY=50,width=850,height=1050'
        var a = '<embed width=100% height=100% type="application/pdf" src="data:application/pdf;base64,' + escape(res.data) + ' "></embed>'
        var print = window.open('', 'PDF', winparams)
        print.document.write(a)
      })
    },
    buscarcep (cep, form, local) {
      axios.get('https://viacep.com.br/ws/' + cep + '/json').then(function (response) {
        if (local === 1) {
          form.endereco[0].endereco = response.data.logradouro
          form.endereco[0].bairro = response.data.bairro
          form.endereco[0].cidade = response.data.localidade
          form.endereco[0].uf = response.data.uf
        } else {
          form.endereco[1].endereco = response.data.logradouro
          form.endereco[1].bairro = response.data.bairro
          form.endereco[1].cidade = response.data.localidade
          form.endereco[1].uf = response.data.uf
        }
      })
    },
    getbyId (id) {
      this.openloading = true
      axios.get(adonai.url + 'membro/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.povoar(res.data.obj)
        this.openloading = false
      })
    }, // params serve pra qualquer coisa que precisa mandar seja um id ou um critério
    datasearch (route, params) {
      if (route === 1) {
        this.ds.grid = ['ID', 'Nome Cidade', 'UF', '']
        this.ds.title = 'Cidades'
        this.$refs.expl.dataSearch('cidade', 1, 'a', params)
        this.open = true
      } else if (route === 2) {
        this.ds.grid = ['ID', 'Descrição']
        this.ds.title = 'Cargos'
        this.$refs.expl.dataSearch('cargos', 1, 'a')
        this.open = true
      }
    },
    destroy (route, registro, params) {
      if (route === 'cidade') {
        this.form.endereco[params].cidade = registro.cidade
        this.form.endereco[params].idCidade = registro.id
      } else {
        this.form.cargo = registro.descricao
        this.form.idCargo = registro.id
      }
      this.open = false
    },
    get () {
      this.openloading = true
      axios.get(adonai.url + 'membros/1/a', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.membros = res.data.obj
        this.openloading = false
      })
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  props: {
    membros: { type: Object, required: false },
    cargos: { type: Object, required: false }
  }
}

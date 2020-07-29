import { mapActions, mapState } from 'vuex'
import util from '../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import adonai from '../router/services'
import membro from './store/state'
import axios from 'axios'
var moment = require('moment')
var data = new Date()

export default {
  data () {
    return {
      openModal: false,
      openCidade: false,
      deleteModal: false,
      openloading: false,
      campocidade: 0,
      pagina: 1,
      fullPage: true,
      openDatasearch: false,
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
        imagem: '',
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
        retorno: '',
        motivo: '',
        moment: moment(data).format('YYYY-MM-DD h:mm:ss')
      },
      cidade: [],
      nCargos: [],
      a: null
    }
  },
  mounted () {
    this.isLoading = true
    this.ActionSetMembro()
    this.isLoading = false
  },
  methods: {
    ...mapActions('membro', ['ActionSetMembro']),
    ...mapActions('membro', ['SalvarMembro']),
    async submit () {
      try {
        await this.SalvarMembro(this.form)
        this.ActionSetMembro()
        if (this.form.add === true) {
          this.status = 'Salvo com Sucesso'
        } else if (this.form.edit === true) {
          this.status = 'Alterado com Sucesso'
        } else {
          this.status = 'Excluido com Sucesso'
        }
        this.$toastr.success(this.status, 'Cadastro de Membros', util.toast)
        this.limparCampos(this.form)
        if (this.form.edit) {
          this.openModal = false
        }
      } catch (err) {
        this.$toastr.error(err, 'Falha ao Salvar', util.toast)
      }
    },
    limparCampos (form) {
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
      form.imagem = ''
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
      this.form.imagem = form.imagem
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
        this.submit()
      }
    },
    previewFiles: function () {
      var file = document.querySelector('input[type=file]').files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        this.a = e.target.result
        sessionStorage.setItem('img', this.a)
      }
    },
    img: function () {
      this.a = sessionStorage.getItem('img')
      this.form.imagem = this.a
      sessionStorage.setItem('img', '')
    },
    buscarCargo () {
      axios.get('http://192.168.1.106:8089/adonai/CargoGet', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.nCargos = res.data
      })
    },
    imprimir () {
      this.openloading = true
      axios.get(adonai.url + 'imprimir', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
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
    buscarCidade (pagina) {
      axios.get('http://192.168.1.106:8089/adonai/cidade/' + pagina, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.cidade = res.data
      })
    },
    buscarCidadeKey (cidade) {
      axios.get('http://192.168.1.106:8089/adonai/cidadekey/' + cidade, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.cidade = res.data
      })
    },
    buscarmembro (id) {
      axios.get('http://192.168.1.106:8089/adonai/membro/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.povoar(res.data)
      })
    },
    b (pagina) {
      membro.reloadmembro(pagina, this.user.token)
    }
  },
  computed: {
    ...mapState('membro', ['membro']),
    ...mapState('cargo', ['cargo']),
    ...mapState('auth', ['user'])
  },
  props: {
    membros: { type: Object, required: false },
    cargos: { type: Object, required: false }
  }
}

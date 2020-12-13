import util from '../assets/scss/util'
import axios from 'axios'
import adonai from '../http/router'

export default {
  report: {
    relatorio: '',
    simpleObjects: '',
    simpleObjects1: '',
    simpleObject2: ''
  },
  explorer: {
    route: '',
    pagina: 1,
    criterios: 'order by id desc'
  },
  explorerflex: {
    route: '',
    pagina: 1,
    criterios: 'order by id desc'
  },
  methods: {
    async imprimir (relatorio, token) {
      await axios.post(adonai.url + 'imprimir', relatorio, { headers: { Authorization: 'Bearer ' + token } }).then(res => {
        window.open(res.data)
        return false
      }).catch(err => util.error(err))
    },
    async onSearchCep (cep, form, local, token) {
      cep = cep.replace('-', '')
      await axios.get(adonai.url + 'cep/' + cep, { headers: { Authorization: 'Bearer ' + token } }).then(res => {
        if (res.data.ret === 'unsuccess') {
          this.$toastr.error(res.data.motivo, 'AdonaiSoft Diz: ', util.toast)
        } else {
          form.endereco[local].endereco = res.data.obj.logradouro
          form.endereco[local].bairro = res.data.obj.bairro
          form.endereco[local].cidade = res.data.obj.localidade
          form.endereco[local].uf = res.data.obj.uf
          form.endereco[local].idCidade = res.data.obj.idCidade
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz: ', util.toast))
    },
    async previewFiles (e, form, token) {
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        form.foto = e.target.result
        axios.post(adonai.url + 'base64toimage', form, { headers: { Authorization: 'Bearer ' + token } }).then(res => {
          form.img = adonai.urli + res.data
          form.foto = res.data
        }).catch(err => util.error(err))
      }
    }
  }
}

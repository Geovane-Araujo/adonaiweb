import util from '../assets/scss/util'
import axios from 'axios'
import adonai from '../http/router'

export default {
  report: {
    relatorio: '',
    ID: 0,
    IDRelation: 0,
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
        var pdfWindow = window.open('')
        pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(res.data) + "'></iframe>")
        return false
      }).catch(err => util.error(err))
    },
    previewFiles (e, pathimg) {
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        pathimg = e.target.result
        return pathimg
      }
    },
    getImg (e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.form.pathimg = e.target.result
        /* axios.post(adonai.url + 'base64toimage', this.form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          this.openloading = false
          this.img = adonai.urli + res.data.obj
          // this.form.foto = res.data.obj
        }).catch(err => util.error(err)) */
      }
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
    randomColor () {
      var hexadecimais = '0123456789ABCDEF'
      var color = '#'
      var i = 0
      while (i < 6) {
        color += hexadecimais[Math.floor(Math.random() * 16)]
        i++
      }
      return color
    },
    splitString (str) {
      var abrevicao = ''
      var arrNome = str.split(' ')
      arrNome.forEach(element => {
        var tm = element.length
        if (tm >= 3) {
          abrevicao += element.substr(0, 1)
        }
      })
      return abrevicao
    },
    LightenDarkenColor (col, amt) {
      var usePound = false
      if (col[0] === '#') {
        col = col.slice(1)
        usePound = true
      }

      var num = parseInt(col, 16)

      var r = (num >> 16) + amt

      if (r > 255) r = 255
      else if (r < 0) r = 0

      var b = ((num >> 8) & 0x00FF) + amt

      if (b > 255) b = 255
      else if (b < 0) b = 0

      var g = (num & 0x0000FF) + amt

      if (g > 255) g = 255
      else if (g < 0) g = 0

      return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
    },
    inserirNomeArray (nomeIgreja, objArray) {
      nomeIgreja.forEach(element => {
        objArray.push(this.splitString(element))
      })
    },
    inserirObjectDuoChart (data, label, cor, type) {
      var objectChart
      if (type === 1) {
        objectChart = {
          label: [],
          backgroundColor: [],
          data: []
        }
        objectChart.data = data
        objectChart.backgroundColor = cor
        objectChart.label = label
      } else {
        objectChart = {
          label: [],
          backgroundColor: [],
          data: [],
          fill: false,
          borderColor: []
        }
        objectChart.data = data
        objectChart.backgroundColor = cor
        objectChart.label = label
        objectChart.borderColor = cor
      }
      return objectChart
    }
  }
}

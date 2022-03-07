import axios from 'axios'
import adonai from '../http/router'
var moment = require('moment')

async function uploadImg (e, iduser, iddb) {
  var formdata = new FormData()
  formdata.append('file', e.target.files[0])
  var ret = ''
  await axios.post('https://arquivos.adonaisoft.com.br/upload?db=' + iddb.auth + '&iduser=' + iduser, formdata, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
    ret = res.data
  }).catch(err => this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 }))
  return ret
}

async function getCoordenadas () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(exibeGeo)
  } else {
    return null
  }
}

async function exibeGeo (posicao) {
  var coordinates = [posicao.coords.longitude, posicao.coords.latitude]
  sessionStorage.setItem('local', JSON.stringify(coordinates))
}

export default {
  getCoordenadas,
  uploadImg,
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
    criterios: ' ',
    order: ' order by id desc'
  },
  explorerflex: {
    route: '',
    pagina: 1,
    criterios: ' ',
    order: ' order by id desc'
  },
  methods: {
    async imprimir (relatorio, token) {
      await axios.post(adonai.url + 'imprimir', relatorio, { headers: { Authorization: 'Bearer ' + token } }).then(res => {
        window.open(adonai.urlArquivo + res.data)
        return false
      })
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
    validateData (form) {
      if (form === 'Invalid date') {
        return null
      } else if (form !== '' && form !== null) {
        form = moment(moment(form).add(1, 'days').toDate()).format('YYYY-MM-DD')
        return form
      }
    },
    async getImg (e, iduser, iddb) {
      var file = e.target.files[0]
      await axios.post('http://arquivos.adonaisoft.com.br/upload?db=' + iddb + '&iduser=' + iduser, file, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
        console.log(res.data)
        return res.data
      }).catch(err => this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 }))
    },
    async onSearchCep (cep, form, local, token) {
      cep = cep.replace('-', '')
      await axios.get(adonai.url + 'cep/' + cep, { headers: { Authorization: 'Bearer ' + token } }).then(res => {
        if (res.data.ret === 'unsuccess') {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        } else {
          form.endereco[local].endereco = res.data.obj.logradouro
          form.endereco[local].bairro = res.data.obj.bairro
          form.endereco[local].cidade = res.data.obj.localidade
          form.endereco[local].uf = res.data.obj.uf
          form.endereco[local].idCidade = res.data.obj.idCidade
        }
      }).catch(err => this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 }))
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
    onYear (years) {
      var i = 2015
      while (i < 2030) {
        var ano = {
          text: i.toString(),
          value: i
        }
        years.push(ano)
        i++
      }
    },
    onMonth (month) {
      month = [
        {
          text: 'Todos',
          value: 0
        },
        {
          text: 'Janeiro',
          value: 1
        },
        {
          text: 'Fevereiro',
          value: 2
        },
        {
          text: 'Março',
          value: 3
        },
        {
          text: 'Abril',
          value: 4
        },
        {
          text: 'Maio',
          value: 5
        },
        {
          text: 'Junho',
          value: 6
        },
        {
          text: 'Julho',
          value: 7
        },
        {
          text: 'Agosto',
          value: 8
        },
        {
          text: 'Setembro',
          value: 9
        },
        {
          text: 'Outubro',
          value: 10
        },
        {
          text: 'Novembro',
          value: 11
        },
        {
          text: 'Dezembro',
          value: 12
        }
      ]
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

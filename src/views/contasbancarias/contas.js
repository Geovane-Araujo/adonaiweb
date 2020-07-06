var moment = require('moment')
var data = new Date()

var form = {
  add: true,
  edit: false,
  del: false,
  id: '',
  descricao: '',
  idbanco: '',
  nomeBanco: '',
  agencia: '',
  conta: '',
  tipo: '',
  motivo: '',
  moment: moment(data).format('YYYY-MM-DD h:mm:ss')
}

export default { form }

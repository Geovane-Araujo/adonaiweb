var url = ''
var arquivos = 'https://arquivos.adonaisoft.com.br/static/images'
// var arquivos = 'http://localhost:5000/static/images'
if (window.location.hostname === 'localhost') {
  url = 'http://localhost:8089/adonai/'
} else {
  url = 'https://adonaisoft.com:8089/adonai/'
}
export default {
  url,
  arquivos
}

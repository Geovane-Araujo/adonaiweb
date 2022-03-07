var url = ''
var urlService = ''
var urlArquivo = ''
var arquivos = 'https://arquivos.adonaisoft.com.br/static/images'
if (window.location.hostname === 'localhost') {
  url = 'http://localhost:8089/adonai/'
  urlService = 'http://localhost:8089/'
  urlArquivo = 'http://localhost:8089/temp/'
} else {
  url = 'https://adonaisoft.com:8089/adonai/'
  urlService = 'https://adonaisoft.com:8089/'
  urlArquivo = 'https://adonaisoft.com:8089/temp/'
}
export default {
  url,
  arquivos,
  urlArquivo,
  urlService
}

export class ServiceRoutes{

    constructor(){
        this.getUrl()
    }

    url = ''
    urlService = ''
    urlArquivo = ''
    arquivos = 'https://arquivos.adonaisoft.com.br/static/images'

    getUrl(){
        if (window.location.hostname === 'localhost') {
            this.url = 'http://localhost:8089/adonai/'
            this.urlService = 'http://localhost:8089/'
            this.urlArquivo = 'http://localhost:8089/temp/'
        } else {
            this.url = 'https://adonaisoft.com:8089/adonai/'
            this.urlService = 'https://adonaisoft.com:8089/'
            this.urlArquivo = 'https://adonaisoft.com:8089/temp/'
        }
    }
}
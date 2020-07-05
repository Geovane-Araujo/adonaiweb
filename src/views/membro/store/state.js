import axios from 'axios'

export default {
  membro: [],
  reloadmembro (pagina, token) {
    axios.get('http://192.168.1.106:8089/adonai/membros/' + pagina, { headers: { Authorization: 'Bearer ' + token } }).then(res => {
      this.membro = res.data
    })
  }
}

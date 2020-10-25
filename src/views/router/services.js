import util from '../../assets/scss/util'
import axios from 'axios'
var url = 'http://192.168.1.115:8089/adonai/'
// var url = 'http://192.168.88.19:8089/adonai/'
// var url = 'http://adonaisoft.tk:8089/adonai/'
export default {
  url,
  nethods: {
    get (criterios, token) {
      axios.post(url + 'aexplorer', criterios, { headers: { Authorization: 'Bearer ' + token } }).then(res => {
        if (res.data.ret === 'success') {
          return res.data.obj
        }
      }).catch(err => this.$toastr.error(err, 'AdonaiSoft Diz:', util.toast))
    }
  }
}

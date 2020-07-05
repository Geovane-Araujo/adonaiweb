import axios from 'axios'

export const buscarCidadeKey = (city, cidade, token) => {
  axios.get('http://192.168.1.106:8089/adonai/cidadekey/' + cidade, { headers: { Authorization: 'Bearer ' + token } }).then(res => {
    city = res.data
  })
  return city
}

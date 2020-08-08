import Vue from 'vue'
import VueResource from 'vue-resource'
import Services from './services'

Vue.use(VueResource)

const http = Vue.http

// http.options.root = 'http://192.168.1.192:8089/adonai/'
http.options.root = 'http://207.244.225.189:8089/adonai/'

Object.keys(Services).map(service => {
  Services[service] = Vue.resource('', {}, Services[service])
})
var auth = 'Authorization'
const Token = token => {
  http.headers.common[auth] = `Bearer ${token}`
}

export default Services
export { http, Token }

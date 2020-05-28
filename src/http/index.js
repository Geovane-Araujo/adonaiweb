import Vue from 'vue'
import VueResource from 'vue-resource'
import Services from './services'

Vue.use(VueResource)

const http = Vue.http

http.options.root = 'http://192.168.1.106:8089/adonai/'

Object.keys(Services).map(service => {
  services[service] = Vue.resouce('', {}, Services[service])
})
var auth = 'Authorization'
const Token = token => {
  http.headers.common[auth] = `Bearer ${token}`
}

export default Services
export { http, Token }

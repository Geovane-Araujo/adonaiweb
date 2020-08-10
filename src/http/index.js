import Vue from 'vue'
import VueResource from 'vue-resource'
import Services from './services'
import adonai from '../views/router/services'

Vue.use(VueResource)

const http = Vue.http

// http.options.root = 'http://localhost:8089/adonai/'
http.options.root = adonai.url

Object.keys(Services).map(service => {
  Services[service] = Vue.resource('', {}, Services[service])
})
var auth = 'Authorization'
const Token = token => {
  http.headers.common[auth] = `Bearer ${token}`
}

export default Services
export { http, Token }

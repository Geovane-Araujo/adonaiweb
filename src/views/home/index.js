import Vue from 'vue'
import Home from './Home.vue'
import Router from 'vue-router'
import routes from '../router'

Vue.use(Router)

new Vue({
  routes,
  render: h => h(Home)
}).$mount('#home')

export { default as routes } from './routes'

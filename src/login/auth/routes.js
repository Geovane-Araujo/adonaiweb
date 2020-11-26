export default [
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
  }
]

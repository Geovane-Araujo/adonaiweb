export default [
  {
    name: 'register',
    path: '/register',
    component: () => import(/* webpackChunkName: "login" */ './register.vue')
  }
]

export default [
  {
    name: 'newchurch',
    path: '/newchurch',
    component: () => import(/* webpackChunkName: "login" */ './newchurch.vue')
  }
]

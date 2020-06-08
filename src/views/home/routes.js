import dash from '../dashboard/dashboard.vue'
import home from './Home.vue'
import agenda from '../agenda/agenda.vue'
import cargo from '../cargo/cargo'

export default [
  {
    path: '/',
    name: 'home',
    component: home,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: dash
      },
      {
        path: 'agenda',
        name: 'agenda',
        component: agenda
      },
      {
        path: 'cargo',
        name: 'cargo',
        component: cargo
      }
    ]
  }
]

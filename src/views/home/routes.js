import dash from '../dashboard/dashboard.vue'
import home from './Home.vue'
import agenda from '../agenda/agenda.vue'
import cargo from '../cargo/cargo'
import cliente from '../clientes/cliente.vue'
import usuario from '../usuario/usuario.vue'

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
      },
      {
        path: 'cliente',
        name: 'cliente',
        component: cliente
      },
      {
        path: 'usuario',
        name: 'usuario',
        component: usuario
      }
    ]
  }
]

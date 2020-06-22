import dash from '../dashboard/dashboard.vue'
import home from './Home.vue'
import agenda from '../agenda/agenda.vue'
import cargo from '../cargo/cargo'
import cliente from '../clientes/cliente.vue'
import usuario from '../usuario/usuario.vue'
import tipoconta from '../tipoconta/tipoconta.vue'
import membro from '../membro/membro.vue'

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
      },
      {
        path: 'tipoconta',
        name: 'tipoconta',
        component: tipoconta
      },
      {
        path: 'membro',
        name: 'membro',
        component: membro
      }
    ]
  }
]

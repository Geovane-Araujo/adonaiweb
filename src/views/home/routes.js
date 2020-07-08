import dash from '../dashboard/dashboard.vue'
import home from './Home.vue'
import agenda from '../agenda/agenda.vue'
import cargo from '../cargo/cargo.vue'
import usuario from '../usuario/usuario.vue'
import tipoconta from '../tipoconta/tipoconta.vue'
import membro from '../membro/membro.vue'
import igreja from '../igreja/igreja.vue'
import contasbancarias from '../contasbancarias/contasbancarias.vue'
import visitantes from '../visitantes/visitantes.vue'
import aniversariantes from '../aniversariantes/aniversariantes.vue'

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
      },
      {
        path: 'igreja',
        name: 'igreja',
        component: igreja
      },
      {
        path: 'contasbancarias',
        name: 'contasbancarias',
        component: contasbancarias
      },
      {
        path: 'visitantes',
        name: 'visitantes',
        component: visitantes
      },
      {
        path: 'aniversariantes',
        name: 'aniversariantes',
        component: aniversariantes
      }
    ]
  }
]

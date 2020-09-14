import home from './Home.vue'
import cargo from '../cargo/cargo.vue'
import usuario from '../usuario/usuario.vue'
import tipoconta from '../tipoconta/tipoconta.vue'
import membro from '../membro/membro.vue'
import igreja from '../igreja/igreja.vue'
import contasbancarias from '../contasbancarias/contasbancarias.vue'
import visitantes from '../visitantes/visitantes.vue'
import aniversariantes from '../aniversariantes/aniversariantes.vue'
import novoconvertido from '../novoconvertido/novoconvertido.vue'
import congregacao from '../congregacao/congregacao.vue'
import despesas from '../duplicatas/despesas.vue'
import receitas from '../duplicatas/receitas.vue'
import caixa from '../caixa/caixa.vue'
import movimento from '../caixa/movimento.vue'
import dashboard from '../dashboard/dashboard.vue'
import agenda from '../agenda/agenda.vue'
import movimentoHistorico from '../caixa/movimentoHistorico.vue'
import eventoTipos from '../eventoagenda/eventoagenda.vue'
import termosuso from '../termosuso/termosuso.vue'
import privacidade from '../politicaprivacidade/privacidade.vue'
import minhasfaturas from '../minhasfaturas/minhasfaturas.vue'
import relatorios from '../relatorios/relatorios.vue'
import biblia from '../biblia/biblia.vue'

export default [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'dashboard', params: { name: 'dashboard' } },
    component: home,
    children: [
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
      },
      {
        path: 'novoconvertido',
        name: 'novoconvertido',
        component: novoconvertido
      },
      {
        path: 'congregacao',
        name: 'congregacao',
        component: congregacao
      },
      {
        path: 'despesas',
        name: 'despesas',
        component: despesas
      },
      {
        path: 'receitas',
        name: 'receitas',
        component: receitas
      },
      {
        path: 'caixa',
        name: 'caixa',
        component: caixa
      },
      {
        path: 'movimento',
        name: 'movimento',
        component: movimento
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: dashboard
      },
      {
        path: 'agenda',
        name: 'agenda',
        component: agenda
      },
      {
        path: 'movimentohistorico',
        name: 'movimentohistorico',
        component: movimentoHistorico
      },
      {
        path: 'eventoTipos',
        name: 'eventoTipos',
        component: eventoTipos
      },
      {
        path: 'termosuso',
        name: 'termosuso',
        component: termosuso
      },
      {
        path: 'privacidade',
        name: 'privacidade',
        component: privacidade
      },
      {
        path: 'minhasfaturas',
        name: 'minhasfaturas',
        component: minhasfaturas
      },
      {
        path: 'relatorios',
        name: 'relatorios',
        component: relatorios
      },
      {
        path: 'biblia',
        name: 'biblia',
        component: biblia
      }
    ]
  }
]

import home from './Home.vue'
import cargo from '../uteis/cargo/cargo.vue'
import usuario from '../configuracoes/usuario/usuario.vue'
import tipoconta from '../uteis/tipoconta/tipoconta.vue'
import membro from '../Secretaria/membro/membro.vue'
import igreja from '../configuracoes/igreja/igreja.vue'
import contasbancarias from '../financeiro/contasbancarias/contasbancarias.vue'
import visitantes from '../Secretaria/visitantes/visitantes.vue'
import aniversariantes from '../Secretaria/aniversariantes/aniversariantes.vue'
import novoconvertido from '../pastoral/novoconvertido/novoconvertido.vue'
import congregacao from '../Secretaria/congregacao/congregacao.vue'
import despesas from '../financeiro/duplicatas/despesas.vue'
import receitas from '../financeiro/duplicatas/receitas.vue'
import caixa from '../financeiro/caixa/caixa.vue'
import movimento from '../financeiro/caixa/movimento.vue'
import dashboard from '../outros/dashboard/dashboard.vue'
import agenda from '../outros/agenda/agenda.vue'
import movimentoHistorico from '../financeiro/caixa/movimentoHistorico.vue'
import eventoTipos from '../uteis/eventoagenda/eventoagenda.vue'
import termosuso from '../minhaAdonai/termosuso/termosuso.vue'
import privacidade from '../minhaAdonai/politicaprivacidade/privacidade.vue'
import minhasfaturas from '../minhaAdonai/minhasfaturas/minhasfaturas.vue'
import relatorios from '../relatorios/relatorios.vue'
import biblia from '../uteis/biblia/biblia.vue'
import auditoria from '../uteis/auditoria/auditoria.vue'
import notaversao from '../minhaAdonai/notasversoes/notasversoes.vue'
import pedidos from '../pastoral/pedidos/pedidos.vue'
import tipopedidos from '../uteis/tipopedido/tipopedido.vue'
import esbocos from '../pastoral/esbocos/esbocos.vue'
import curso from '../escola/curso/curso.vue'
import classe from '../escola/classe/classe.vue'
import maps from '../Secretaria/membrosMaps/membrosMaps.vue'
import tickets from '../uteis/tickets/tickets.vue'
import aula from '../escola/aula/aula.vue'
import criancas from '../Secretaria/criancas/criancas.vue'
import registroVisitantes from '../Secretaria/visitantes/registroVisita.vue'
import campoEclesiastico from '../outros/campoeclesiastico/campoeclesiastico.vue'

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
      },
      {
        path: 'auditoria',
        name: 'auditoria',
        component: auditoria
      },
      {
        path: 'notaversao',
        name: 'notaversao',
        component: notaversao
      },
      {
        path: 'pedidos',
        name: 'pedidos',
        component: pedidos
      },
      {
        path: 'tipopedidos',
        name: 'tipopedidos',
        component: tipopedidos
      },
      {
        path: 'esbocos',
        name: 'esbocos',
        component: esbocos
      },
      {
        path: 'curso',
        name: 'curso',
        component: curso
      },
      {
        path: 'classe',
        name: 'classe',
        component: classe
      },
      {
        path: 'maps',
        name: 'maps',
        component: maps
      },
      {
        path: 'tickets',
        name: 'tickets',
        component: tickets
      },
      {
        path: 'aula',
        name: 'aulas',
        component: aula
      },
      {
        path: 'criancas',
        name: 'criancas',
        component: criancas
      },
      {
        path: 'registroVisitantes',
        name: 'registroVisitantes',
        component: registroVisitantes
      },
      {
        path: 'campoEclesiastico',
        name: 'campoEclesiastico',
        component: campoEclesiastico
      }
    ]
  }
]

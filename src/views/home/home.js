import { mapState } from 'vuex'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import SplitButton from 'primevue/splitbutton'
import AutoComplete from 'primevue/autocomplete'
import Sidebar from 'primevue/sidebar'
import BlockUI from 'primevue/blockui'

export default {
  name: 'App',
  data () {
    return {
      aniversariantes: '',
      busca: '',
      mobile: true,
      colaps: false,
      sidebar: false,
      blockedDocument: false,
      permissoes: {
        membro: '',
        despesas: '',
        entradas: '',
        caixa: '',
        multiIgreja: '',
        usuarios: '',
        relatorios: ''
      },
      menu: [
        {
          header: true,
          title: 'AdonaiSoft Web',
          hiddenOnCollapse: true,
          name: sessionStorage.getItem('name'),
          path: sessionStorage.getItem('path')
        },
        {
          href: '/',
          title: 'Dashboard',
          icon: 'fas fa-poll'
        },
        {
          href: '/agenda',
          title: 'Agenda',
          icon: 'far fa-calendar-alt',
          disabled: parseInt(sessionStorage.getItem('agenda'))
        },
        {
          href: '',
          title: 'Secretaria',
          icon: 'far fa-address-book',
          child: [
            {
              href: '/membro',
              title: 'Membros',
              disabled: parseInt(sessionStorage.getItem('membro'))
            },
            {
              href: '/criancas',
              title: 'Crianças e Adolescentes'
              // disabled: parseInt(sessionStorage.getItem('visitante'))
            },
            {
              href: '',
              title: 'Visitantes',
              child: [
                {
                  href: '/visitantes',
                  title: 'Cadastro'
                },
                {
                  href: '/registroVisitantes',
                  title: 'Registro de Presença'
                }
              ],
              disabled: parseInt(sessionStorage.getItem('visitante'))
            },
            {
              href: '/aniversariantes',
              title: 'Aniversariantes',
              badge: {
                text: this.aniversariantes,
                class: 'vsm--badge_default'
              },
              disabled: parseInt(sessionStorage.getItem('aniversariante'))
            },
            {
              href: '/congregacao',
              title: 'Congregações',
              disabled: parseInt(sessionStorage.getItem('congregacao'))
            },
            {
              href: '/maps',
              title: 'Maps',
              disabled: parseInt(sessionStorage.getItem('congregacao'))
            }
          ]
        },
        {
          href: '',
          title: 'Pastoral',
          icon: 'pastoral',
          child: [
            {
              href: '/novoconvertido',
              title: 'Novos Convertidos',
              disabled: parseInt(sessionStorage.getItem('novoconvertido'))
            },
            {
              href: '/pedidos',
              title: 'Pedidos de Orações',
              disabled: false
            },
            {
              href: '/esbocos',
              title: 'Esbocos e Estudos'
            }
          ]
        },
        {
          title: 'Campo Eclesiastico',
          icon: 'far fa-chart-bar',
          href: '/campoEclesiastico',
          hidden: false
        },
        {
          title: 'Escola',
          hidden: false,
          icon: 'fas fa-graduation-cap',
          child: [
            {
              href: '/curso',
              title: 'Cursos'
            },
            {
              href: '/classe',
              title: 'Classes',
              disabled: false
            },
            {
              href: '/aula',
              title: 'Registro de Aulas',
              disabled: false
            }
          ]
        },
        {
          href: '',
          title: 'Financeiro',
          icon: 'fas fa-hand-holding-usd',
          child: [
            {
              href: '/receitas',
              title: 'Entradas',
              disabled: parseInt(sessionStorage.getItem('entradas'))
            },
            {
              href: '/despesas',
              title: 'Despesas',
              disabled: parseInt(sessionStorage.getItem('despesas'))
            },
            {
              href: '',
              title: 'Caixas',
              disabled: parseInt(sessionStorage.getItem('caixa')),
              child: [
                {
                  href: '/caixa',
                  title: 'Caixas'
                },
                {
                  href: '/movimento',
                  title: 'Movimentação'
                },
                {
                  href: '/movimentohistorico',
                  title: 'Histório Fechamento',
                  disabled: false
                }
              ]
            },
            {
              href: '/contasbancarias',
              title: 'Contas Bancárias',
              disabled: parseInt(sessionStorage.getItem('contabancaria'))
            }
          ]
        },
        {
          href: '/relatorios',
          title: 'Relatorios',
          icon: {
            element: 'span',
            class: 'report'
          },
          disabled: parseInt(sessionStorage.getItem('relatorios'))
        },
        {
          href: '/biblia',
          title: 'Bíblia',
          icon: 'fas fa-bible',
          disabled: parseInt(sessionStorage.getItem('biblia'))
        },
        {
          href: '',
          title: 'Configurações',
          icon: 'fab fa-whmcs',
          child: [
            {
              href: '/igreja',
              title: 'Cadastro Igreja',
              disabled: parseInt(sessionStorage.getItem('multiIgreja'))
            },
            {
              href: '/usuario',
              title: 'Usuários',
              disabled: parseInt(sessionStorage.getItem('usuarios'))
            },
            {
              href: '/auditoria',
              title: 'Auditoria de Ações',
              disabled: parseInt(sessionStorage.getItem('auditoria'))
            }
          ]
        },
        {
          title: 'Cadastros Gerais',
          icon: 'fab fa-wpforms',
          child: [
            {
              title: 'Cargos',
              href: '/cargo',
              disabled: parseInt(sessionStorage.getItem('cargos'))
            },
            {
              href: '/tipoconta',
              title: 'Tipos de Contas',
              disabled: parseInt(sessionStorage.getItem('tipoconta'))
            },
            {
              href: '/eventoTipos',
              title: 'Tipo Eventos',
              disabled: parseInt(sessionStorage.getItem('tipoevento'))
            },
            {
              href: '/tipopedidos',
              title: 'Tipo de Solicitações',
              disabled: parseInt(sessionStorage.getItem('tipoevento'))
            }
          ]
        },
        {
          title: 'AdonaiSoft',
          icon: {
            element: 'span',
            class: 'icon'
            // attributes: {}
            // text: ''
          },
          child: [
            {
              href: '/termosuso',
              title: 'Termos de Uso',
              disabled: parseInt(sessionStorage.getItem('termouso'))
            },
            {
              href: '/privacidade',
              title: 'Politica de Privacidade',
              disabled: parseInt(sessionStorage.getItem('politicaprivacidade'))
            },
            {
              href: '/minhasfaturas',
              title: 'Minhas Faturas',
              disabled: parseInt(sessionStorage.getItem('minhasfaturas'))
            },
            {
              href: '/notaversao',
              title: 'Notas de Versões',
              disabled: parseInt(sessionStorage.getItem('notaversao'))
            },
            {
              href: '/tickets',
              title: 'Tickets',
              hidden: Boolean(sessionStorage.getItem('db'))
            }
          ]
        }
      ],
      collapsed: false,
      isOnMobile: false,
      itensmenu: [
        {
          label: 'Sair',
          icon: 'fab fa-whmcs'
        }
      ]
    }
  },
  mounted () {
    this.aniversariantes = sessionStorage.getItem('biblia')
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onToggleCollapse (collapsed) {
      console.log(collapsed)
      this.collapsed = collapsed
    },
    reload () {
      document.location.reload(true)
    },
    toggle (event) {
      this.$refs.menu.toggle(event)
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true
        this.collapsed = true
        this.mobile = false
        this.colaps = true
      } else {
        this.isOnMobile = false
        this.collapsed = false
        this.colaps = false
      }
    }
  },
  components: {
    Menubar,
    Button,
    InputText,
    SplitButton,
    AutoComplete,
    Sidebar,
    BlockUI
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

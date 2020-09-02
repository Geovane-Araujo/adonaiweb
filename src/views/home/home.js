import { mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      aniversariantes: '2',
      menu: [
        {
          header: true,
          title: 'Adonai Soft Web',
          hiddenOnCollapse: true
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
          badge: {
            text: '2',
            class: 'vsm--badge_default'
          }
        },
        {
          href: '',
          title: 'Secretaria',
          icon: 'far fa-address-book',
          child: [
            {
              href: '/membro',
              title: 'Membros'
            },
            {
              href: '/visitantes',
              title: 'Visitantes'
            },
            {
              href: '/aniversariantes',
              title: 'Aniversariantes',
              badge: {
                text: this.aniversariantes,
                class: 'vsm--badge_default'
              }
            },
            {
              href: '/congregacao',
              title: 'Congregações',
              disabled: false
            }
          ]
        },
        {
          href: '',
          title: 'Pastoral',
          icon: 'fas fa-bible',
          child: [
            {
              href: '/novoconvertido',
              title: 'Novos Convertidos',
              disabled: false
            },
            {
              href: '',
              title: 'Pedidos de Orações',
              disabled: false,
              hidden: true
            },
            {
              href: '',
              title: 'Solicitações de Visitas',
              disabled: false,
              hidden: true
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
              disabled: false
            },
            {
              href: '/despesas',
              title: 'Despesas',
              disabled: false
            },
            {
              href: '',
              title: 'Caixas',
              child: [
                {
                  href: '/caixa',
                  title: 'Caixas'
                },
                {
                  href: '/movimento',
                  title: 'Movimentação',
                  disabled: false
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
              title: 'Contas Bancárias'
            }
          ]
        },
        {
          href: '',
          title: 'Escola',
          hidden: true,
          icon: 'fas fa-graduation-cap',
          child: [
            {
              href: '',
              title: 'Escola Bíblica',
              disabled: false
            }
          ]
        },
        {
          href: '',
          title: 'Configurações',
          icon: 'fab fa-whmcs',
          child: [
            {
              href: '/igreja',
              title: 'Cadastro Igreja',
              disabled: false
            },
            {
              href: '/usuario',
              title: 'Usuários',
              disabled: false
            },
            {
              href: '',
              title: 'Auditoria de Ações',
              disabled: false
            }
          ]
        },
        {
          title: 'Cadastros Gerais',
          icon: 'fab fa-wpforms',
          child: [
            {
              title: 'Cargos',
              href: '/cargo'
            },
            {
              href: '/tipoconta',
              title: 'Tipos de Contas'
            },
            {
              href: '/eventoTipos',
              title: 'Tipo Eventos'
            }
          ]
        },
        {
          title: 'AdonaiSoft',
          icon: '../assets/Logo.png',
          child: [
            {
              title: 'Termos de Uso'
            },
            {
              title: 'Minhas Faturas'
            },
            {
              title: 'Notas de Versões'
            }
          ]
        }
      ],
      selectedTheme: 'white-theme',
      collapsed: false,
      isOnMobile: false
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onToggleCollapse (collapsed) {
      console.log(collapsed)
      this.collapsed = collapsed
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true
        this.collapsed = true
      } else {
        this.isOnMobile = false
        this.collapsed = false
      }
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

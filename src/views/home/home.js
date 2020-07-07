import { mapState } from 'vuex'
import util from '../../assets/scss/util'

export default {
  name: 'App',
  data () {
    return {
      menu: [
        {
          header: true,
          title: 'Adonai Soft Web',
          hiddenOnCollapse: true
        },
        {
          href: '',
          title: 'Dashboard',
          icon: 'fas fa-poll'
        },
        {
          href: '',
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
              title: 'Membros',
              disabled: false
            },
            {
              href: '/visitantes',
              title: 'Visitantes',
              disabled: false
            },
            {
              href: '',
              title: 'Aniversariantes',
              disabled: false
            },
            {
              href: '',
              title: 'Congregações',
              disabled: false
            }
          ]
        },
        {
          href: '',
          title: 'Pastoral',
          icon: 'far fa-address-book',
          child: [
            {
              href: '',
              title: 'Novos Convertidos',
              disabled: false
            },
            {
              href: '',
              title: 'Pedidos de Orações',
              disabled: false
            },
            {
              href: '',
              title: 'Solicitações de Visitas',
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
              href: '',
              title: 'Entradas',
              disabled: false
            },
            {
              href: '',
              title: 'Despesas',
              disabled: false
            },
            {
              href: '',
              title: 'Caixas',
              disabled: false
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
          icon: 'fas fa-wrench',
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
              title: 'Configuração Global',
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
              title: 'Secretaria',
              child: [
                {
                  title: 'Cargos',
                  href: '/cargo'
                }
              ]
            },
            {
              title: 'Financeiro',
              child: [
                {
                  href: '/tipoconta',
                  title: 'Tipos de Contas'
                }
              ]
            }
          ]
        }
      ],
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
    },
    validar () {
      if (this.auth.user.auth === '9999') {
        util.validamenu = false
      } else {
        util.validamenu = true
      }
      return util.validamenu
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

import { mapState } from 'vuex'
import axios from 'axios'
import adonai from '../router/services'

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
              href: '/novoconvertido',
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
    this.contaraniversariante()
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
    contaraniversariante () {
      axios.get(adonai.url + 'aniversariantes', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.aniversariantes = res.data.quantidade
      })
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

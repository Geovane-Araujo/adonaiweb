<template>
  <div class="menu">
      <sidebar-menu :menu="menu" class="container">
        <span slot="toggle-icon" class="material-icons">menu</span>
        <span slot="dropdown-icon" class="material-icons">expand_more</span>
      </sidebar-menu>
  </div>
</template>

<script>

export default {
  data () {
    return {
      menu: [
        {
          header: true,
          title: 'Adonai Soft Web',
          collapsed: true,
          hiddenOnCollapse: true
        },
        {
          href: '',
          title: 'Dashboard',
          icon: 'fas fa-poll'
        },
        {
          href: '',
          title: 'Secretaria',
          icon: 'far fa-address-book',
          hiddenOnCollapse: false,
          child: [
            {
              href: '/',
              title: 'Membros',
              disabled: false
            },
            {
              href: '/',
              title: 'Visitantes',
              disabled: false
            },
            {
              href: '/',
              title: 'Igrejas',
              disabled: false
            },
            {
              href: '/',
              title: 'Aniversariantes',
              disabled: false
            }
          ]
        },
        {
          href: '',
          title: 'Agenda',
          icon: 'far fa-calendar-alt'
        },
        {
          href: '',
          title: 'Financeiro',
          icon: 'fas fa-hand-holding-usd',
          child: [
            {
              href: '/',
              title: 'Entradas',
              disabled: false
            },
            {
              href: '/',
              title: 'Despesas',
              disabled: false
            },
            {
              href: '/',
              title: 'Caixas',
              disabled: false
            }
          ]
        },
        {
          href: '',
          title: 'Escola',
          icon: 'fas fa-graduation-cap',
          child: [
            {
              href: '/',
              title: 'Cadastro Igreja',
              disabled: false
            },
            {
              href: '/',
              title: 'Configuração Global',
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
              href: '/',
              title: 'Escola Bíblica',
              disabled: false
            }
          ]
        },
        {
          href: '',
          title: 'Cadastros Gerais',
          icon: 'fab fa-wpforms',
          child: [
            {
              href: '/',
              title: 'Bancos',
              disabled: false
            },
            {
              href: '/',
              title: 'Tipos de Contas',
              disabled: false
            }
          ]
        }
      ]
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
    onItemClick (event, item) {
      console.log('onItemClick')
      // console.log(event)
      // console.log(item)
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
  }
}
</script>
<style lang="scss" scoped>
.menu {
  height: 100vh;
  background-image: url(https://cdn.pixabay.com/photo/2019/07/14/07/24/jesus-4336337_960_720.jpg);
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  background-color: rgba(0,0,0,0.7);
  margin: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
</style>

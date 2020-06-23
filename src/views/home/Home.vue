<template>
  <div id="home">
    <div id="demo" :class="[{'collapsed' : collapsed}, {'onmobile' : isOnMobile}]">
      <div class="demo">
        <div class="containerb">
          <nav class="navbar">
            <div class="Esquerdo">
              <h2 >AdonaiSoft</h2>
            </div>
            <div class="Direito">
              <h4>Seja Bem Vindo(a) {{ user.nome }}</h4>
            </div>
           </nav>
        </div>
      </div>
      <div >
        <router-view class="router"/>
      </div>
    </div>
    <sidebar-menu :menu="menu"
      :collapsed="collapsed"
      :show-one-child="true"
      widthCollapsed="50px"
      width="220px"
      class="containersidebar"
      @toggle-collapse="onToggleCollapse"
      @item-click="onItemClick"
    />
    <div v-if="isOnMobile && !collapsed"
    class="sidebar-overlay"
    @click="collapsed = true"/>
  </div>
</template>

<script>
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
          href: '/dashboard',
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
              title: 'Membros',
              disabled: false
            },
            {
              href: '',
              title: 'Visitantes',
              disabled: false
            },
            {
              href: '',
              title: 'Igrejas',
              disabled: false
            },
            {
              href: '',
              title: 'Aniversariantes',
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
              href: '',
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
        },
        {
          title: 'Clientes',
          icon: 'far fa-id-card',
          href: 'cliente',
          hidden: util.validamenu

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
    onItemClick (event, item) {
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
</script>
<style lang="scss" scoped>
body,
html {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
h2 {
  color: #f2f4f7;
}
.router {
  background-color: rosybrown;
  margin-top: 5px;
  height: 90vh;
}
.navbar{
  background-color: rgba(0,0,0,0.7);
}
.Esquerdo {
  float: left;
}
.Direito {
  float: right;
  color: #f2f4f7;
}
body {
  background-color: #f2f4f7;
  color: #262626;
}
#demo {
  padding-left: 220px;
  transition: 0.3s ease;
}
#demo.collapsed {
  padding-left: 50px;
}
.v-sidebar-menu {
  box-shadow: blueviolet;
}
#demo.onmobile {
  padding-left: 50px;
}
.containersidebar {
  background-color: rgba(0,0,0,0.7);
  margin: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
}
.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 900;
}
.demo {
  padding: 5px;
  display: flexbox;
}
.container {
  max-width: 1300px;
  vertical-align: top;
}
.router {
  padding: 5px;
}
</style>

<template>
  <div>
    <div id="demo" :class="[{ 'collapsed' : collapsed }, { 'onmobile' : isOnMobile }]">
      <div class="demo">
        <div class="containerb">
          <nav class="navbar navbar-dark bg-dark">
            <div class="topo">
              <h2 >AdonaiSoft</h2><h3 align="right">{{ user.nome }}</h3>
            </div>
           </nav>
        </div>
      </div>
      <router-view />
    </div>
    <sidebar-menu :menu="menu"
      :collapsed="collapsed"
      :show-one-child="true"
      widthCollapsed="50px"
      width="250px"
      class="container"
      @toggle-collapse="onToggleCollapse"
      @item-click="onItemClick">
    </sidebar-menu>
    <div v-if="isOnMobile && !collapsed" class="sidebar-overlay" @click="collapsed = true"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
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
          title: 'Secretaria',
          icon: 'far fa-address-book',
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
      ],
      collapsed: false
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
}
h2 {
  color: #f2f4f7;
}
.topo {
  vertical-align: middle;
}
.avatar {
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
}
body {
  background-color: #f2f4f7;
  color: #262626;
}
#demo {
  padding-left: 250px;
  transition: 0.3s ease;
}
#demo.collapsed {
  padding-left: 50px;
}
#demo.onmobile {
  padding-left: 50px;
}

.container {
  background-color: rgba(0,0,0,0.7);
  margin: 0px;
  padding-left: 0px;
  padding-right: 0px;
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
}
.container {
  max-width: 1300px;
}

</style>

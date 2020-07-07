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
    />
    <div v-if="isOnMobile && !collapsed"
    class="sidebar-overlay"
    @click="collapsed = true"/>
  </div>
</template>

<script src="./home.js">
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

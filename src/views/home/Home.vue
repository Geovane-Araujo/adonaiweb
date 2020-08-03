<template>
  <div class="home">
    <div id="demo" :class="[{'collapsed' : collapsed}, {'onmobile' : isOnMobile}]">
      <div class="containerb">
        <nav class="navbar">
          <div class="Esquerdo">
            <h2 >AdonaiSoft</h2>
          </div>
          <div class="Direito">
            <h4>Seja Bem Vindo(a) {{ user.nome }}</h4>
          </div>
          </nav>
          <router-view class="router"/>
      </div>
    </div>
    <sidebar-menu :menu="menu"
      :collapsed="collapsed"
      :show-one-child="true"
      widthCollapsed="50px"
      width="200px"
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
body {
  height: 100%;
  width: 100%;
  background-color: #f2f4f7;
  color: #262626;
}
html {
  margin: 0;
  padding: 0;
  display: inline-block;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
h2 {
  color: #f2f4f7;
}
.containerb {
  height: 100%;
  .router {
    height: 92%;
  }
}
.navbar{
  background-color: rgba(3,50,73,0.7);
}
.Esquerdo {
  float: left;
}
.Direito {
  float: right;
  color: #f2f4f7;
}
#demo {
  padding-left: 200px;
  height: 100%;
  transition: 0.3s ease;
}
#demo.collapsed {
  padding-left: 50px;
}
#demo.onmobile {
  padding-left: 50px;
}
.containersidebar {
  background-color: rgba(3,50,73,0.7);
 /*  background-image: url(https://cdn.pixabay.com/photo/2018/06/29/22/45/wheat-3506758_960_720.jpg); */
  background-size: cover;
  margin-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
}
.demo {
  padding: 5px;
  display: inline-block;
  height: 100%;
  width: 100%;
}
.home {
  height: 100%;
  width: 100%;
}
</style>

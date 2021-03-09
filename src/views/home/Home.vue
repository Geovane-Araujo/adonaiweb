<template>
  <div class="home">
    <div id="demo" :class="[{'collapsed' : collapsed}, {'onmobile' : isOnMobile}]">
      <div class="containerb">
        <Menubar  class="navbar">
            <template #start>
                  <h4 style="color:#ffffff">{{ user.igreja.nome }}</h4>
            </template>
            <template #end>
              <span class="p-input-icon-left">
                  <InputText v-show="false" style="font-size:14px" v-model="busca" type="text" placeholder="Procurar" />
              </span>
              <!-- <Button style="margin-left:10px;margin-right:10px" badge="2" icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text" />-->
              <Button v-show="mobile" style="margin-left:10px;margin-right:10px" icon="fas fa-power-off" @click="reload()" class="p-button-rounded button" />
            </template>
          </MenuBar>
        <router-view class="router"/>
      </div>
    </div>
    <sidebar-menu :menu="menu"
      :collapsed="colaps"
      :show-one-child="true"
      widthCollapsed="40px"
      width="170px"
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
.router{
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
  height: 90%;
  overflow:auto;
}
h3 {
  color: #f2f4f7;
}
.containerb {
  height: 100%;
}
.navbar{
  background-color: rgba(3,50,73,0.0);
  height: 9vh;
}
.Esquerdo {
  float: left;
}
.Direito {
  float: right;
  color: #f2f4f7;
}
#demo {
  padding-left: 170px;
  height: 100%;
  transition: 0.4s ease;
}
#demo.collapsed {
  padding-left: 40px;
}
#demo.onmobile {
  padding-left: 40px;
}
.icon {
    background-color: #1e1e21;
    background-image: url(https://image.flaticon.com/icons/png/512/124/124130.png);
    text-decoration: none;
    position: relative;
    background-size: cover;
}
.containersidebar {
  background-color: rgba(3,50,73,0.0);
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
.button{
  background-color: rgba(3,50,73,0.7);
  border: #5e8a75;
}
.button:hover{
  background-color: #5e8a75;
}
.button:visited{
  color: #5e8a75;
}
.button:visited{
  background-color: #5e8a75;
}

</style>

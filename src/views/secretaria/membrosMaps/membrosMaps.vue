<template>
  <div>
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p class="p">Mapa dos Membros</p>
          <hr class="bg-info" />
          <div class="map">
            <MglMap
              :accessToken="accessToken"
              :mapStyle.sync="mapStyle"
              :center="coordinates"
              :zoom="13"
            >
              <MglNavigationControl position="top-right"/>
              <MglGeolocateControl position="top-right" />
              <MglMarker v-for="marker in markers" :key="marker.coords" :coordinates="marker.coords">
                <MglPopup>
                  <VCard>
                    <div>{{ marker.text }}</div>
                  </VCard>
                </MglPopup>
              </MglMarker>
            </MglMap>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./mebrosMaps.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

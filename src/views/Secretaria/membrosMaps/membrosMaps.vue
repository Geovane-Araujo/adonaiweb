<template>
  <div class="private">
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p class="p">Localização dos Membros</p>
          <hr class="bg-info" />
          <div>
          <gmap-map
            :center="center"
            :zoom="16"
            style="width: 100%; height: 500px"
          >
            <gmap-marker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :title="m.title"
              :clickable="true"
              :draggable="true"
              @click="center=m.position"
            ></gmap-marker>
          </gmap-map>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./mebrosMaps.js">
</script>
<style lang="scss" scoped>
.p {
  font-size: 30px;
}
</style>

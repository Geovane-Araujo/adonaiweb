<template>
  <div class="igreja">
    <loader v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>DashBoard</p>
          <hr class="bg-info">
          <div class="row">
            <div class="col-sm-3">
              <div class="col-sm-12" style="background-color: #ffffff;">
                <div class="row">
                  <div class="col-sm-6">
                    <i class="fas fa-users fa-3x"
                      aria-hidden="true"
                      style="color:#b36a5e; text-align:center;"></i>
                    <hr class="bg-info">
                  </div>
                  <div class="col-sm-6">
                      <h6 style="text-align: center;">Membros</h6>
                      <h1 style="text-align: center; font-size: 40px; ">{{ membros }}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="col-sm-12" style="background-color: #ffffff;">
                <div class="row">
                  <div class="col-sm-6">
                    <i class="fas fa-chart-line fa-3x"
                    aria-hidden="true"
                    style="color:#16697a; text-align:center;"></i>
                    <hr class="bg-info">
                  </div>
                  <div class="col-sm-6">
                      <h6 style="text-align: center;">Entradas</h6>
                      <h1 style="text-align: center; font-size: 20px; ">{{ entradas }}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="col-sm-12" style="background-color: #ffffff;">
                <div class="row">
                  <div class="col-sm-6">
                    <i class="fas fa-chart-line fa-rotate-180 fa-3x"
                    aria-hidden="true"
                    style="color:#ffa62b; text-align:center;"></i>
                    <hr class="bg-info">
                  </div>
                  <div class="col-sm-6">
                      <h6 style="text-align: center;">Despesas</h6>
                      <h1 style="text-align: center; font-size: 20px; ">{{ despesas }}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="col-sm-12" style="background-color: #ffffff;">
               <div class="row">
                  <div class="col-sm-6">
                    <i class="far fa-address-book fa-3x"
                    aria-hidden="true"
                    style="color:#5a189a; text-align:center;"></i>
                    <hr class="bg-info">
                  </div>
                  <div class="col-sm-6">
                      <h6 style="text-align: center;">Compromissos</h6>
                      <h1 style="text-align: center; font-size: 40px; ">1</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="bg-info">
          <div class="col-sm-12">
            <barchart
            :label="cabe_finan"
            :datasets="dataset_finan" ref="year"></barchart>
          </div>
          <hr class="bg-info">
          <div class="row">
            <div class="col-sm-6">
              <piechart
              :label="cabe_tipos_entradas"
              :datasets="dataset_tipos_entradas" ref="rec">
              </piechart>
            </div>
            <div class="col-sm-6">
              <dougchart
              :label="cabe_tipos_despesas"
              :datasets="dataset_tipos_despesas" ref="des">
              </dougchart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./dashboard.js">
</script>
<style lang=scss scoped>
label {
  background-color: #3498db;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin: 10px;
  padding: 6px 20px
}
p {
  font-size: 30px;
}
input[type='file'] {
  display: none
}
.table-sm {
  padding: 2px;
}
.igreja {
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba($color: #ffffff, $alpha: 0.9);
  margin: 5px;
  overflow:auto;
}
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
button {
  color: #5e8a75;
  border-color:#5e8a75;
}
button:hover {
  background-color: #5e8a75;
  border-color:#5e8a75;
}
</style>

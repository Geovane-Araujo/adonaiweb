<template>
  <div class="private">
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p class="p">Relatórios</p>
          <hr class="bg-info" />
        </div>
        <div class="row" style="margin-top: -20px;">
          <div class="col-sm-12" style="margin: 10px;">
            <h5>Membros</h5>
            <button @click="report.relatorio='carteirinha';openFilter=true;"
              class="btn btn-outline-info">
              <img src="../img/carteira.png">&nbsp;&nbsp;Carteirinha
            </button>
            <button @click="report.relatorio='certificado';openFilter=true;"
              class="btn btn-outline-info" style="margin-left: 10px;">
              <img src="../img/certificado.png">&nbsp;&nbsp;Certificado
            </button>
            <button v-show="false" @click="getsenderHash ()"
              class="btn btn-outline-info" style="margin-left: 10px;">
              <img src="../img/certificado.png">&nbsp;&nbsp;Integrações
            </button>
            <hr class="bg-info" />
          </div>
        </div>
      </div>
    </div>
    <!-- modal Filtros-->
    <div id="overlay" v-if=openFilter>
        <div class="modal-dialog modal-dialog-centered modal-md ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Filtros</h5>
              <button type="button" class="close"  @click="openFilter=false;clean(filters);">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form method="POST">
                <b-container>
                  <b-row class="text-center">
                    <b-col cols="12">
                      <div class="row">
                        <div class="col-sm-12" style="padding:3px;">
                          <b-form-group label="Nome" label-align-sm="left">
                            <b-input-group>
                              <b-form-input
                              v-model="filters.nome"
                              ></b-form-input>
                                <b-input-group-append >
                                <b-button variant="outline-info" class="material-icons"  @click="datasearch (1);" >search</b-button>
                              </b-input-group-append>
                            </b-input-group>
                          </b-form-group>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-container>
              </form>
              <button type="button" class="btn btn-outline-info float-right" style="margin-left:5px;" @click="filter(filters)">Imprimir</button>
            </div>
          </div>
        </div>
    </div>
    <adonaidatasearch
    :title="ds.title"
    :cabecalho="ds.grid"
    :form="form" v-bind:openDatasearch="open"
    :destroy="destroy"
    ref="cmp"/>
  </div>
</template>

<script src="./relatorios.js">
</script>
<style lang="scss" scoped>
.p {
  font-size: 30px;
}
.private {
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba($color: #ffffff, $alpha: 0.9);
  margin: 5px;
  overflow: auto;
}
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
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

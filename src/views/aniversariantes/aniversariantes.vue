<template>
  <div class="Aniversariantes">
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Aniversariantes do Mês</p>
        </div>
      </div>
      <hr class="bg-info" >
      <div class="row">
        <div class="col-lg-12">
          <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
            <thead>
              <tr class="text-left bg-info txt-light" style="height: 10px;">
                <th>Nome</th>
                <th>Data Nascimento</th>
                <th>Telefone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left" v-for="item in aniversariantes" :key="item.id">
                <td >{{ item.nome }}</td>
                <td>{{ item.dataNascimento }}</td>
                <td>{{ item.telefone}}</td>
                <td>
                  <a href="#" @click="openModal =true; form.telefone = item.telefone;" class="text-success"><i class="fab fa-whatsapp 5x" style=""></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div id="overlay" v-if="openModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Enviar Mensagem WhatsApp</h5>
            <button type="button" class="close"  @click="openModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="col-sm-12">
                <input type="text"
                autocomplete="off"
                class="form-control"
                placeholder="Telefone"
                v-model="form.telefone">
              </div>
              <div class="col-sm-12">
                <b-form-textarea
                  placeholder="Escreva sua mensagem"
                  rows="4"
                  v-model="form.mensagem"
                  max-rows="4"
                ></b-form-textarea>
              </div>
              <div class="form-group">
                <button class="btn btn-outline-info float-right" @click="enviarMensagem(form);" >Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./aniversariantes.js">
</script>
<style lang="scss" scoped>
.table-overflow {
    max-height:90vh;
    overflow-y:auto;
}
p {
  font-size: 30px;
}
.Aniversariantes {
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba($color: #ffffff, $alpha: 0.7);
  margin: 5px;
  padding: 1px;
  max-height:89vh;
  overflow-y:auto;
}
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
</style>

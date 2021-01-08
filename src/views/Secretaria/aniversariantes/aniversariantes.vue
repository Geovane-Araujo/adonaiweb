<template>
  <div>
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Aniversariantes do Mês</p>
          <hr class="bg-info">
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12" style="margin-top: -30px;">
          <DataTable columnResizeMode="fit" :value="aniversariantes" bodyStyle="width: 200px" headerStyle="width: 200px" selectionMode="single" dataKey="id">
            <Column headerStyle="width:10px;" field="ID" header="ID"></Column>
            <Column headerStyle="width:50px;" field="Nome" header="Nome"></Column>
            <Column headerStyle="width:50px;" field="DataNascimento" header="DataNascimento"></Column>
            <Column headerStyle="width:50px;" field="Telefone" header="Telefone"></Column>
            <Column headerStyle="width:5px;" :exportable="false">
              <template #body="slotProps">
                  <Button style="font-size: 10px;" icon="fab fa-whatsapp" class="p-button-rounded p-button-outlined p-button-success p-button-sm p-sm-2" @click="validate(slotProps);" />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
    <Dialog style="font-size:10px;" header="Enviar Mensagem Aniversariante" :visible.sync="openModal" :style="{width: resize+'vw'}" :modal="true">
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
      </form>
      <template #footer>
          <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-success p-button-text button"/>
          <Button label="Enviar" @click="enviarMensagem(form);" class="p-button-raised p-button-success p-button-text button" />
      </template>
    </Dialog>
  </div>
</template>

<script src="./aniversariantes.js">
</script>
<style lang="scss" scoped>
p {
  font-size: 30px;
}
#loading {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 5000;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
</style>

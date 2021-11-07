<template>
  <div class="versao">
    <loader id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <div class="linha">
            <p class="p">Notas de Versões</p>
            <Button v-show="habilitainclusao" @click="openModal= true" label="Adicionar Nova Versao" class="p-button-outlined" />
          </div>
          <hr class="bg-info" />
          <div style="margin: 15px">
            <VueShowdown :markdown="versoes" flavor="github" :options="{ emoji: true }"/>
          </div>
        </div>
      </div>
    </div>
    <Dialog  header="Nota de Versão" :visible.sync="openModal" :style="{width: '100vw', height: '100vh'}" :modal="true">
      <div class="row">
        <div class="col-sm-6">
          <div class="p-fluid">
            <Textarea v-model="form.descricao" :autoResize="true" rows="5" cols="30" />
          </div>
        </div>
        <div class="col-sm-6">
          <VueShowdown :markdown="form.descricao" flavor="github" :options="{ emoji: true }"/>
        </div>
      </div>
      <template #footer>
        <Button label="OK"  @click="save(form);" class="p-button-raised p-button-success p-button-text button" />
      </template>
    </Dialog>
  </div>
</template>

<script src="./notasversoes.js">
</script>
<style lang=scss scoped src="../../../assets/scss/adonai.scss">
</style>

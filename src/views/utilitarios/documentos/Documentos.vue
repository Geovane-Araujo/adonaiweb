<template>
  <div>
    <loader  id="loading" v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Documetos Editaveis</p>
          <button class="btn btn-outline-info" @click="getbyId(-100);">
            <i class="fas fa-plus"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info" >
        </div>
        <div class="col-lg-12" style="margin-top: -30px;">
          <!-- table -->
          <adonaigrid class="grid"
          :flex="[{ tamanho: 10, name: 'id' }, { tamanho: 150, name: 'descricao' }, { tamanho: 20, name: 'tipo' }]"
          :registros="tipopedido"
          :form="form"
          :getbyId="getbyId"
          :save="save"
          :explorer="explorer"
          :type="true"
          ref="grid"></adonaigrid>
        </div>
      </div>
    </div>

    <Dialog header="Documentos Editveis" :visible.sync="openModal" :style="{width: '70vw'}" :maximizable="true"  :modal="true">
        <div class="row">
          <div class="col-sm-9">
            <b-form-group label="Descricao">
              <input type="text"
                v-model="form.descricao"
                class="form-control">
            </b-form-group>
          </div>
          <div class="col-sm-3">
            <b-form-group label="Tipo">
              <b-form-select
                :options="[{ text: 'Carta Apresentação', value: 1 }, {text: 'Carta de Mudança', value: 2}, {text: 'Geral', value: 3}]"
                v-model="form.idtipo">
              </b-form-select>
            </b-form-group>
          </div>
          <div class="sc col-sm-12">
            <Editor v-model="form.texto"/>
          </div>
        </div>
      <template #footer>
        <Button label="Variáveis" style="float:left;" @click="openModalVariables=true" class="p-button-raised p-button-danger p-button-text button"/>
          <Button label="Salvar" @click="validate(form);" class="p-button-raised p-button-success p-button-text button" />
          <Button label="Cancelar"  @click="openModal=false" class="p-button-raised p-button-danger p-button-text button"/>
      </template>
    </Dialog>
    <Dialog header="Variáveis" :visible.sync="openModalVariables" :style="{width: '40vw'}" :modal="true">
        <div class="row">
          <div class="col-sm-6">
            <h4>Dados Membros</h4>
            <div>@NomeMembro</div>
            <div>@EnderecoMembro</div>
            <div>@NumeroMembro</div>
            <div>@BairroMembro</div>
            <div>@ComplementoMembro</div>
            <div>@CidadeMembro</div>
            <div>@CepMembro</div>
            <div>@UFMembro</div>
            <div>@IdadeMembro</div>
            <div>@DataNascimento</div>
            <div>@DataBatismoMembro</div>
            <div>@MembroDesde</div>
            <div>@NaturalidadeMembro</div>
            <div>@NacionalidadeMembro</div>
            <div>@TelefoneMembroResidencial</div>
            <div>@TelefoneMembroCelular</div>
            <div>@EmailMembro</div>
            <div>@EstadoCivilMembro</div>
            <div>@ObservacaoMembro</div>
            <div>@CargoMembro</div>
          </div>

          <div class="col-sm-6">
            <h4>Dados Igreja</h4>
            <div>@NomeIgreja</div>
            <div>@EnderecoIgreja</div>
            <div>@NumeroIgreja</div>
            <div>@BairroIgreja</div>
            <div>@ComplementoIgreja</div>
            <div>@CidadeIgreja</div>
            <div>@CepIgreja</div>
            <div>@UFIgreja</div>
            <div>@TelefoneIgrejaResidencial</div>
            <div>@TelefoneIgrejaCelular</div>
            <div>@EmailIgreja</div>
            <div>@NomePastorPresidente</div>
            <div>@NomePastorLocal</div>
            <div>@NomeSecretario</div>
            <div>@Secretario</div>
            <div>@DataAtual</div>
          </div>
        </div>
        <H6 style="color:red;">As Variaveis deve ser inserida da mesma forma acima descrito<br> Resultado ao gerar documento: @NomeMembro = Geovane Araújo</H6>
    </Dialog>
  </div>
</template>

<script src="./documentos.js">
</script>
<style lang="scss" scoped src="../../../assets/scss/adonai.scss">
// @import url("../../../assets/scss/adonai.scss");
</style>

<template>
  <div class="membro">
    <loading :active.sync="isLoading"
      :is-full-page="fullPage">
    </loading>
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Cadastro de Membros</p>
        </div>
      </div>
      <div class="tre">
        <button
        class="btn btn-outline-info"
        @click="form.del=false;form.add=true;form.edit=false;openModal=true;">
        <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
        </button>
      </div>
      <hr class="bg-info" >
      <div class="row">
        <div class="col-lg-12">
          <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
            <thead>
              <tr class="text-left bg-info txt-light style=height: 10px;">
                <th>ID</th>
                <th>Nome Membro</th>
                <th>Endereco</th>
                <th>Bairro</th>
                <th>Numero</th>
                <th>Telefone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left" v-for="item in membro" :key="item.id">
                <td >{{ item.id }}</td>
                <td>{{ item.nome }}</td>
                <td>{{ item.endereco[0].endereco }}</td>
                <td>{{ item.endereco[0].bairro }}</td>
                <td>{{ item.endereco[0].numero }}</td>
                <td>{{ item.telefone[0].telefone }}</td>
                <td>
                  <a href="#" @click="openModal =true;  form.edit= true;form.del=false;form.add=false; povoar(item);"  class="text-success"><i class="fas fa-edit"></i></a>
                  &nbsp;
                  <a href="#" @click="deleteModal=true; form.idPessoa = item.idPessoa; form.id = item.id; form.edit=false;form.add=false; form.del = true" class="text-danger"><i class="far fa-trash-alt"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div id="overlay" v-if=openModal>
        <div class="modal-dialog modal-dialog-centered modal-lg ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Cadastro de Membros</h5>
              <button type="button" class="close"  @click="limparCampos(form); openModal=false;">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <b-tabs content-class="mt-1">
                  <b-tab title="Principal" active>
                    <b-container>
                      <b-row class="text-center">
                        <b-col cols="2">
                          <div class="file-loading">
                            <b-avatar ref="myFiles"
                            size="5rem"></b-avatar>
                          </div>
                          <label for='selecao-arquivo' class="material-icons">perm_media</label>
                          <input id='selecao-arquivo' @change="previewFiles" ref="myFiles" type='file'>
                        </b-col>
                        <b-col cols="10" >
                          <div class="row">
                            <div class="col-sm-12">
                              <input type="text"
                              class="form-control"
                              style="width:620px"
                              v-model="form.nome"
                              placeholder="Nome Completo">
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-sm-4">
                              <b-form-datepicker
                              placeholder="Data Nasc."
                              v-model="form.dataNascimento"
                              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                              local="pt-br"></b-form-datepicker>
                            </div>
                            <div class="col-sm-4">
                              <b-form-select
                              :options="[{ text: 'Estado Civil', value: null }, 'Solteiro(a)', 'Casado(a)', 'União Estável','Divorciado(a)','Viuvo(a)']"
                              :value="null"
                              v-model="form.estadoCivil"
                              ></b-form-select>
                            </div>
                            <div class="col-sm-4">
                              <div class="input-group mb-4">
                                <input type="text"
                                class="form-control"
                                style="width:50px;"
                                placeholder="Cargo"
                                v-model="form.cargo"
                                aria-describedby="basic-addon1">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon1">
                                    <a href="#" @click="buscarCargo ();openDatasearch=true;" class="text-info"><i class="fas fa-search"></i></a>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <b-form-datepicker
                              placeholder="Data Batismo"
                              v-model="form.dataBatismo"
                              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                              local="pt-br"></b-form-datepicker>
                            </div>
                            <div class="col-md-2">
                              <b-form-checkbox
                                id="checkbox-1"
                                v-model="form.ativo"
                                value="1"
                                unchecked-value="0"
                                >Ativo
                                </b-form-checkbox>
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                      <div class="row">
                        <div class="col-md-4">
                          <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[0].telefone"
                            placeholder="Telefone Residencial">
                        </div>
                        <div class="col-md-4">
                          <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[1].telefone"
                            placeholder="Telefone Celular">
                        </div>
                        <div class="col-md-4">
                          <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[2].telefone"
                            placeholder="Telefone Comercial">
                        </div>
                        <div class="col-md-6">
                          <input type="text"
                            class="form-control"
                            v-model="form.email[0].email"
                            placeholder="E-mail">
                        </div>
                        <div class="col-md-6">
                          <input type="text"
                            class="form-control"
                            v-model="form.email[1].email"
                            placeholder="E-mail 2">
                        </div>
                      </div>
                    </b-container>
                  </b-tab>
                  <!-- Endereços -->
                  <b-tab title="Enderecos">
                    <form action="" enctype="multipart/form-data" class="form form-vertical">
                      <div class="row">
                      <div class="col-md-12">
                          <div class="row">
                            <div class="col-sm-3">
                              <div class="form-group">
                                <b-input-group style="margin-left:10px;">
                                  <b-form-input placeholder="CEP" v-model="form.endereco[0].cep" ></b-form-input>
                                    <b-input-group-append >
                                    <b-button variant="outline-info" class="material-icons">search</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            </div>
                            <div class="col-sm-7">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[0].endereco"
                                  placeholder="Endereço Principal">
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[0].numero"
                                  style="margin-right:0px;width: 100px;"
                                  placeholder="Numero">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <input type="text"
                                  style="margin-left:10px;width: 100%;"
                                  class="form-control"
                                  v-model="form.endereco[0].bairro"
                                  placeholder="Bairro Principal">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[0].complemento"
                                  placeholder="Complemento Principal">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <b-input-group >
                                  <b-form-input placeholder="Cidade" v-model="form.endereco[0].cidade"></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="outline-info" style="margin-right:10px;" class="material-icons">search</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- Endereço Secundário -->
                        <hr class="bg-info" >
                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-sm-3">
                              <div class="form-group">
                                <b-input-group style="margin-left:10px;">
                                  <b-form-input placeholder="CEP" v-model="form.endereco[1].cep"></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="outline-info" class="material-icons">search</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            </div>
                            <div class="col-sm-7">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[1].endereco"
                                  placeholder="Endereço Outro">
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[1].numero"
                                  style="margin-right:0px;width: 100px;"
                                  placeholder="Numero">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <input type="text"
                                  style="margin-left:10px;width: 100%;"
                                  class="form-control"
                                  v-model="form.endereco[1].bairro"
                                  placeholder="Bairro Outro">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[1].complemento"
                                  placeholder="Complemento Outro">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <b-input-group >
                                  <b-form-input placeholder="Cidade Outro" v-model="form.endereco[1].cidade"></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="outline-info" style="margin-right:10px;" class="material-icons">search</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </b-tab>
                  <b-tab title="Observações">
                    <b-form-textarea
                      id="textarea"
                      placeholder="Observações"
                      rows="15"
                      v-model="form.observacoes"
                      max-rows="3"
                    ></b-form-textarea>
                  </b-tab>
                </b-tabs>
              </form>
              <button type="button" class="btn btn-outline-info float-right" @click="validar(form)">Salvar</button>
            </div>
          </div>
        </div>
    </div>
    <!-- modal excluir -->
    <div id="overlay" v-if=deleteModal>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-danger">Deseja realmente Excluir ?</h5>
            <button type="button" class="close"  @click="deleteModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <button class="btn btn-outline-danger" @click="submit();deleteModal=false;" >Sim</button>
            <button class="btn btn-outline-success float-right" @click="deleteModal=false">Não</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal para seleção do cargo -->
    <div class="cargodts">
      <div id="overlay" v-if=openDatasearch>
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close"  @click="openDatasearch=false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h6>Selecione o Cargo</h6>
              <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
                <thead>
                  <tr class="text-left bg-info txt-light" style="height: 10px;">
                    <th>ID</th>
                    <th>Nome</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-left" v-for="carg in cargo" :key="carg.id">
                    <td >{{ carg.id }}</td>
                    <td>{{ carg.descricao }}</td>
                    <td>
                      <a href="#" class="text-success" @click="form.cargo = carg.descricao;form.idCargo=carg.id; openDatasearch=false; "><i class="far fa-check-square"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import util from '../../assets/scss/util'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data: () => ({
    openModal: false,
    deleteModal: false,
    isLoading: false,
    fullPage: true,
    openDatasearch: false,
    status: '',
    form: {
      add: true,
      edit: false,
      del: false,
      id: '',
      nome: '',
      idPessoa: '',
      dataNascimento: '',
      ativo: '',
      idCargo: '',
      cargo: '',
      observacoes: '',
      dataBatismo: '',
      estadoCivil: '',
      imagem: '',
      batizado: '',
      endereco: [
        {
          id: '',
          idPessoa: '',
          endereco: '',
          bairro: '',
          idCidade: '0',
          cidade: '',
          numero: '',
          uf: '',
          cep: '',
          complemento: '',
          tipo: '0'
        },
        {
          id: '',
          idPessoa: '',
          endereco: '',
          bairro: '',
          idCidade: '0',
          cidade: '',
          numero: '',
          uf: '',
          cep: '',
          complemento: '',
          tipo: 1
        }
      ],
      telefone: [
        {
          id: '',
          idPessoa: '',
          telefone: '',
          tipo: '0'
        },
        {
          id: '',
          idPessoa: '',
          telefone: '',
          tipo: 1
        },
        {
          id: '',
          idPessoa: '',
          telefone: '',
          tipo: 2
        }
      ],
      email: [
        {
          id: '',
          iPpessoa: '',
          email: '',
          tipo: '0'
        },
        {
          id: '',
          iPpessoa: '',
          email: '',
          tipo: 1
        }
      ],
      retorno: '',
      motivo: ''
    },
    imagem: []
  }),
  mounted () {
    this.isLoading = true
    this.ActionSetMembro()
    this.isLoading = false
  },
  methods: {
    ...mapActions('membro', ['ActionSetMembro']),
    ...mapActions('membro', ['SalvarMembro']),
    ...mapActions('cargo', ['ActionSetCargo']),
    async submit () {
      try {
        await this.SalvarMembro(this.form)
        this.ActionSetMembro()
        if (this.form.add === true) {
          this.status = 'Salvo com Sucesso'
        } else if (this.form.edit === true) {
          this.status = 'Alterado com Sucesso'
        } else {
          this.status = 'Excluido com Sucesso'
        }
        this.$toastr.success(this.status, 'Cadastro de Membros', util.toast)
        this.limparCampos(this.form)
        if (this.form.edit) {
          this.openModal = false
        }
      } catch (err) {
        this.$toastr.error(err, 'Falha ao Salvar', util.toast)
      }
    },
    limparCampos (form) {
      form.id = ''
      form.nome = ''
      form.idPessoa = ''
      form.dataNascimento = ''
      form.ativo = ''
      form.idCargo = ''
      form.cargo = ''
      form.observacoes = ''
      form.dataBatismo = ''
      form.estadoCivil = ''
      form.imagem = ''
      form.batizado = ''

      form.endereco[0].id = ''
      form.endereco[0].idPessoa = ''
      form.endereco[0].endereco = ''
      form.endereco[0].bairro = ''
      form.endereco[0].idCidade = ''
      form.endereco[0].cidade = ''
      form.endereco[0].numero = ''
      form.endereco[0].uf = ''
      form.endereco[0].cep = ''
      form.endereco[0].complemto = ''
      form.endereco[0].tipo = ''

      form.endereco[1].id = ''
      form.endereco[1].idPessoa = ''
      form.endereco[1].endereco = ''
      form.endereco[1].bairro = ''
      form.endereco[1].idCidade = ''
      form.endereco[1].cidade = ''
      form.endereco[1].numero = ''
      form.endereco[1].uf = ''
      form.endereco[1].cep = ''
      form.endereco[1].complemto = ''
      form.endereco[1].tipo = ''

      form.telefone[0].id = ''
      form.telefone[0].idPessoa = ''
      form.telefone[0].telefone = ''
      form.telefone[0].tipo = ''

      form.telefone[1].id = ''
      form.telefone[1].idPessoa = ''
      form.telefone[1].telefone = ''
      form.telefone[1].tipo = ''

      form.telefone[2].id = ''
      form.telefone[2].idPessoa = ''
      form.telefone[2].telefone = ''
      form.telefone[2].tipo = ''

      form.email[0].id = ''
      form.email[0].idPessoa = ''
      form.email[0].email = ''
      form.email[0].tipo = ''

      form.email[1].id = ''
      form.email[1].idPessoa = ''
      form.email[1].email = ''
      form.email[1].tipo = ''

      form.retorno = ''
      form.motivo = ''
    },
    povoar (form) {
      this.form.id = form.id
      this.form.nome = form.nome
      this.form.idPessoa = form.idPessoa
      this.form.dataNascimento = form.dataNascimento
      this.form.ativo = form.ativo
      this.form.idCargo = form.idCargo
      this.form.cargo = form.cargo
      this.form.observacoes = form.observacoes
      this.form.dataBatismo = form.dataBatismo
      this.form.estadoCivil = form.estadoCivil
      this.form.imagem = form.imagem
      this.form.batizado = form.batizado

      this.form.endereco[0].id = form.endereco[0].id
      this.form.endereco[0].idPessoa = form.endereco[0].idPessoa
      this.form.endereco[0].endereco = form.endereco[0].endereco
      this.form.endereco[0].bairro = form.endereco[0].bairro
      this.form.endereco[0].idCidade = form.endereco[0].idCidade
      this.form.endereco[0].cidade = form.endereco[0].cidade
      this.form.endereco[0].numero = form.endereco[0].numero
      this.form.endereco[0].uf = form.endereco[0].uf
      this.form.endereco[0].cep = form.endereco[0].cep
      this.form.endereco[0].complemto = form.endereco[0].complemto
      this.form.endereco[0].tipo = 0

      this.form.endereco[1].id = form.endereco[1].id
      this.form.endereco[1].idPessoa = form.endereco[1].idPessoa
      this.form.endereco[1].endereco = form.endereco[1].endereco
      this.form.endereco[1].bairro = form.endereco[1].bairro
      this.form.endereco[1].idCidade = form.endereco[1].idCidade
      this.form.endereco[1].cidade = form.endereco[1].cidade
      this.form.endereco[1].numero = form.endereco[1].numero
      this.form.endereco[1].uf = form.endereco[1].uf
      this.form.endereco[1].cep = form.endereco[1].cep
      this.form.endereco[1].complemto = form.endereco[1].complemto
      this.form.endereco[1].tipo = 1

      this.form.telefone[0].id = form.telefone[0].id
      this.form.telefone[0].idPessoa = form.telefone[0].idPessoa
      this.form.telefone[0].telefone = form.telefone[0].telefone
      this.form.telefone[0].tipo = 0

      this.form.telefone[1].id = form.telefone[1].id
      this.form.telefone[1].idPessoa = form.telefone[1].idPessoa
      this.form.telefone[1].telefone = form.telefone[1].telefone
      this.form.telefone[1].tipo = 1

      this.form.telefone[2].id = form.telefone[2].id
      this.form.telefone[2].idPessoa = form.telefone[2].idPessoa
      this.form.telefone[2].telefone = form.telefone[2].telefone
      this.form.telefone[2].tipo = 2

      this.form.email[0].id = form.email[0].id
      this.form.email[0].idPessoa = form.email[0].idPessoa
      this.form.email[0].email = form.email[0].email
      this.form.email[0].tipo = 0

      this.form.email[1].id = form.email[1].id
      this.form.email[1].idPessoa = form.email[1].idPessoa
      this.form.email[1].email = form.email[1].email
      this.form.email[1].tipo = 1

      this.form.retorno = ''
      this.form.motivo = ''
    },
    validar (form) {
      if (form.nome === '') {
        this.$toastr.error('Por favor preencha o campo Nome Completo', 'Campos Inválidos', util.toast)
      } else if (form.idCargo === '') {
        this.$toastr.error('Por favor preencha o campo Cargo', 'Campos Inválidos', util.toast)
      } else {
        this.submit()
      }
    },
    previewFiles (event) {
      this.imagem = this.$refs.myFiles.files
    },
    buscarCargo () {
      this.ActionSetCargo()
    }
  },
  computed: {
    ...mapState('membro', ['membro']),
    ...mapState('cargo', ['cargo'])
  },
  props: {
    membros: { type: Object, required: false },
    cargos: { type: Object, required: false }
  },
  components: {
    Loading
  }
}
</script>
<style lang=scss scoped>
.table-overflow {
    max-height:90vh;
    overflow-y:auto;
}
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
.membro {
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

<template>
  <div class="membro">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Cadastro de Igreja</p>
          <button
            class="btn btn-outline-info"
            @click="form.del=false;form.add=false;form.edit=false;openModal=true;">
            <i class="fas fa-user"></i>&nbsp;&nbsp;Adicionar
          </button>
          <hr class="bg-info">
        </div>
        <div class="col-lg-12">
          <table class="table table-botdered table-striped table-sm table-hover table-fixed">
            <thead  style="max-height:10vh; overflow-y:auto;">
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
              <tr class="text-left" v-for="item in igreja" :key="item.id">
                <td >{{ item.id }}</td>
                <td>{{ item.nome }}</td>
                <td>{{ item.enderecoPrincipal }}</td>
                <td>{{ item.bairroPrincipal }}</td>
                <td>{{ item.numeroPrincipal }}</td>
                <td>{{ item.telefonePrincipal }}</td>
                <td>
                  <a href="#" @click="getIgreja (item.id);  form.edit= true;form.del=false;form.add=false;"  class="text-success"><i class="fas fa-edit"></i></a>
                  &nbsp;
                  <a href="#" @click="deleteModal=true; form.idPessoa = item.idPessoa; form.id = item.id; form.edit=false;form.add=false; form.del = true" class="text-danger"><i class="far fa-trash-alt"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-sm-5">
          <b-input-group >
              <button class="btn btn-outline-info" @click="pagina = pagina - 1;b (pagina)"><i class="fas fa-caret-left"></i></button>
              <b-form-input v-model="pagina" class="col-sm-1 text-center"></b-form-input>
              <button class="btn btn-outline-info"  @click="pagina = pagina + 1;b (pagina)"><i class="fas fa-caret-right"></i></button>
              <b-form-input placeholder="buscar"  style="margin-left:10px" class="col-sm-5"></b-form-input>
              <b-button variant="outline-info" class="material-icons">search</b-button>
          </b-input-group>
        </div>
      </div>
    </div>

    <!-- modal para cadastro-->
    <div id="overlay" v-if=openModal>
        <div class="modal-dialog modal-dialog-centered modal-lg ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Cadastro de Igreja</h5>
              <button type="button" class="close"  @click="cleanForm(form); openModal=false;">
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
                              placeholder="Nome Igreja">
                            </div>
                            <div class="col-sm-2">
                              <b-form-select
                              :options="[{ text: 'CNPJ', value: 'CNPJ' }, 'CPF']"
                              v-model="doc"
                              ></b-form-select>
                            </div>
                            <div class="col-sm-4">
                              <input
                                type="text"
                                v-mask="'###.###.###-##'"
                                v-model="form.cnpj"
                                class="form-control"
                                @click="verificar(doc)"
                                placeholder="CNPJ/CPF">
                            </div>
                            <div class="col-sm-6">
                              <input
                                type="text"
                                v-model="form.pastorResponsavel"
                                class="form-control"
                                placeholder="Pastor Responsável">
                            </div>
                            <div class="col-sm-6">
                              <input
                                type="text"
                                v-model="form.Tesoureiro"
                                class="form-control"
                                placeholder="Tesoureiro">
                            </div>
                            <div class="col-sm-6">
                              <input
                                type="text"
                                v-model="form.Tesoureiro"
                                class="form-control"
                                placeholder="Secretário(a)">
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                      <H6 class="text-success">Dados de Contatos</H6>
                      <div class="row">
                        <div class="col-md-4">
                          <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[0].telefone"
                            placeholder="Telefone Principal">
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
                            placeholder="Telefone Outros">
                        </div>
                        <div class="col-md-6">
                          <input type="text"
                            class="form-control"
                            v-model="form.email[0].email"
                            placeholder="E-mail Principal">
                        </div>
                        <div class="col-md-6">
                          <input type="text"
                            class="form-control"
                            v-model="form.email[1].email"
                            placeholder="E-mail Outros">
                        </div>
                      </div>
                    </b-container>
                  </b-tab>
                  <b-tab title="Igreja Sede">
                    <b-col cols="12" >
                      <div class="row">
                        <div class="col-sm-12">
                          <input type="text"
                          class="form-control"
                          v-model="form.igrejaSede"
                          placeholder="Nome Igreja Sede">
                        </div>
                        <div class="col-sm-6">
                          <input
                            type="text"
                            v-model="form.presidente"
                            class="form-control"
                            placeholder="Pastor Presidente">
                        </div>
                        <div class="col-sm-6">
                          <input
                            type="text"
                            v-model="form.Vice"
                            class="form-control"
                            placeholder="Pastor Vice">
                        </div>
                        <H6 class="text-success" style="padding-left:10px;">Dados de Contatos</H6>
                        <div class="row" style="padding-left: 10px;padding-right: 10px;">
                        <div class="col-md-4">
                          <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[2].telefone"
                            placeholder="Telefone Principal">
                        </div>
                        <div class="col-md-4">
                          <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[3].telefone"
                            placeholder="Telefone Celular">
                        </div>
                        <div class="col-md-4">
                          <input type="text"
                            class="form-control"
                            v-mask="'(##)####-#####'"
                            v-model="form.telefone[4].telefone"
                            placeholder="Telefone Outros">
                        </div>
                        <div class="col-md-6">
                          <input type="text"
                            class="form-control"
                            v-model="form.email[2].email"
                            placeholder="E-mail Principal">
                        </div>
                        <div class="col-md-6">
                          <input type="text"
                            class="form-control"
                            v-model="form.email[3].email"
                            placeholder="E-mail Outros">
                        </div>
                        <H6 class="text-success" style="padding-left:20px;"> </H6>
                        <H6 class="text-success" style="padding-left:20px;"> </H6>
                        <H6 class="text-success" style="padding-left:20px;"> </H6>
                      </div>
                      </div>
                    </b-col>
                  </b-tab>
                  <!-- Endereços -->
                  <b-tab title="Enderecos">
                    <form>
                      <div class="row">
                      <H6 class="text-success" style="padding-left:20px;">Endereço Local</H6>
                      <div class="col-sm-12">
                          <div class="row">
                            <div class="col-sm-3">
                              <div class="form-group">
                                <b-input-group style="margin-left:10px;">
                                  <b-form-input
                                    placeholder="CEP"
                                    v-model="form.endereco[0].cep" v-mask="'#####-###'">
                                  </b-form-input>
                                    <b-input-group-append >
                                    <b-button variant="outline-info" class="material-icons" @click="buscarcep (form.endereco[0].cep, form, 1)">search</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            </div>
                            <div class="col-sm-7">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[0].endereco"
                                  placeholder="Endereço Local">
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
                                  placeholder="Bairro Local">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[0].complemento"
                                  placeholder="Complemento Local">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <b-input-group >
                                  <b-form-input placeholder="Cidade" v-model="form.endereco[0].cidade" @click="campocidade = 0;buscarCidade(pagina);openCidade=true;"></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="campocidade = 0;buscarCidade(pagina);openCidade=true;">search</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- Endereço Secundário -->
                        <hr class="bg-info" >
                        <div class="col-md-12">
                          <H6 class="text-success" style="padding-left:10px;">Endereço Sede</H6>
                          <div class="row">
                            <div class="col-sm-3">
                              <div class="form-group">
                                <b-input-group style="margin-left:10px;">
                                  <b-form-input
                                    placeholder="CEP Sede"
                                    v-model="form.endereco[1].cep" v-mask="'#####-###'">
                                  </b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="outline-info" class="material-icons" @click="buscarcep (form.endereco[0].cep, form, 2)">search</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            </div>
                            <div class="col-sm-7">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[1].endereco"
                                  placeholder="Endereço Sede">
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
                                  placeholder="Bairro Sede">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <input type="text"
                                  class="form-control"
                                  v-model="form.endereco[1].complemento"
                                  placeholder="Complemento Sede">
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <b-input-group >
                                  <b-form-input placeholder="Cidade Sede" v-model="form.endereco[1].cidade" @click="campocidade = 1;buscarCidade(pagina);openCidade=true;"></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="campocidade = 1;buscarCidade(pagina);openCidade=true;">search</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </b-tab>
                  <b-tab title="Configurações">
                    <b-col cols="12" >
                      <H6 class="text-success">Configurações de Mala Direta</H6>
                      <div class="row">
                          <div class="col-sm-5">
                            <input type="e-mail"
                            class="form-control"
                            v-model="form.emailmala"
                            placeholder="Email">
                          </div>
                          <div class="col-sm-5">
                            <input
                              type="text"
                              v-model="form.smtp"
                              class="form-control"
                              placeholder="SMPT">
                          </div>
                          <div class="col-sm-2">
                            <input
                              type="text"
                              v-model="form.porta"
                              class="form-control"
                              placeholder="Porta">
                        </div>
                        <div class="row" style="padding-left: 10px;padding-right: 10px;">
                          <div class="col-md-4">
                            <input type="text"
                              class="form-control"
                              v-model="form.usuario"
                              placeholder="Usuário">
                          </div>
                          <div class="col-md-4">
                            <input type="password"
                              class="form-control"
                              v-model="form.senha"
                              placeholder="senha">
                          </div>
                          <div class="col-md-4">
                            <b-form-select
                              :options="[{ text: 'Não Requer', value: 'Não Requer' }, 'SSL', 'TSL']"
                              v-model="form.autenticacao"
                              ></b-form-select>
                          </div>
                          <div class="col-sm-12">
                            <b-form-textarea
                              id="textarea"
                              placeholder="Cabeçalho Relatórios"
                              rows="3"
                              v-model="form.textoRelatorio"
                              max-rows="3"
                            ></b-form-textarea>
                          </div>
                          <div class="col-sm-12">
                            <b-form-textarea
                              id="textarea"
                              placeholder="Observações"
                              rows="3"
                              v-model="form.observacoes"
                              max-rows="3"
                            ></b-form-textarea>
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </b-tab>
                </b-tabs>
              </form>
              <button type="button" class="btn btn-outline-info float-right" @click="validate(doc, 0, form)">Salvar</button>
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
                  <tr class="text-left" v-for="carg in nCargos" :key="carg.id">
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
    <!-- Modal para seleção da Cidade-->
    <div class="cargodts">
      <div id="overlay" v-if=openCidade>
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h6>Selecione o Cargo</h6>
              <button type="button" class="close"  @click="openCidade=false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <b-form-input class="mr-sm-2" placeholder="Buscar" v-model="form.endereco[campocidade].cidade" @keyup.enter="cidade = form.endereco[campocidade].cidade; buscarCidadeKey(cidade)"></b-form-input>
              <br>
              <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
                <thead>
                  <tr class="text-left bg-info txt-light" style="height: 10px;">
                    <th>ID</th>
                    <th>Nome</th>
                    <th>UF</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody style="overflow-y: scroll;height: 150px;">
                  <tr class="text-left" v-for="city in cidade" :key="city.id">
                    <td >{{ city.id }}</td>
                    <td>{{ city.cidade }}</td>
                    <td>{{ city.uf }}</td>
                    <td>
                      <a href="#" class="text-success" @click="form.endereco[campocidade].cidade = city.cidade;form.endereco[campocidade].idCidade=city.id; openCidade=false; "><i class="far fa-check-square"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="row">
                <b-input-group >
                  <b-input-group-append>
                    <b-button variant="outline-info" style="margin-left:10px;" class="material-icons" @click="pagina = pagina - 1;buscarCidade (pagina)">chevron_left</b-button>
                  </b-input-group-append>
                  <b-form-input v-model="pagina" class="col-sm-1 text-center"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="outline-info" style="margin-right:10px;" class="material-icons" @click="pagina = pagina + 1;buscarCidade (pagina)">chevron_right</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import util from '../../assets/scss/util'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
var moment = require('moment')
var data = new Date()

export default {
  data () {
    return {
      openModal: false,
      openCidade: false,
      deleteModal: false,
      isLoading: false,
      campocidade: 0,
      pagina: 1,
      openDatasearch: false,
      doc: 'CNPJ',
      status: '',
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        nome: '',
        idPessoa: '',
        observacoes: '',
        imagem: [],
        cnpjcpf: '',
        pastorResponsavel: '',
        secretario: '',
        tesoureiro: '',
        tipo: 0,
        igrejaSede: '',
        textoRelatorio: '',
        smtp: '',
        porta: '',
        emailmala: '',
        senha: '',
        usuario: '',
        autenticacao: 'Não Requer',
        fone: '',
        vice: '',
        presidente: '',
        endereco: [
          {
            id: '',
            idPessoa: '',
            endereco: '',
            bairro: '',
            idCidade: 0,
            cidade: '',
            numero: '',
            uf: '',
            cep: '',
            complemento: '',
            tipo: 0
          },
          {
            id: '',
            idPessoa: '',
            endereco: '',
            bairro: '',
            idCidade: 0,
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
            tipo: 0
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
          },
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 3
          },
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 4
          },
          {
            id: '',
            idPessoa: '',
            telefone: '',
            tipo: 5
          }
        ],
        email: [
          {
            id: '',
            iPpessoa: '',
            email: '',
            tipo: 0
          },
          {
            id: '',
            iPpessoa: '',
            email: '',
            tipo: 1
          },
          {
            id: '',
            iPpessoa: '',
            email: '',
            tipo: 2
          },
          {
            id: '',
            iPpessoa: '',
            email: '',
            tipo: 3
          }
        ],
        motivo: '',
        moment: moment(data).format('YYYY-MM-DD h:mm:ss')
      },
      cidade: [],
      igreja: []
    }
  },
  mounted () {
    this.isLoading = true
    this.get(this.pagina)
    this.isLoading = false
  },
  methods: {
    save (form) {
      this.form = JSON.stringify(form)
      axios.post('http://192.168.1.106:8089/adonai/igreja', { form }, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        if (res.data === 'success') {
          if (this.form.add === true) {
            this.status = 'Salvo com Sucesso'
          } else if (this.form.edit === true) {
            this.status = 'Alterado com Sucesso'
          } else {
            this.status = 'Excluido com Sucesso'
          }
          this.$toastr.success(this.status, 'Cadastro de Membros', util.toast)
          this.cleanForm(this.form)
          if (this.form.edit) {
            this.openModal = false
          }
        } else {
          this.$toastr.error(res.data, 'Falha ao Salvar', util.toast)
        }
      })
    },
    validate (doc, tipo, form) {
      if (tipo === 1) {
        if (doc === 'CNPJ') {
          this.place = 'CNPJ'
          this.mascara = '##.###.###/####-##'
        } else {
          this.place = 'CPF'
          this.mascara = '###.###.###-##'
        }
      } else {
        if (this.form.nome === '') {
          this.$toastr.warning('Campos Obrigatórios não preenchidos', 'Falha ao Salvar', util.toast)
        } else {
          this.save(form)
        }
      }
    },
    get (pagina) {
      axios.get('http://192.168.1.106:8089/adonai/igrejagrid/' + pagina, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.igreja = res.data
      })
    },
    cleanForm (form) {
      form.id = ''
      form.nome = ''
      form.idPessoa = ''
      form.observacoes = ''
      form.imagem = []
      form.cnpjcpf = ''
      form.pastorResponsavel = ''
      form.secretario = ''
      form.tesoureiro = ''
      form.tipo = 0
      form.igrejaSede = ''
      form.textoRelatorio = ''
      form.smtp = ''
      form.porta = ''
      form.emailmala = ''
      form.senha = ''
      form.usuario = ''
      form.autenticacao = ''
      form.vice = ''
      form.presidente = ''

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
      form.endereco[0].tipo = 0

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
      form.endereco[1].tipo = 1

      form.telefone[0].id = ''
      form.telefone[0].idPessoa = ''
      form.telefone[0].telefone = ''
      form.telefone[0].tipo = 0

      form.telefone[1].id = ''
      form.telefone[1].idPessoa = ''
      form.telefone[1].telefone = ''
      form.telefone[1].tipo = 1

      form.telefone[2].id = ''
      form.telefone[2].idPessoa = ''
      form.telefone[2].telefone = ''
      form.telefone[2].tipo = 2

      form.telefone[3].id = ''
      form.telefone[3].idPessoa = ''
      form.telefone[3].telefone = ''
      form.telefone[3].tipo = 3

      form.telefone[4].id = ''
      form.telefone[4].idPessoa = ''
      form.telefone[4].telefone = ''
      form.telefone[4].tipo = 4

      form.telefone[5].id = ''
      form.telefone[5].idPessoa = ''
      form.telefone[5].telefone = ''
      form.telefone[5].tipo = 5

      form.email[0].id = ''
      form.email[0].idPessoa = ''
      form.email[0].email = ''
      form.email[0].tipo = 0

      form.email[1].id = ''
      form.email[1].idPessoa = ''
      form.email[1].email = ''
      form.email[1].tipo = 1

      form.email[3].id = ''
      form.email[3].idPessoa = ''
      form.email[3].email = ''
      form.email[3].tipo = 3

      form.retorno = ''
      form.motivo = ''
    },
    read (form) {
      this.form.id = form.id
      this.form.nome = form.nome
      this.form.idPessoa = form.idPessoa
      this.form.observacoes = form.observacoes
      this.form.imagem = form.imagem
      this.form.cnpjcpf = form.cnpjcpf
      this.form.pastorResponsavel = form.pastorResponsavel
      this.form.secretario = form.secretario
      this.form.tesoureiro = form.tesoureiro
      this.form.tipo = 0
      this.form.igrejaSede = form.igrejaSede
      this.form.textoRelatorio = form.textoRelatorio
      this.form.smtp = form.smtp
      this.form.porta = form.porta
      this.form.emailmala = form.emailmala
      this.form.senha = form.senha
      this.form.usuario = form.usuario
      this.form.autenticacao = form.autenticacao
      this.form.vice = form.vice
      this.form.presidente = form.presidente

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

      this.form.telefone[3].id = form.telefone[3].id
      this.form.telefone[3].idPessoa = form.telefone[3].idPessoa
      this.form.telefone[3].telefone = form.telefone[3].telefone
      this.form.telefone[3].tipo = 3

      this.form.telefone[4].id = form.telefone[4].id
      this.form.telefone[4].idPessoa = form.telefone[4].idPessoa
      this.form.telefone[4].telefone = form.telefone[4].telefone
      this.form.telefone[4].tipo = 4

      this.form.telefone[5].id = form.telefone[5].id
      this.form.telefone[5].idPessoa = form.telefone[5].idPessoa
      this.form.telefone[5].telefone = form.telefone[5].telefone
      this.form.telefone[5].tipo = 5

      this.form.email[0].id = form.email[0].id
      this.form.email[0].idPessoa = form.email[0].idPessoa
      this.form.email[0].email = form.email[0].email
      this.form.email[0].tipo = 0

      this.form.email[1].id = form.email[1].id
      this.form.email[1].idPessoa = form.email[1].idPessoa
      this.form.email[1].email = form.email[1].email
      this.form.email[1].tipo = 1

      this.form.email[3].id = form.email[3].id
      this.form.email[3].idPessoa = form.email[3].idPessoa
      this.form.email[3].email = form.email[3].email
      this.form.email[3].tipo = 3

      this.form.retorno = form.retorno
      this.form.motivo = form.motivo
      this.openModal = true
    },
    previewFiles (event) {
      console.log(this.$refs)
      // this.form.imagem = this.$refs.myFiles.value
    },
    buscarcep (cep, form, local) {
      if (cep === '') {
        this.$toastr.warning('Por Favor preencha o campo cep', 'Aviso', util.toast)
      } else {
        cep = cep.replace('-', '')
        axios.get('https://viacep.com.br/ws/' + cep + '/json').then(function (response) {
          if (local === 1) {
            form.endereco[0].endereco = response.data.logradouro
            form.endereco[0].bairro = response.data.bairro
            form.endereco[0].cidade = response.data.localidade
            form.endereco[0].uf = response.data.uf
          } else {
            form.endereco[1].endereco = response.data.logradouro
            form.endereco[1].bairro = response.data.bairro
            form.endereco[1].cidade = response.data.localidade
            form.endereco[1].uf = response.data.uf
          }
        })
      }
    },
    buscarCidade (pagina) {
      axios.get('http://192.168.1.106:8089/adonai/cidade/' + pagina, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.cidade = res.data
      })
    },
    buscarCidadeKey (cidade) {
      axios.get('http://192.168.1.106:8089/adonai/cidadekey/' + cidade, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.cidade = res.data
      })
    },
    getIgreja (id) {
      axios.get('http://192.168.1.106:8089/adonai/igreja/' + id, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        console.log(res.data)
        this.read(res.data)
      })
    }
  },
  computed: {
    ...mapState('auth', ['user'])
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
.table-sm {
  padding: 2px;
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

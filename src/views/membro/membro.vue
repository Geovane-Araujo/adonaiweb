<template>
  <div class="membro">
    <div class="container-fluid">
      <div class="row bg-ligth">
        <div class="col-lg-12">
          <p>Cadastro de Membros</p>
        </div>
      </div>
      <div class="tre">
        <button
        class="btn btn-outline-info"
        @click="openModal=true; limparCampos(item);">
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
                <th>Telefone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left" v-for="item in membro" :key="item.id">
                <td >{{ item.id }}</td>
                <td>{{ item.nome }}</td>
                <td>{{ item.endereco[0].endereco + ", " + item.endereco[0].bairro + ", " + item.endereco[0].numero}}</td>
                <td>{{ item.dataNascimento }}</td>
                <td>
                  <a href="#" @click="openModal =true; povoar(item); form.edit= true;form.del=false;form.add=false"  class="text-success"><i class="fas fa-edit"></i></a>
                  &nbsp;
                  <a href="#" @click="deleteModal=true; form.id = item.id; form.edit=false;form.add=false; form.del = true" class="text-danger"><i class="far fa-trash-alt"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div id="overlay" v-if=openModal>
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastro de Membros</h5>
            <button type="button" class="close"  @click="openModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div>
              <b-tabs content-class="mt-3">
                <b-tab title="Principal" active>
                  <b-container class="bv-example-row">
                    <b-col>
                      <div>
                        <b-avatar src="https://placekitten.com/300/300" size="10rem"></b-avatar>
                      </div>
                    </b-col>
                    <b-col>
                      <b-rol>
                        <div>
                          <b-form inline>
                              <label class="sr-only" for="inline-form-input-name">Name</label>
                              <b-input style="width: 550px;"
                              class="mb-2 mr-sm-2 mb-sm-0"
                              placeholder="Nome Completo">
                              </b-input>
                            </b-form>
                          </div>
                          <div>
                              <b-form inline>
                              <label class="sr-only" for="inline-form-input-name">Name</label>
                              <b-input style="width: 550px;"
                              class="mb-2 mr-sm-2 mb-sm-0"
                              placeholder="Nome Completo">
                              </b-input>
                            </b-form>
                          </div>
                      </b-rol>
                    </b-col>
                  </b-container>
                </b-tab>
                <b-tab title="Enderecos"><p>I'm the second tab</p></b-tab>
                <b-tab title="Telefones"><p>I'm a disabled tab!</p></b-tab>
                <b-tab title="Emails"><p>I'm a disabled tab!</p></b-tab>
              </b-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal excluir -->
    <div id="overlay" v-if=deleteModal>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close"  @click="deleteModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <h5 class="text-danger">Deseja realmente Excluir ?</h5>
            <button class="btn" btn-outline-danger @click="submit(); deleteModal=false;" >Sim</button>
            <button class="btn" btn-outline-success float-right @click="deleteModal=false">Não</button>
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
              <h6>{{ titulo }}</h6>
              <table class="table table-botdered table-striped table-sm table-hover table-responsive-md">
                <thead>
                  <tr class="text-left bg-info txt-light" style="height: 10px;">
                    <th>ID</th>
                    <th>Nome</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-left" v-for="item in cargo" :key="item.id">
                    <td >{{ item.id }}</td>
                    <td>{{ item.descricao }}</td>
                    <td>
                      <a href="#" class="text-success" @click="form.descricao = item.descricao;form.idCargo=item.idcargo; openDatasearch=false; "><i class="far fa-check-square"></i></a>
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

export default {
  data: () => ({
    openModal: false,
    deleteModal: false,
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
          idCidade: '',
          cidade: '',
          numero: '',
          uf: '',
          cep: '',
          complemento: '',
          tipo: ''
        }
      ],
      telefone: [
        {
          id: '',
          idpessoa: '',
          telefone: '',
          tipo: ''
        }
      ],
      email: [
        {
          id: '',
          idPessoa: '',
          email: '',
          tipo: ''
        }
      ],
      retorno: '',
      motivo: ''
    }
  }),
  mounted () {
    this.ActionSetMembro()
    this.ActionSetCargo()
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

      form.endereco[2].id = ''
      form.endereco[2].idPessoa = ''
      form.endereco[2].endereco = ''
      form.endereco[2].bairro = ''
      form.endereco[2].idCidade = ''
      form.endereco[2].cidade = ''
      form.endereco[2].numero = ''
      form.endereco[2].uf = ''
      form.endereco[2].cep = ''
      form.endereco[2].complemto = ''
      form.endereco[2].tipo = ''

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
      this.form.endereco[0].tipo = form.endereco[0].tipo

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
      this.form.endereco[1].tipo = form.endereco[1].tipo

      this.form.endereco[2].id = form.endereco[2].id
      this.form.endereco[2].idPessoa = form.endereco[2].idPessoa
      this.form.endereco[2].endereco = form.endereco[2].endereco
      this.form.endereco[2].bairro = form.endereco[2].bairro
      this.form.endereco[2].idCidade = form.endereco[2].idCidade
      this.form.endereco[2].cidade = form.endereco[2].cidade
      this.form.endereco[2].numero = form.endereco[2].numero
      this.form.endereco[2].uf = form.endereco[2].uf
      this.form.endereco[2].cep = form.endereco[2].cep
      this.form.endereco[2].complemto = form.endereco[2].complemto
      this.form.endereco[2].tipo = form.endereco[2].tipo

      this.form.telefone[0].id = form.telefone[0].id
      this.form.telefone[0].idPessoa = form.telefone[0].idPessoa
      this.form.telefone[0].telefone = form.telefone[0].telefone
      this.form.telefone[0].tipo = form.telefone[0].tipo

      this.form.telefone[1].id = form.telefone[1].id
      this.form.telefone[1].idPessoa = form.telefone[1].idPessoa
      this.form.telefone[1].telefone = form.telefone[1].telefone
      this.form.telefone[1].tipo = form.telefone[1].tipo

      this.form.telefone[2].id = form.telefone[2].id
      this.form.telefone[2].idPessoa = form.telefone[2].idPessoa
      this.form.telefone[2].telefone = form.telefone[2].telefone
      this.form.telefone[2].tipo = form.telefone[2].tipo

      this.form.email[0].id = form.email[0].id
      this.form.email[0].idPessoa = form.email[0].idPessoa
      this.form.email[0].email = form.email[0].email
      this.form.email[0].tipo = form.email[0].tipo

      this.form.email[1].id = form.email[1].id
      this.form.email[1].idPessoa = form.email[1].idPessoa
      this.form.email[1].email = form.email[1].email
      this.form.email[1].tipo = form.email[1].tipo

      this.form.retorno = ''
      this.form.motivo = ''
    }
  },
  computed: {
    ...mapState('membro', ['membro']),
    ...mapState('cargo', ['cargo'])
  },
  props: {
    membros: { type: Object, required: false },
    cargos: { type: Object, required: false }
  }
}
</script>
<style lang=scss scoped>
.table-overflow {
    max-height:90vh;
    overflow-y:auto;
}
p {
  font-size: 30px;
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

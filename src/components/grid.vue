<template id="adonaigrid">
<div style="padding-left:0px;">
  <loader v-show="openloading" object="#5e8a75" color1="#e9e6e1" color2="#c4b5a0" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="84" name="circular"></loader>
  <div>
    <DataTable class="p-datatable-sm"
        scrollHeight="50vh"
        :scrollable="true"
        style="font-size:14px;"
        :value="reg"
        :paginator="true"
        :rows="15"
        paginatorTemplate=""
        :selection.sync="selects" dataKey="id"
        :resizableColumns="true"
        columnResizeMode="fit">
        <Column :column-reorder="selected" :headerStyle="'width:'+title.tamanho+'px'" headerClass="altura" :bodyStyle="'width:'+title.tamanho+'px'" v-for="title in flex" :key="title.ID" :field="title.name" :header="title.name"></Column>
        <Column headerStyle="width: 20px;" bodyStyle=""  :exportable="false">
            <template #body="slotProps">
                <Button style="font-size: 10px;" icon="pi pi-pencil" class="p-button-rounded-sm p-button-text" @click="getbyId(slotProps.data.id); form.edit=true;form.add=false" />
                <Button icon="pi pi-trash" class="p-button-rounded-sm p-button-text" @click="onDelete(slotProps.data, form)" />
            </template>
        </Column>
        <template style="font-size:14px;" #paginatorLeft>
          <Paginator @page="onPage($event)" class="p-paginator-success" :rows="15" :totalRecords="totalRows"></Paginator>
        </template>
        <template style="font-size:14px;" #paginatorRight>
          <InputText style="width: 40vw;margin-right:50px;" v-model="buscar" @keyup="getexplorer(buscar)"  placeholder="Pesquisar"/>
        </template>
    </DataTable>
  </div>
  <Dialog :visible.sync="deleteModal" :style="{width: '450px'}" header="Confirmar" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
      <span >Deseja Realmente Excluir?</span>
    </div>
    <template #footer>
      <Button label="Sim" icon="pi pi-check" class="p-button-text" @click="save(form);deleteModal = false" />
      <Button label="Não" icon="pi pi-times" class="p-button-text" @click="deleteModal = false"/>
    </template>
  </Dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import adonai from '../http/router'
import utlexpl from '../util/utilClass'
import util from '../assets/scss/util'
import axios from 'axios'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Paginator from 'primevue/paginator'
// import CheckBox from 'primevue/checkbox'
// sortable este atributo para ordenar

export default {
  name: 'adonaigrid',
  data () {
    return {
      openloading: false,
      deleteModal: false,
      selectedColumns: null,
      ref: '',
      buscar: '',
      pagina: 1,
      criterio: '',
      reg: [],
      selects: null,
      totalRows: 0,
      explorer: {
        route: '',
        pagina: 1,
        criterios: ''
      },
      cabecalho: []
    }
  },
  props: {
    flex: {
      type: Object
    },
    registros: {
      type: Array
    },
    form: {
      type: Object
    },
    getbyId: Function,
    save: Function,
    type: {
      type: Boolean
    }
  },
  mounted () {
  },
  methods: {
    selected (cal) {
      console.log('selecionado')
      console.log(cal)
    },
    get (explorer, type) {
      this.openloading = true
      explorer.criterios = ''
      axios.post(adonai.url + 'aexplorer', explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.openloading = false
        if (res.data.ret === 'success') {
          this.reg = res.data.obj
          this.ref = explorer.route
          this.totalRows = res.data.totalRows
          this.explorer = explorer
          if (res.data.obj.length > 0) {
            this.cabecalho = Object.keys(res.data.obj[0])
          }
        } else {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
        }
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    getexplorer (crit) {
      if (this.cabecalho.length > 0) {
        var query = ' AND'
        this.cabecalho.forEach(e => {
          query += ' CAST(' + e + ' as varchar) iLike \'%' + crit + '%\' OR'
        })
        query = query.substring(0, query.length - 2)
        utlexpl.explorer.criterios = query
        utlexpl.explorer.route = this.ref
        axios.post(adonai.url + 'aexplorer', utlexpl.explorer, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret === 'success') {
            this.reg = res.data.obj
          } else {
            this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
          }
        }).catch(err => {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
        })
      }
    },
    onPage (event) {
      event.page += 1
      this.explorer.pagina = event.page
      this.get(this.explorer)
    },
    onSelectRsgister (cabecalho) {
      this.criterio = cabecalho
      this.$toastr.success(cabecalho + ' selecionado', 'AdonaiSoft Diz:', util.toast)
    },
    onDelete (registro, form) {
      if (this.ref === 'menu_duplicata_receita' || this.ref === 'menu_duplicata_despesa') {
        form.dataPagamento = registro.datapagamento
      }
      form.id = registro.id
      form.edit = false
      form.add = false
      form.del = true
      this.deleteModal = true
    }
  },
  components: {
    Dialog,
    Button,
    DataTable,
    Column,
    InputText,
    Paginator
    // CheckBox
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>
<style lang="scss" scoped>
tr {
  line-height: 14px;
  font-size: 13px;
}
.p-paginator-next{
  background-color: #000000;
}
.p-datatable {
  .p-rowgroup-header{
    height: 10px;
  }
}
.altura{
  height: 5px;
}
</style>

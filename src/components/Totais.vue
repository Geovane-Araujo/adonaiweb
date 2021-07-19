<template>
  <div>
    <Dialog style="font-size:10px;" header="Totais" :visible.sync="open" :style="{width: '50vw'}" :modal="true">
      <b-container>
        <div class="row">
          <div class="col-sm-3">
            <h6 class="text-info">Realizado</h6>
            <money type="text"
              class="form-control text-info"
              v-bind="currency"
              disabled=""
              v-model="realizado"/>
          </div>
          <div class="col-sm-3">
            <h6 class="text-danger">Em Aberto</h6>
            <money type="text"
              class="form-control text-danger"
              v-bind="currency"
              disabled=""
              v-model="pendente"/>
          </div>
          <div class="col-sm-3">
            <h6 class="text-danger">Atrasado</h6>
            <money type="text"
              class="form-control text-danger"
              v-bind="currency"
              disabled=""
              v-model="atraso"/>
          </div>
          <div class="col-sm-3">
            <h6 class="text-info">Total</h6>
            <money type="text"
              class="form-control text-info"
              v-bind="currency"
              disabled=""
              v-model="total"/>
          </div>
        </div>
      </b-container>
    </Dialog>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog'
import adonai from '../http/router'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'a-totais',
  data () {
    return {
      open: false,
      total: 0,
      pendente: 0,
      realizado: 0,
      atraso: 0,
      currency: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      }
    }
  },
  methods: {
    getTotais (tipo) {
      axios.get(adonai.url + 'duplicata/totais/' + tipo, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.pendente = res.data.obj.pendentes
        this.realizado = res.data.obj.realizadas
        this.total = res.data.obj.total
        this.atraso = res.data.obj.vencidas
        this.open = true
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    getTeste () {
      this.open = true
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  components: {
    Dialog
  }
}
</script>

<style lang="scss" scoped>
</style>

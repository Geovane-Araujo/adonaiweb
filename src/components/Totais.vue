<template>
  <div>
    <Dialog style="font-size:10px;" header="Totais" :visible.sync="open" :style="{width: '50vw'}" :modal="true">
      <b-container>
        <div class="row">
          <div class="col-sm-2">
            <h6 class="text-info">Realizado</h6>
            <money type="text"
              class="form-control text-info"
              v-bind="currency"
              disabled=""
              v-model="realizado"/>
          </div>
          <div class="col-sm-2">
            <h6 class="text-danger">Em Aberto</h6>
            <money type="text"
              class="form-control text-danger"
              v-bind="currency"
              disabled=""
              v-model="pendente"/>
          </div>
          <div class="col-sm-2">
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
      realizado: 0
    }
  },
  methods: {
    getTotais (filter) {
      axios.get(adonai.url + 'totais/', filter, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.open = true
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err, life: 5000 })
      })
    },
    getTeste () {
      alert('s')
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

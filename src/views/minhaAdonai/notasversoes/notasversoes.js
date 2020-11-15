import expl from '../../../util/utilClass'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data: () => ({
    openloading: false,
    versao: []
  }),
  mounted () {
    expl.explorer.route = 'notaVersao'
    this.$refs.grid.get(expl.explorer)
  }
}

import 'vue-loading-overlay/dist/vue-loading.css'
import expl from '../../util/utilClass'

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

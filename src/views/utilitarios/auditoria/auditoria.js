import 'vue-loading-overlay/dist/vue-loading.css'
import exp from '../../../util/utilClass'

export default {
  mounted () {
    exp.explorer.route = 'menu_auditoria'
    this.$refs.grid.get(exp.explorer, false)
  }
}

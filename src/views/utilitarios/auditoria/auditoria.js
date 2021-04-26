import 'vue-loading-overlay/dist/vue-loading.css'
import exp from '../../../util/utilClass'

export default {
  mounted () {
    exp.explorer.route = 'menu_auditoria'
    exp.explorer.pagina = 1
    exp.explorer.criterios = 'order by id desc'
    this.$refs.grid.get(exp.explorer, false)
  }
}

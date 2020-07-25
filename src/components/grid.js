export default {
  name: 'adonaigrid',
  data () {
    return {
      deleteModal: false,
      pagina: 1
    }
  },
  props: {
    titulos: {
      type: Array,
      required: true
    },
    registros: {
      type: Array,
      required: true
    },
    form: {
      type: Object
    },
    getbyId: Function,
    save: Function
  }
}

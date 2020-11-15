import { mapState } from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data () {
    return {
      center: { lat: -89.226622, lng: 13.7013266 },
      markers: [{
        position: { lat: -89.226622, lng: -89.226622 },
        title: 'teste'
      }]
    }
  },
  mounted () {
  },
  methods: {
  },
  components: {
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

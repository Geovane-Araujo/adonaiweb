import { mapState } from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css'
import Mapbox from 'mapbox-gl'
import { MglMap, MglNavigationControl, MglGeolocateControl, MglMarker, MglPopup } from 'vue-mapbox'
import adonai from '../../../http/router'
import axios from 'axios'

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglMarker,
    MglPopup
  },
  data () {
    return {
      accessToken: 'pk.eyJ1IjoiZ2VvdmFuZS1hZG9uYWlzb2Z0IiwiYSI6ImNraHQzdG50dTBxMGcyem95MnRmaXlvcHcifQ.pYRAxlqBLaT-3GGVU4enAA',
      mapStyle: 'mapbox://styles/geovane-adonaisoft/ckht3vcc91rey19ormfkadl4t',
      coordinates: [-52.695751, -26.208313],
      markers: []
    }
  },
  mounted () {
    this.getMaps()
  },
  methods: {
    onMapLoaded (event) {
      this.map = event.map
      this.$store.map = event.map
    },
    getMaps () {
      this.openloading = true
      axios.get(adonai.url + 'maps', { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
        this.markers = res.data.obj
        this.openloading = false
      })
    }
  },
  created () {
    this.map = null
    this.mapbox = Mapbox
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapArtboardPositioningState } = createNamespacedHelpers(
  'artboardPositioning'
)

export default {
  computed: {
    ...mapArtboardPositioningState(['zoomLevel'])
  }
}

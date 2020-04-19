export const state = () => ({
  zoomLevel: 1.0
})

export const mutations = {
  updateZoomLevel(state, zoomLevel) {
    state.zoomLevel = zoomLevel
  }
}

export const actions = {
  updateZoomLevel({ commit, dispatch }, payload) {
    commit('updateZoomLevel', payload)
  }
}

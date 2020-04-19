export const state = () => ({
  zoomLevel: 1.0,
  deltaX: 0,
  deltaY: 0
})

export const mutations = {
  updateZoomLevel(state, zoomLevel) {
    state.zoomLevel = zoomLevel
  },

  updateDeltaX(state, deltaX) {
    state.deltaX += deltaX
  },

  updateDeltaY(state, deltaY) {
    state.deltaY += deltaY
  }
}

export const actions = {
  updateZoomLevel({ commit }, payload) {
    commit('updateZoomLevel', payload)
  },

  addDeltaX({ commit }, payload) {
    commit('updateDeltaX', payload)
  },

  addDeltaY({ commit }, payload) {
    commit('updateDeltaY', payload)
  }
}

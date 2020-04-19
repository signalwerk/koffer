export const state = () => ({
  zoomFactor: 1.0,
  deltaX: 0,
  deltaY: 0
})

export const mutations = {
  updateZoomFactor(state, zoomFactor) {
    state.zoomFactor = zoomFactor
  },

  updateDeltaX(state, deltaX) {
    state.deltaX += deltaX
  },

  updateDeltaY(state, deltaY) {
    state.deltaY += deltaY
  }
}

export const actions = {
  updateZoomFactor({ commit }, payload) {
    commit('updateZoomFactor', payload)
  },

  addDeltaX({ commit }, payload) {
    commit('updateDeltaX', payload)
  },

  addDeltaY({ commit }, payload) {
    commit('updateDeltaY', payload)
  }
}

export const state = () => ({
  isRunning: {
    isRunning: false
  }
})

export const mutations = {
  setIsRunning(state, isRunning) {
    state.isRunning.isRunning = isRunning
  },

  nosync_toggle(state, isRunning) {
    console.log(isRunning)

    state.isRunning.isRunning = isRunning.isRunning
  }
}

export const actions = {
  start({ commit }) {
    commit('setIsRunning', {
      isRunning: true
    })
  },

  stop({ commit }) {
    commit('setIsRunning', {
      isRunning: false
    })
  }
}

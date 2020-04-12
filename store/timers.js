import Vue from 'vue'
export const DEFAULT_TIMER = 'std'

export const state = () => ({
  timers: {
    [DEFAULT_TIMER]: {
      __meta: {
        sentAt: null,
        gotAt: null
      },
      uuid: DEFAULT_TIMER,
      updatedAt: 0,
      state: 0
    }
  }
})

export const actions = {
  updateMode({ commit, dispatch }, payload) {
    commit('updateMode', payload)
  }
}

export const mutations = {
  updateMode(state, { uuid, mode }) {
    // state.clientNowOnUpdate = Date.now()

    console.log('--- mutations updateMode', mode)
    state.timers[uuid] = {
      ...state.timers[uuid],
      mode
    }
  },

  nosync_restore(state, timers) {
    state.timers = timers
  },

  nosync_updateTimer(state, timer) {
    console.log('------ clientNowOnUpdate call')
    Vue.set(state.timers, DEFAULT_TIMER, {
      ...state.timers[DEFAULT_TIMER],
      ...timer
    })
  }
}

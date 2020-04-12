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
  updateTimer({ commit, dispatch }, payload) {
    commit('updateTimer', payload)
  }
}

export const mutations = {
  updateTimer(state, { uuid, mode, value }) {
    // state.clientNowOnUpdate = Date.now()

    console.log('--- mutations updateTimer', mode)

    Vue.set(state.timers, uuid, {
      ...state.timers[uuid],
      // __meta: {
      //   ...state.timers[uuid].__meta,
      //   gotAt: Date.now()
      // },
      mode,
      value: (state.timers[uuid] && state.timers[uuid].value) || 0
    })
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

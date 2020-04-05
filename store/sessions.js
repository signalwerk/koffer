import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const state = {
  sessions: {}
}

export const actions = {
  addSession({ commit, dispatch }, payload) {
    const uuid = uuidv4()

    const session = {
      uuid,
      ...payload
    }

    commit('addSession', session)
  }
}

export const mutations = {
  addSession(state, session) {
    Vue.set(state.sessions, session.uuid, session)
  },
  nosync_restore(state, sessions) {
    // console.log('nosync_restore', cards)
    state.sessions = sessions
  },

  nosync_updateSession(state, session) {
    // console.log('nosync_updateCard', session)

    if (session.deleted) {
      Vue.delete(state.sessions, session.uuid)
    } else {
      Vue.set(state.sessions, session.uuid, {
        ...state.sessions[session.uuid],
        ...session
      })
    }
  }
}

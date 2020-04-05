// import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const state = {
  sessions: {}
}

export const mutations = {
  setUserName(state, name) {
    state.userName = name
  },

  setSessionName(state, name) {
    state.sessionName = name
  }
}

export const actions = {
  addSession({ commit, dispatch }, payload) {
    const uuid = uuidv4()

    const session = {
      uuid,
      ...payload
    }

    commit('addSession', session)
  },

  setSettings({ commit }, { userName, sessionName }) {
    commit('setUserName', userName)
    commit('setSessionName', sessionName)
  }
}

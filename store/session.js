export const state = {
  userName: '',
  sessionName: ''
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
  setSettings({ commit }, { userName, sessionName }) {
    commit('setUserName', userName)
    commit('setSessionName', sessionName)
  }
}

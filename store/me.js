import { v4 as uuidv4 } from 'uuid'

export const state = () => ({
  name: 'no name',
  uuid: uuidv4()
})

export const mutations = {
  updateName(state, name) {
    // console.log('nosync_restore', cards)
    state.name = name
  }
}

export const actions = {
  updateName({ commit, dispatch }, payload) {
    commit('updateName', payload)
  }
}

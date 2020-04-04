export const state = () => []

export const actions = {
  addCard({ commit, dispatch }) {
    commit('addCard')
    dispatch('push')
  },

  updateCard({ commit, dispatch }, payload) {
    commit('updateCard', payload)
    dispatch('push')
  },

  deleteCard({ commit, dispatch }, index) {
    commit('deleteCard', index)
    dispatch('push')
  },

  push({ state, dispatch }) {
    dispatch(
      'socket/emit',
      {
        cards: state
      },
      { root: true }
    )
  }
}

export const mutations = {
  /**
   * Adds a new blank card
   * @param state
   */
  addCard(state) {
    state.push({
      x: 0,
      y: 0,
      text: ''
    })
  },

  /**
   * Update a given specific card
   * @param state
   * @param index
   * @param card
   */
  updateCard(state, { index, card }) {
    state[index] = card
  },

  /**
   * Delete a specific card
   * @param state
   * @param index
   */
  deleteCard(state, index) {
    state.splice(index, 1)
  }
}

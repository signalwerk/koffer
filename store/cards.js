export const state = () => ({
  cards: {}
})

export const actions = {
  addCard({ commit, dispatch }) {
    commit('addCard')
    dispatch('push')
  },

  updateCard({ commit, dispatch }, payload) {
    commit('updateCard', payload)
    dispatch('push')
  },

  updateCardPosition({ commit, dispatch }, payload) {
    commit('updateCardPosition', payload)
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
    const id = Math.floor(Math.random() * 10000)
    state.cards = {
      ...state.cards,
      [id]: {
        id,
        x: 0,
        y: 0,
        text: ''
      }
    }
  },

  /**
   * Update a given specific card
   * @param id
   * @param index
   * @param card
   */
  updateCard(state, { id, card }) {
    state.cards[id] = card
  },

  updateCardPosition(state, { id, x, y }) {
    state.cards[id].x = x
    state.cards[id].y = y
  },

  /**
   * Delete a specific card
   * @param state
   * @param id
   */
  deleteCard(state, id) {
    const { [id]: removedId, ...newCards } = state.cards
    state.cards = newCards
    // delete state.cards[id]
  }
}

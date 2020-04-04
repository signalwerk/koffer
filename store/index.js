import debounce from 'lodash.debounce'

const debouncedPush = debounce((state) => {
  // eslint-disable-next-line no-console
  console.log('[PUSH]', state)
}, 1000)

export const state = () => ({
  cards: []
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

  deleteCard({ commit, dispatch }, index) {
    commit('deleteCard', index)
    dispatch('push')
  },

  push({ state }) {
    debouncedPush(state)
  }
}

export const mutations = {
  /**
   * Adds a new blank card
   * @param state
   */
  addCard(state) {
    state.cards.push({
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
    state.cards[index] = card
  },

  /**
   * Delete a specific card
   * @param state
   * @param index
   */
  deleteCard(state, index) {
    state.cards.splice(index, 1)
  }
}

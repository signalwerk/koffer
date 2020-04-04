import { v4 as uuidv4 } from 'uuid'

export const state = () => ({
  cards: {}
})

export const actions = {
  addCard({ commit, dispatch }) {
    const id = uuidv4()

    const card = {
      id,
      x: 0,
      y: 0,
      text: ''
    }

    dispatch('socket/card', {
      ...card
    })

    commit('addCard', card)
    dispatch('push')
  },

  updateCard({ commit, dispatch }, payload) {
    commit('updateCard', payload)
    dispatch('push')
  },

  updateCardContent({ commit, dispatch }, payload) {
    commit('updateCardContent', payload)
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
  addCard(state, card) {
    state.cards = {
      ...state.cards,
      [card.id]: card
    }
  },

  /**
   * Update a given specific card
   * @param id
   * @param index
   * @param card
   */
  updateCardContent(state, { id, text }) {
    state.cards[id].text = text
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

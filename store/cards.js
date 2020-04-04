import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

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
  addCard(state) {
    const id = uuidv4()
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
  updateCardContent(state, { id, text }) {
    state.cards[id].text = text
  },

  updateCardPosition(state, { id, x, y, transform }) {
    state.cards[id].x = x
    state.cards[id].y = y
    state.cards[id].transform = transform
  },

  /**
   * Delete a specific card
   * @param state
   * @param id
   */
  deleteCard(state, id) {
    // const { [id]: removedCard, ...newCards } = state.cards
    // state.cards = newCards
    Vue.delete(state.cards, id)
    // delete state.cards[id]
  }
}

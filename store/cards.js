import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const state = () => ({
  cards: {}
})

export const actions = {
  addCard({ commit, dispatch }, payload) {
    const uuid = uuidv4()

    const card = {
      uuid,
      deleted: false,
      x: 0,
      y: 0,
      text: '',
      ...payload
    }

    commit('addCard', card)
  },

  updateCard({ commit, dispatch }, payload) {
    commit('updateCard', payload)
  },

  updateCardContent({ commit, dispatch }, payload) {
    commit('updateCardContent', payload)
  },

  updateCardPosition({ commit, dispatch }, payload) {
    commit('updateCardPosition', payload)
  },

  deleteCard({ commit, dispatch }, payload) {
    commit('deleteCard', payload)
  }
}

export const mutations = {
  /**
   * Adds a new blank card
   * @param state
   */
  addCard(state, card) {
    Vue.set(state.cards, card.uuid, card)
  },

  nosync_restore(state, cards) {
    // console.log('nosync_restore', cards)
    state.cards = cards
  },

  nosync_updateCard(state, card) {
    // console.log('nosync_updateCard', card)

    if (card.deleted) {
      Vue.delete(state.cards, card.uuid)
    } else {
      Vue.set(state.cards, card.uuid, {
        ...state.cards[card.uuid],
        ...card
      })
    }
  },

  /**
   * Update a given specific card
   * @param id
   * @param index
   * @param card
   */
  updateCardContent(state, { uuid, text }) {
    state.cards[uuid].text = text
  },

  updateCardPosition(state, { uuid, x, y, transform }) {
    state.cards[uuid].x = x
    state.cards[uuid].y = y
    state.cards[uuid].transform = transform
  },

  /**
   * Delete a specific card
   * @param state
   * @param id
   */
  deleteCard(state, { uuid, deleted }) {
    // const { [uuid]: removedCard, ...newCards } = state.cards
    state.cards[uuid].deleted = deleted
    Vue.delete(state.cards, uuid)
  }
}

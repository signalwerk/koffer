export const state = () => ({
  cards: []
})

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

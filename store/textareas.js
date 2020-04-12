import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const state = () => ({
  textareas: {}
})

export const actions = {
  addTextarea({ commit, dispatch }, payload) {
    const uuid = uuidv4()

    const textarea = {
      uuid,
      deleted: false,
      x: 0,
      y: 0,
      text: 'Text',
      ...payload
    }

    commit('addTextarea', textarea)
  },

  updateTextarea({ commit, dispatch }, payload) {
    commit('updateTextarea', payload)
  },

  updateTextareaContent({ commit, dispatch }, payload) {
    commit('updateTextareaContent', payload)
  },

  updateTextareaPosition({ commit, dispatch }, payload) {
    commit('updateTextareaPosition', payload)
  },

  deleteTextarea({ commit, dispatch }, payload) {
    commit('deleteTextarea', payload)
  }
}

export const mutations = {
  /**
   * Adds a new blank textarea
   * @param state
   * @param textarea
   */
  addTextarea(state, textarea) {
    Vue.set(state.textareas, textarea.uuid, textarea)
  },

  nosync_restore(state, textareas) {
    // console.log('nosync_restore', textareas)
    state.textareas = textareas
  },

  nosync_updateTextarea(state, textarea) {
    console.log('nosync_updateTextarea', textarea)

    if (textarea.deleted) {
      Vue.delete(state.textareas, textarea.uuid)
    } else {
      Vue.set(state.textareas, textarea.uuid, {
        ...state.textareas[textarea.uuid],
        ...textarea
      })
    }
  },

  /**
   * Update a given specific textarea
   * @param id
   * @param index
   * @param textarea
   */
  updateTextareaContent(state, textarea) {
    const { uuid, text } = textarea
    state.textareas[uuid].text = text
  },

  updateTextareaPosition(state, { uuid, x, y }) {
    state.textareas[uuid].x = x
    state.textareas[uuid].y = y
  },

  /**
   * Delete a specific textarea
   * @param state
   * @param id
   */
  deleteTextarea(state, { uuid, deleted }) {
    // const { [uuid]: removedTextarea, ...newTextareas } = state.textareas
    state.textareas[uuid].deleted = deleted
    Vue.delete(state.textareas, uuid)
  }
}

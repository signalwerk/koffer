import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const SHAPES = ['circle', 'triangle', 'rectangle']

export const state = () => ({
  shapes: {}
})

export const actions = {
  add({ commit, dispatch }) {
    commit('add')
  },

  update({ commit, dispatch }, payload) {
    commit('update', payload)
  },

  updatePosition({ commit, dispatch }, payload) {
    commit('updatePosition', payload)
  },

  delete({ commit, dispatch }, index) {
    commit('delete', index)
  }
}

export const mutations = {
  add(state) {
    const id = uuidv4()
    state.shapes = {
      ...state.shapes,
      [id]: {
        id,
        x: 0,
        y: 0,
        shape: 'circle'
      }
    }
  },

  updatePosition(state, { id, x, y, transform }) {
    state.shapes[id].x = x
    state.shapes[id].y = y
    state.shapes[id].transform = transform
  },

  delete(state, id) {
    Vue.delete(state.shapes, id)
  }
}

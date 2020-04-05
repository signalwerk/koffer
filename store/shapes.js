import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const SHAPES = ['circle', 'triangle', 'rectangle']

export const state = () => ({
  shapes: {}
})

export const actions = {
  add({ commit, dispatch }, payload) {
    const uuid = uuidv4()
    const shape = {
      [uuid]: {
        uuid,
        x: 0,
        y: 0,
        shape: 'circle',
        ...payload
      }
    }
    commit('add', shape)
  },

  update({ commit, dispatch }, payload) {
    commit('update', payload)
  },

  updateShape({ commit, dispatch }, payload) {
    commit('updateShape', payload)
  },

  updatePosition({ commit, dispatch }, payload) {
    commit('updatePosition', payload)
  },

  delete({ commit, dispatch }, index) {
    commit('delete', index)
  }
}

export const mutations = {
  add(state, shape) {
    Vue.set(state.shapes, shape.uuid, shape)
  },

  nosync_restore(state, cards) {
    state.cards = cards
  },

  updateShape(state, { uuid, shape }) {
    state.shapes[uuid].shape = shape
  },

  updatePosition(state, { uuid, x, y, transform }) {
    state.shapes[uuid].x = x
    state.shapes[uuid].y = y
    state.shapes[uuid].transform = transform
  },

  delete(state, uuid) {
    Vue.delete(state.shapes, uuid)
  }
}

import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const SHAPES = ['circle', 'triangle', 'rectangle']

export const state = () => ({
  shapes: {}
})

export const actions = {
  addShape({ commit, dispatch }, payload) {
    const uuid = uuidv4()

    const shape = {
      uuid,
      deleted: false,
      x: 0,
      y: 0,
      shape: 'circle',
      ...payload
    }

    commit('addShape', shape)
  },

  updateShape({ commit, dispatch }, payload) {
    commit('updateShape', payload)
  },

  updatePosition({ commit, dispatch }, payload) {
    commit('updatePosition', payload)
  },

  delete({ commit, dispatch }, payload) {
    commit('delete', payload)
  }
}

export const mutations = {
  nosync_restore(state, shapes) {
    state.shapes = shapes
  },

  nosync_updateShape(state, shape) {
    if (shape.deleted) {
      Vue.delete(state.shapes, shape.uuid)
    } else {
      Vue.set(state.shapes, shape.uuid, {
        ...state.shapes[shape.uuid],
        ...shape
      })
    }
  },

  addShape(state, shape) {
    Vue.set(state.shapes, shape.uuid, shape)
  },

  updateShape(state, { uuid, shape }) {
    state.shapes[uuid].shape = shape
  },

  updatePosition(state, { uuid, x, y, transform }) {
    state.shapes[uuid].x = x
    state.shapes[uuid].y = y
  },

  delete(state, { uuid, deleted }) {
    state.shapes[uuid].deleted = deleted
    Vue.delete(state.shapes, uuid)
  }
}

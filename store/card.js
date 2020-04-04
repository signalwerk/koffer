// https://nuxtjs.org/guide/vuex-store/
const updatePosition = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => ({
  x: x1 + x2,
  y: y1 + y2
})

export const state = () => ({
  x: 0,
  y: 0,
  text: 'default'
})

export const mutations = {
  drag(state, payload) {
    state = {
      ...state,
      ...updatePosition(state, payload)
    }
  }
}

export const getters = {
  x: (state) => state.x,
  y: (state) => state.y
}

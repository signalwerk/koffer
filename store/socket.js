import debounce from 'lodash.debounce'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000')

const debouncedEmit = debounce((socket, state) => {
  socket.emit('update', JSON.stringify(state))
}, 1000)

export const state = () => {}

export const actions = {
  emit({ state }, payload) {
    debouncedEmit(socket, payload)
  },

  disconnect({ state }) {
    socket.disconnect()
  }
}

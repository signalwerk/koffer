import debounce from 'lodash.debounce'
import io from 'socket.io-client'

// const socket = io.connect('http://localhost:3000')

// const socket = io('https://signers-koffer.herokuapp.com')
const socket = io('http://localhost:5000')
let sessionID = null

const debouncedEmit = debounce((socket, state) => {
  socket.emit('update', JSON.stringify(state))
}, 1000)

socket.on('session:init', (data) => {
  console.log('---socket--- session init', data)

  sessionID = data.id

  socket.emit('card:init', {
    id: data.id
  })

  // this.setState(
  //   state => ({
  //     chat: [...state.chat, ...msg.reverse()]
  //   }),
  //   this.scrollToBottom
  // );
})

socket.on('card:restore', (data) => {
  console.log('---socket--- card restore', data)
})

socket.on('card:push', (data) => {
  console.log('---socket--- card push', data)
})

// Load the last 10 messages in the window.
// socket.on('card:init', (load) => {
//   console.log('---socket--- get init', load)
//   // this.setState(
//   //   state => ({
//   //     chat: [...state.chat, ...msg.reverse()]
//   //   }),
//   //   this.scrollToBottom
//   // );
// })

export const state = () => ({
  // sessionID: null
})

export const actions = {
  emit({ state }, payload) {
    console.log('---- card emit from action')
    debouncedEmit(socket, payload)
  },

  card({ state }, data) {
    console.log('---- card mutation from action')
    socket.emit('card:mutation', {
      session: sessionID,
      ...data
    })
  }

  // disconnect({ state }) {
  //   socket.disconnect()
  // }
}

export default { sessionID }

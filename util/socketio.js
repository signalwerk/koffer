// https://socket.io/docs/rooms-and-namespaces/ >>> namespaces
// https://vuex.vuejs.org/guide/plugins.html

import io from 'socket.io-client'
import { throttle } from 'lodash'

// // const socket = io('https://signers-koffer.herokuapp.com')
const socket = io('http://localhost:5000')

const throttledEmit = throttle((event, payload) => {
  socket.emit(event, payload)
}, 100)

export default function liveSyncPlugin(conf) {
  // eslint-disable-next-line
  let sessionID = null
  const modules = conf.modules || []
  const actions = conf.actions || {}

  return (store) => {
    // called when the store is initialized
    socket.on('session:init', (data) => {
      sessionID = data.session

      socket.emit('cards:init', {
        session: sessionID
      })
    })

    socket.on('cards:restore', (data) => {
      if (actions && actions.cards && actions.cards.restore) {
        const newStore = {}
        data.forEach((item) => {
          newStore[item.uuid] = item
        })
        store.commit(actions.cards.restore, newStore)
      }
    })

    socket.on('cards:push', (data) => {
      if (actions && actions.cards && actions.cards.update) {
        store.commit(actions.cards.update, data)
      }
    })

    // The mutation comes in the format of `{ type, payload }`.
    store.subscribe((_mutation) => {
      // figure out what module and what mutation
      const [module, mutation] = _mutation.type.split('/')

      // do we have to sync this module?
      if (modules.includes(module)) {
        // do we have to sync this mutation?
        if (!mutation.startsWith('nosync_')) {
          throttledEmit(`${module}:mutation`, {
            session: sessionID,
            ..._mutation.payload
          })
        }
      }
    })
  }
}

// this is a nuxt-store plugin to sync state to
// https://socket.io/docs/rooms-and-namespaces/ >>> namespaces
// https://vuex.vuejs.org/guide/plugins.html

import io from 'socket.io-client'
import { throttle } from 'lodash'

// // const socket = io('https://signers-koffer.herokuapp.com')
export const socket = io(process.env.SOCKETIO_URL)

const throttledEmit = throttle((event, payload) => {
  socket.emit(event, payload)
}, 100)

const generalRestore = ({ name, actions, data, store }) => {
  if (actions && actions[name] && actions[name].restore) {
    const newStore = {}
    data.forEach((item) => {
      newStore[item.uuid] = item
    })
    store.commit(actions[name].restore, newStore)
  }
}
const generalPush = ({ name, actions, data, store }) => {
  if (actions && actions[name] && actions[name].update) {
    store.commit(actions[name].update, data)
  }
}

export default function liveSyncPlugin(conf) {
  // eslint-disable-next-line
  // let sessionID = null
  const modules = conf.modules || []
  const actions = conf.actions || {}

  return (store) => {
    // called when the store is initialized
    socket.on('session:boot', (data) => {
      // sessionID = data.session
      socket.emit('cards:init')
      socket.emit('textareas:init')
      socket.emit('shapes:init')
      socket.emit('sessions:init')
      socket.emit('textareas:init')
      socket.emit('shapes:init')
    })

    socket.on('cards:restore', (data) => {
      // eslint-disable-next-line no-console
      console.log('--->>> card restore', data)

      generalRestore({ name: 'cards', actions, data, store })
    })

    socket.on('textareas:restore', (data) => {
      // eslint-disable-next-line no-console
      console.log('--->>> textarea restore', data)

      generalRestore({ name: 'textareas', actions, data, store })
    })

    socket.on('shapes:restore', (data) => {
      // eslint-disable-next-line no-console
      console.log('--->>> shape restore', data)

      generalRestore({ name: 'shapes', actions, data, store })
    })

    socket.on('sessions:restore', (data) => {
      // eslint-disable-next-line no-console
      console.log('got sessions:restore', data)

      generalRestore({ name: 'sessions', actions, data, store })
    })

    socket.on('cards:push', (data) => {
      generalPush({ name: 'cards', actions, data, store })
    })

    socket.on('textareas:push', (data) => {
      generalPush({ name: 'textareas', actions, data, store })
    })

    socket.on('shapes:push', (data) => {
      generalPush({ name: 'shapes', actions, data, store })
    })

    socket.on('sessions:push', (data) => {
      generalPush({ name: 'sessions', actions, data, store })
    })

    socket.on('stopwatch:start', () => {
      generalPush({
        name: 'stopwatch',
        actions,
        data: {
          isRunning: true
        },
        store
      })
    })

    socket.on('stopwatch:stop', () => {
      generalPush({
        name: 'stopwatch',
        actions,
        data: {
          isRunning: false
        },
        store
      })
    })

    // The mutation comes in the format of `{ type, payload }`.
    store.subscribe((_mutation) => {
      // figure out what module and what mutation
      const [module, mutation] = _mutation.type.split('/')

      // do we have to sync this module?
      if (modules.includes(module)) {
        // do we have to sync this mutation?
        if (!mutation.startsWith('nosync_')) {
          // eslint-disable-next-line no-console
          console.log(`--- mutation ${module}`, _mutation.payload)
          throttledEmit(`${module}:mutation`, {
            // session: sessionID,
            ..._mutation.payload
          })
        }
      }
    })
  }
}

// https://socket.io/docs/rooms-and-namespaces/ >>> namespaces
// https://vuex.vuejs.org/guide/plugins.html

import io from 'socket.io-client'
const socket = io('http://localhost:5000')

export default function liveSyncPlugin(conf) {
  // eslint-disable-next-line
  let sessionID = null
  const modules = conf.modules || []
  const actions = conf.actions || {}

  return (store) => {
    // called when the store is initialized
    socket.on('session:init', (data) => {
      console.log('---socket--- session init', data)

      sessionID = data.session

      socket.emit('card:init', {
        session: sessionID
      })
    })

    socket.on('card:restore', (data) => {
      console.log('---socket--- card restore', data)

      if (actions && actions.cards && actions.cards.restore) {
        data.forEach((item, i) => {
          store.commit(actions.cards.restore, item)
        })
      }
    })

    // The mutation comes in the format of `{ type, payload }`.
    store.subscribe((_mutation) => {
      // figure out what module and what mutation
      const [module, mutation] = _mutation.type.split('/')

      // do we have to save this module?
      if (modules.includes(module)) {
        console.log('--- yes module', module, mutation)

        // build singular of module
        // cards → card
        const singular = module.slice(0, -1)

        console.log('--- mutate emit', `${singular}:mutation`)

        socket.emit(`${singular}:mutation`, {
          session: sessionID,
          ..._mutation.payload
        })
      }
    })
  }
}

// export default (store) => {
//   console.error('....sync startup 3')
//   store.subscribe((mutation, state) => {
//     console.log('------ store sub', mutation.type)
//     if (mutation.type === 'setError') {
//       // Alert someone
//       alert('Error occurred!')
//     }
//   })
// }

// export const liveSyncPlugin = (store) => {
//   console.error('... sync plugin 1')
//
//   store.subscribe((mutation) => {
//     console.log('------ store sub', mutation.type)
//     // if (mutation.type === 'UPDATE_DATA') {
//     //   socket.emit('update', mutation.payload)
//     // }
//   })
//
//   // called when the store is initialized
//   // socket.on('data', (data) => {
//   //   store.commit('receiveData', data)
//   // })
//   //
//   // store.subscribe((mutation, state) => {
//   //   // called after every mutation.
//   //   // The mutation comes in the format of `{ type, payload }`.
//   //   if (mutation.type === 'UPDATE_DATA') {
//   //     socket.emit('update', mutation.payload)
//   //   }
//   // })
// }

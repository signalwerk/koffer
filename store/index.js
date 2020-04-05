import liveSyncPlugin from '../util/socketio.js'
// import VuexPersistence from 'vuex-persist'
// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })

const sync = liveSyncPlugin({
  modules: ['cards'], // only sync this modules

  // when we get a restore or update from the server
  actions: {
    cards: {
      restore: 'cards/nosync_restore',
      update: 'cards/nosync_updateCard'
    }
  }
})

export const plugins = [sync]

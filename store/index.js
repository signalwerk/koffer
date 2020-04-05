import VuexPersistence from 'vuex-persist'
import liveSyncPlugin from '../util/socketio.js'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['me']
})

const sync = liveSyncPlugin({
  modules: ['cards', 'sessions'], // only sync this modules

  // when we get a restore or update from the server
  actions: {
    cards: {
      restore: 'cards/nosync_restore',
      update: 'cards/nosync_updateCard'
    },
    sessions: {
      restore: 'sessions/nosync_restore',
      update: 'sessions/nosync_updateSession'
    }
  }
})

export const plugins = [sync, vuexLocal.plugin]

import VuexPersistence from 'vuex-persist'
import liveSyncPlugin from '../util/socketio.js'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['me']
})

const sync = liveSyncPlugin({
  modules: ['cards', 'shapes', 'textareas', 'sessions', 'stopwatch'], // only sync these modules

  // when we get a restore or update from the server
  actions: {
    cards: {
      restore: 'cards/nosync_restore',
      update: 'cards/nosync_updateCard'
    },
    textareas: {
      restore: 'textareas/nosync_restore',
      update: 'textareas/nosync_updateTextarea'
    },
    shapes: {
      restore: 'shapes/nosync_restore',
      update: 'shapes/nosync_updateShape'
    },
    sessions: {
      restore: 'sessions/nosync_restore',
      update: 'sessions/nosync_updateSession'
    },
    stopwatch: {
      update: 'stopwatch/nosync_toggle'
    }
  }
})

export const plugins = [sync, vuexLocal.plugin]

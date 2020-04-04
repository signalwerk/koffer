import liveSyncPlugin from '../util/socketio.js'

const sync = liveSyncPlugin({
  modules: ['cards'], // only sync this modules

  // restores save
  actions: {
    cards: {
      restore: 'cards/addCard',
      update: 'updateCard'
    }
    // add: ['updateCardPosition']
  }
})

// const sync = liveSyncPlugin()

export const plugins = [sync]

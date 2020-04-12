const mongoose = require('mongoose')

const Card = require('./card')
const Session = require('./session')
const Textarea = require('./textarea')
const Shape = require('./shape')
const Timer = require('./timer')

const definitions = {
  Card,
  Session,
  Textarea,
  Shape,
  Timer
}

const models = {}
const find = { init: {} }
const select = { session: 0 }

// generate mongoose schema & model
for (const key in definitions) {
  const schema = new mongoose.Schema(
    {
      createdAt: Number,
      updatedAt: Number,
      ...definitions[key].schema
    },
    {
      // timestamps: true
      // Make Mongoose use Unix time (seconds since Jan 1, 1970)
      timestamps: { currentTime: () => Math.floor(Date.now()) }
    }
  )
  models[key] = mongoose.model(key, schema)
  find[key] = {}
  find[key].init = definitions[key].find.init
  select[key] = definitions[key].select
}

module.exports = {
  Models: models,
  Definitions: definitions,
  FindFilters: find,
  FindSelect: select
}

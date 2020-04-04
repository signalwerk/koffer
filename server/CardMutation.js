const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema(
  {
    id: String,
    version: Number,
    text: String,
    x: Number,
    y: Number
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('CardMutation', cardSchema)

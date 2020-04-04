const mongoose = require('mongoose')

const card = new mongoose.Schema(
  {
    uuid: String,
    session: String,
    text: String,
    x: Number,
    y: Number
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Card', card)

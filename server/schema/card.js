const mongoose = require('mongoose')

const card = new mongoose.Schema(
  {
    uuid: String,
    deleted: Boolean,
    session: String,
    text: String,
    color: Number,
    x: Number,
    y: Number
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Card', card)

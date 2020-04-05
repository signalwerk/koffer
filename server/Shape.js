const mongoose = require('mongoose')

const shape = new mongoose.Schema(
  {
    uuid: String,
    deleted: Boolean,
    session: String,
    shape: String,
    x: Number,
    y: Number
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Shape', shape)

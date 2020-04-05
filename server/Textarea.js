const mongoose = require('mongoose')

const textarea = new mongoose.Schema(
  {
    uuid: String,
    deleted: Boolean,
    session: String,
    text: String,
    x: Number,
    y: Number
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Textarea', textarea)

const mongoose = require('mongoose')

const session = new mongoose.Schema(
  {
    uuid: String,
    deleted: Boolean,
    admin: String,
    name: String
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Session', session)

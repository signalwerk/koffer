const schema = {
  uuid: String,
  deleted: Boolean,
  session: String,
  timestamp: { type: Date, default: Date.now },
  value: Number,
  // ---------------------
  // 0 = stop
  // 1 = count up
  // 2 = count down
  state: Number
  // ---------------------
}
const find = {
  init: (session) => ({
    deleted: false,
    session
  })
}
const select = { session: 0 }
module.exports = { schema, find, select }

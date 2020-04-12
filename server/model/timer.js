const schema = {
  uuid: String,
  deleted: Boolean,
  session: String,
  value: Number,
  // ---------------------
  // 0 = stop
  // 1 = count up
  // 2 = count down
  mode: Number
  // ---------------------
}
const find = {
  init: (session) => ({
    session
  })
}
const select = { session: 0 }
// const select = { session: 0 }
module.exports = { schema, find, select }

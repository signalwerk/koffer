const schema = {
  uuid: String,
  deleted: Boolean,
  session: String,
  text: String,
  color: Number,
  x: Number,
  y: Number
}

const find = {
  init: (session) => ({
    deleted: false,
    session
  })
}
const select = { updatedAt: 0, session: 0 }
module.exports = { schema, find, select }

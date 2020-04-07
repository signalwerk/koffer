const schema = {
  uuid: String,
  deleted: Boolean,
  admin: String,
  name: String
}

const find = {
  init: (session) => ({
    uuid: session
  })
}
const select = { }
module.exports = { schema, find, select }

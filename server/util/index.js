const getSession = (socket) => {
  let session = Object.keys(socket.rooms).find((item) =>
    item.startsWith('user_')
  )
  session = (session || 'nosession').replace(/^user_/, '')
  return session
}

module.exports = {
  getSession
}

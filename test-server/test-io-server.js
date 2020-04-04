// test-io-server.js

// Create the socket server
const PORT = 3000
const socket = require('socket.io')(PORT)
socket.on('connection', function(client) {
  // Listen for test and disconnect events
  client.on('update', onUpdate)
  client.on('disconnect', onDisconnect)

  // Handle a test event from the client
  function onUpdate(data) {
    // eslint-disable-next-line no-console
    console.log('Received: "' + data + '" from client: ' + client.id)
    client.emit('test', 'Cheers, ' + client.id)
  }

  // Handle a disconnection from the client
  function onDisconnect() {
    console.log('Received: disconnect event from client: ' + client.id)
    client.removeListener('update', onUpdate)
    client.removeListener('disconnect', onDisconnect)
  }
})

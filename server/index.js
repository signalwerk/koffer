/* eslint-disable */

const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(http)

/* eslint-enable */

const mongoose = require('mongoose')
const CardMutation = require('./CardMutation')

require('dotenv').config()

const uri = process.env.MONGODB_URI
const port = process.env.PORT || 5000

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

// app.use(express.static(path.join(__dirname, '..', 'client', 'build')))

io.on('connection', (socket) => {
  const sessionID = 'dev-session-id'

  socket.emit('session:init', { id: sessionID })

  // // Get the last 10 mutations from the database.
  // CardMutation.find()
  //   .sort({ createdAt: -1 })
  //   .limit(1000)
  //   .exec((err, mutations) => {
  //     if (err) return console.error(err)
  //
  //     // Send the last mutations to the user.
  //     socket.emit('card:init', mutations)
  //   })

  socket.on('card:init', (data) => {
    console.log('---card init A')
    CardMutation.find()
      .sort({ createdAt: -1 })
      .limit(1000)
      .exec((err, mutations) => {
        if (err) return console.error(err)
        console.log('---card init')
        // Send the last mutations to the user.
        socket.emit('card:restore', mutations)
      })
  })

  // Listen to connected users for a new mutations.
  socket.on('card:mutation', (data) => {
    // Create new mutation
    const message = new CardMutation({
      ...data
    })

    // Save the message to the database.
    message.save((err) => {
      if (err) return console.error(err)
    })

    // Notify all other users about a new message.
    socket.broadcast.emit('card:push', data)
  })
})

http.listen(port, () => {
  console.log('listening on *:' + port)
})

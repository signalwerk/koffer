/* eslint-disable */

const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(http)

/* eslint-enable */

const mongoose = require('mongoose')
const Card = require('./Card')

require('dotenv').config()

const uri = process.env.MONGODB_URI
const port = process.env.PORT || 5000

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

io.on('connection', (socket) => {
  const sessionID = 'dev-session-id'

  socket.emit('session:init', { session: sessionID })

  socket.on('cards:init', (data) => {
    Card.find({ deleted: false })
      .select({ session: 0, _id: 0, updatedAt: 0, createdAt: 0, __v: 0 })
      .sort({ createdAt: -1 })
      .limit(100000)
      .exec((err, mutations) => {
        if (err) return console.error(err)
        // Send the last mutations to the user.
        socket.emit('cards:restore', mutations)
      })
  })

  // Listen to connected users for a new mutations.
  socket.on('cards:mutation', (data) => {
    const { uuid, session } = data
    const query = {
      uuid,
      session
    }

    const update = data
    const options = { upsert: true, new: true, setDefaultsOnInsert: true }

    // Find the document
    Card.findOneAndUpdate(query, update, options, (error, result) => {
      if (error) {
        console.error('error', error)
      }
      // do something with the document
      // console.log('findOneAndUpdate', result)
    })

    // Notify all other users about a new card.
    socket.broadcast.emit('cards:push', data)
  })
})

http.listen(port, () => {
  console.log('listening on *:' + port)
})

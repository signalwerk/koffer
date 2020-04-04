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

// app.use(express.static(path.join(__dirname, '..', 'client', 'build')))

io.on('connection', (socket) => {
  const sessionID = 'dev-session-id'

  socket.emit('session:init', { session: sessionID })

  // // Get the last 10 mutations from the database.
  // Card.find()
  //   .sort({ createdAt: -1 })
  //   .limit(1000)
  //   .exec((err, mutations) => {
  //     if (err) return console.error(err)
  //
  //     // Send the last mutations to the user.
  //     socket.emit('card:init', mutations)
  //   })

  socket.on('card:init', (data) => {
    // const query = {
    //   session: data.session
    // }

    Card.find()
      .select({ session: 0, _id: 0, updatedAt: 0, createdAt: 0, __v: 0 })
      .sort({ createdAt: -1 })
      .limit(100000)
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
    // const card = new Card({
    //   ...data
    // })
    //
    // // Save the card to the database.
    // card.save((err) => {
    //   if (err) return console.error(err)
    // })
    const { id, session, ...payload } = data
    const query = {
      uuid: id,
      session
    }

    const update = {
      uuid: id,
      session,
      ...data
    }

    console.log('card:mutation', { query, update })

    const options = { upsert: true, new: true, setDefaultsOnInsert: true }

    // Find the document
    Card.findOneAndUpdate(query, update, options, (error, result) => {
      console.log('findOneAndUpdate', result)
      if (error) {
        console.log('error', error)
        return
      }
      // do something with the document
      console.log('findOneAndUpdate', result)
    })

    // Notify all other users about a new card.
    socket.broadcast.emit('card:push', { id, ...payload })
  })
})

http.listen(port, () => {
  console.log('listening on *:' + port)
})

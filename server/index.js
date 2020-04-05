/* eslint-disable */

const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(http)

/* eslint-enable */

const mongoose = require('mongoose')
const Card = require('./Card')
const Session = require('./Session')

require('dotenv').config()

const uri = process.env.MONGODB_URI
const port = process.env.PORT || 5000

const getSession = (socket) => {
  let session = Object.keys(socket.rooms).find((item) =>
    item.startsWith('user_')
  )
  session = (session || 'nosession').replace(/^user_/, '')
  return session
}

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

io.on('connection', (socket) => {
  // const sessionID = 'dev-session-id'

  // Object.keys(socket.rooms).filter(item => item!=socket.id);

  // socket.rooms

  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('session:join', (session) => {
    console.log('join session', session)
    socket.join(`user_${session}`)
    // io.sockets.in(session).emit('session:init')

    socket.emit('session:boot')
  })

  // socket.emit('session:init', { session: sessionID })
  // socket.emit('session:init')

  // initial state cards
  socket.on('cards:init', (data) => {
    console.log('--->>> card init', socket.rooms)

    const session = getSession(socket)

    console.log('--->>> card init session', session)

    Card.find({ deleted: false, session })
      .select({ session: 0, _id: 0, updatedAt: 0, createdAt: 0, __v: 0 })
      .sort({ createdAt: -1 })
      .limit(100000)
      .exec((err, data) => {
        if (err) return console.error(err)
        // Send the last data to the user.
        console.log('--->>> card restore', session, data)
        io.sockets.in(`user_${session}`).emit('cards:restore', data)

        // socket.emit('cards:restore', data)
      })
  })

  // initial state session
  socket.on('sessions:init', (data) => {
    console.log('--->>> sessions init', socket.rooms)

    const session = getSession(socket)

    Session.find({ uuid: session })
      .select({ _id: 0, updatedAt: 0, createdAt: 0, __v: 0 })
      .sort({ createdAt: -1 })
      .limit(1)
      .exec((err, data) => {
        if (err) return console.error(err)
        console.log('--->>> sessions init data', data)
        // Send the last data to the user.
        io.sockets.in(`user_${session}`).emit('sessions:restore', data)
        // socket.emit('sessions:restore', data)
      })
  })

  // Listen to connected users for a new mutations.
  socket.on('cards:mutation', (data) => {
    console.log('--- mutation card', data)
    const session = getSession(socket)

    const query = {
      uuid: data.uuid
    }

    const update = { ...data, session }
    console.log('--- mutation update', update)

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
    // socket.emit('cards:push', data)
    io.sockets.in(`user_${session}`).emit('cards:push', data)

    // socket.broadcast.emit('cards:push', data)
  })

  // Listen to connected users for a new mutations.
  socket.on('sessions:mutation', (data) => {
    console.log('--- mutation sessions', data)
    const session = getSession(socket)

    const query = {
      uuid: data.uuid
    }

    const update = { ...data, session }
    const options = { upsert: true, new: true, setDefaultsOnInsert: true }

    // Find the document
    Session.findOneAndUpdate(query, update, options, (error, result) => {
      if (error) {
        console.error('error', error)
      }
      // do something with the document
      // console.log('findOneAndUpdate', result)
    })

    // Notify all other users about a new card.
    io.sockets.in(`user_${session}`).emit('sessions:push', data)
    // socket.emit('sessions:push', data)
    // socket.broadcast.emit('cards:push', data)
  })
})

http.listen(port, () => {
  console.log('listening on *:' + port)
})

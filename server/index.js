/* eslint-disable */

const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(http)

/* eslint-enable */

const mongoose = require('mongoose')

// models
const Card = require('./schema/card')
const Session = require('./schema/session')
const Textarea = require('./schema/textarea')
const Shape = require('./schema/shape')

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

  // initial state textareas
  socket.on('textareas:init', (data) => {
    console.log('--->>> textarea init', socket.rooms)

    const session = getSession(socket)

    console.log('--->>> textarea init session', session)

    Textarea.find({ deleted: false, session })
      .select({ session: 0, _id: 0, updatedAt: 0, createdAt: 0, __v: 0 })
      .sort({ createdAt: -1 })
      .limit(100000)
      .exec((err, data) => {
        if (err) return console.error(err)
        // Send the last data to the user.
        console.log('--->>> textarea restore', session, data)
        io.sockets.in(`user_${session}`).emit('textareas:restore', data)

        // socket.emit('textareas:restore', data)
      })
  })

  // initial state shapes
  socket.on('shapes:init', (data) => {
    console.log('--->>> shape init', socket.rooms)

    const session = getSession(socket)

    console.log('--->>> shape init session', session)

    Shape.find({ deleted: false, session })
      .select({ session: 0, _id: 0, updatedAt: 0, createdAt: 0, __v: 0 })
      .sort({ createdAt: -1 })
      .limit(100000)
      .exec((err, data) => {
        if (err) return console.error(err)
        // Send the last data to the user.
        console.log('--->>> shape restore', session, data)
        io.sockets.in(`user_${session}`).emit('shapes:restore', data)

        // socket.emit('shapes:restore', data)
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
  socket.on('shapes:mutation', (data) => {
    console.log('--- mutation shape', data)
    const session = getSession(socket)

    const query = {
      uuid: data.uuid
    }

    const update = { ...data, session }
    console.log('--- mutation update', update)

    const options = { upsert: true, new: true, setDefaultsOnInsert: true }

    // Find the document
    Shape.findOneAndUpdate(query, update, options, (error, result) => {
      if (error) {
        console.error('error', error)
      }
      // do something with the document
      // console.log('findOneAndUpdate', result)
    })

    // Notify all other users about a new shape.
    // socket.emit('shapes:push', data)
    io.sockets.in(`user_${session}`).emit('shapes:push', data)

    // socket.broadcast.emit('shapes:push', data)
  })

  // Listen to connected users for a new mutations.
  socket.on('textareas:mutation', (data) => {
    console.log('--- mutation textarea', data)
    const session = getSession(socket)

    const query = {
      uuid: data.uuid
    }

    const update = { ...data, session }
    console.log('--- mutation update', update)

    const options = { upsert: true, new: true, setDefaultsOnInsert: true }

    // Find the document
    Textarea.findOneAndUpdate(query, update, options, (error, result) => {
      if (error) {
        console.error('error', error)
      }
      // do something with the document
      // console.log('findOneAndUpdate', result)
    })

    // Notify all other users about a new textarea.
    // socket.emit('textareas:push', data)
    io.sockets.in(`user_${session}`).emit('textareas:push', data)

    // socket.broadcast.emit('textareas:push', data)
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

  // Emit the stopwatch start
  socket.on('stopwatch:mutation', (data) => {
    const session = getSession(socket)

    if (data.isRunning) {
      // Notify all other users about the stopwatch start
      io.sockets.in(`user_${session}`).emit('stopwatch:start')
    } else {
      // Notify all other users about the stopwatch stop
      io.sockets.in(`user_${session}`).emit('stopwatch:stop')
    }
  })

  // Emit the stopwatch reset
  socket.on('stopwatch:reset', () => {
    const session = getSession(socket)

    // Notify all other users about the stopwatch reset
    io.sockets.in(`user_${session}`).emit('stopwatch:reset')
  })
})

http.listen(port, () => {
  console.log('listening on *:' + port)
})

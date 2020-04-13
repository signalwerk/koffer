const mongoose = require('mongoose')
const express = require('express')
/* eslint-disable */

const app = express()
const http = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(http)
const { getSession } = require('./util')

/* eslint-enable */

// env
require('dotenv').config()
const uri = process.env.MONGODB_URI
const port = process.env.PORT || 5000

// get Models
const { Models, FindFilters, FindSelect } = require('./model')

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

const addMeta = (data) => {
  const now = Date.now()

  return data.map((item) => {
    return {
      ...item.toObject({ getters: true }),
      __meta: {
        sentAt: now
      }
    }
  })
}

// serve statoc files
// app.use(express.static(path.join(__dirname, '..', 'client', 'build')))

io.on('connection', (socket) => {
  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('session:join', (session) => {
    console.log('join session', session)
    socket.join(`user_${session}`)
    socket.emit('session:boot')
  })

  // setup all the regular models
  for (const key in Models) {
    let name = `${key.toLowerCase()}s`

    // ----------------------------------
    // initial state
    // ----------------------------------
    // we listen on all models if we need to restore something
    socket.on(`${name}:init`, () => {
      console.log(`trigger ${name}:init`)
      const session = getSession(socket)

      Models[key]
        .find(FindFilters[key].init(session))
        .select({
          _id: 0,
          createdAt: 0,
          __v: 0,
          ...FindSelect[key]
        })
        .sort({ createdAt: -1 })
        .limit(100000)
        .exec((err, data) => {
          if (err) return console.error(err)
          // Send the last data to the user.

          const newData = addMeta(data)

          console.log(`${name}:restore`, session, newData)
          io.sockets.in(`user_${session}`).emit(`${name}:restore`, newData)
        })
    })
    // ----------------------------------
    // mutate state
    // ----------------------------------
    // Listen for a new mutations
    socket.on(`${name}:mutation`, (data) => {
      console.log(`trigger ${name}:mutation`, data)
      const session = getSession(socket)

      const query = {
        uuid: data.uuid
      }

      const update = { ...data, session }
      const options = { upsert: true, new: true, setDefaultsOnInsert: true }

      // Find the document
      Models[key].findOneAndUpdate(query, update, options, (error, result) => {
        if (error) {
          console.error('error', error)
        }
        // do something with the document
        // console.log('findOneAndUpdate', result)
        // Notify all other users about a new state.
        console.log(`emit ${name}:push`)
        io.sockets
          .in(`user_${session}`)
          .emit(`${name}:push`, addMeta([result])[0])
      })
    })
  }
})

http.listen(port, () => {
  console.log('listening on port: ' + port)
  console.log('mongo-db: ' + uri)
})

require('dotenv').config()
const express = require('express');
const { join } = require('path');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { PORT } = process.env

const rooms = {}

http.listen(PORT, ()=> {
    console.log(`🚀 Server running on ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Hello')
})

io.on('connection', (socket) => {
  console.log('A user has connected');
  socket.name = "Jeff"
  socket.on('join', (roomId) => {
      if(rooms[roomId] == null) {
        rooms[roomId] = createRoom(roomId)
      }
      joinRoom(roomId, socket)
  })

  socket.on('changeName', (roomId, name) => {
      socket.name = name
  })

  socket.on('pool', (roomId) => {
      io.emit('state', rooms[roomId])
  })
});

setInterval(() => {
    //sort that out
    for([id, room] of Object.entries(rooms)) {
        // console.log('pool', id)
        for([id, {socket}] of Object.entries(room.members)) {
            socket.emit('pool', {
                id: room.id,
                deck: room.deck,
                members: Object.entries(room.members)
                    .map(([_, socket]) => socket.name)
            })
        }
        
    }
}, 1000)


// RoomManager logic and stuff

function joinRoom(roomId, socket) {
    console.log(`${socket.id} is joining ${roomId}`)
    socket.join(roomId, () => {
        console.log(`${socket.id} has joined ${roomId}`)
      })
    const room = rooms[roomId]
    const {id} = socket
    room.members[id] = {
        socket,
    }

}

function findRoomIdByUser(socket) {
    return socket.rooms[0];
}

function createRoom(id) {
    console.log(`Creating room ${id}`)
    return {
        id,
        members: {},
        deck: [1,2,3,5,8,13,21,52]
    }
}


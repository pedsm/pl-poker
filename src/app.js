require('dotenv').config()
const express = require('express');
const { join } = require('path');
const path = require('path')
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { PORT } = process.env

const rooms = {}

http.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

app.use(express.static('dist'))

app.get('/health', (req, res) => {
    res.send({
        clientCount: Object.keys(io.sockets.sockets).length, // this is probably wrong if it is counting rooms as sockets
        roomCount: Object.keys(rooms).length
    })
})

function serveVue(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
}

app.get('/', serveVue)
app.get('/r/*', serveVue)

io.on('connection', (socket) => {
    console.log('A user has connected');
    socket.member = {
        name: "Jeff",
        card: null,
        hidden: true
    }
    socket.on('join', (roomId) => {
        if (rooms[roomId] == null) {
            rooms[roomId] = createRoom(roomId)
        }
        joinRoom(roomId, socket)
    })

    socket.on('changeName', (name) => {
        socket.member.name = name
    })

    socket.on('pickCard', (index) => {
        socket.member.hidden = true;
        socket.member.card = index;
        poolRoom(getRoomForSocket(socket))
    })

    socket.on('flipCard', () => {
        socket.member.hidden = !socket.member.hidden;
        poolRoom(getRoomForSocket(socket))
    })


    socket.on('pool', (roomId) => {
        io.emit('state', rooms[roomId])
    })

    socket.on('disconnect', (reason) => {
        console.log(`${socket.id} has disconected, ${reason}`)
        removeFromRoom(socket)
    })
});

setInterval(() => {
    //sort that out
    for ([id, room] of Object.entries(rooms)) {
        poolRoom(room)
    }
}, 1000)

function poolRoom(room) {
    const memberSockets = Object.entries(room.members)
    const members = memberSockets
        .map(([id, mSocket]) => ({
            id,
            ...mSocket.member
        }))
    for ([_, socket] of memberSockets) {
        socket.emit('pool', {
            id: room.id,
            deck: room.deck,
            members,
        })
    }
}

function getRoomForSocket(socket) {
    return rooms[socket.roomId]
}

// RoomManager logic and stuff

function joinRoom(roomId, socket) {
    console.log(`${socket.id} is joining ${roomId}`)
    socket.join(roomId, () => {
        socket.roomId = roomId
        console.log(`${socket.id} has joined ${roomId}`)
    })
    const room = rooms[roomId]
    const { id } = socket
    room.members[id] = socket
}

function removeFromRoom(socket) {
    const room = rooms[socket.roomId]
    if (room?.members) {
        delete room.members[socket.id]
    }
}


function createRoom(id) {
    console.log(`Creating room ${id}`)
    return {
        id,
        members: {},
        deck: [1, 2, 3, 5, 8, 13, 21, 52]
    }
}


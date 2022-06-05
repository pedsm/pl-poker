require('dotenv').config()
import express, {Request, Response} from 'express'
import path from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { 
  rooms, 
  ISocket ,
  createRoom,
  joinRoom,
  removeFromRoom,
  IRoom
} from './roomManager'

const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: '*',
    credentials: false
  },
  allowEIO3: true
})

const { PORT } = process.env



http.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

app.use(express.static('dist'))

app.get('/health', (_, res) => {
    res.send({
        clientCount: Object.keys(io.sockets.sockets).length, // this is probably wrong if it is counting rooms as sockets
        roomCount: Object.keys(rooms).length
    })
})

function serveVue(req:Request, res:Response) {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
}

app.get('/', serveVue)
app.get('/r/*', serveVue)

io.on('connection', (socket:ISocket) => {
    console.log('A user has connected');
    socket.member = {
        name: "",
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
        if(name == '') {
            socket.member.hidden = true;
            socket.member.card = null;
        }
        poolRoom(getRoomForSocket(socket))
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

    socket.on('flipAll', () => {
        const room = getRoomForSocket(socket)
        for(const [_, {member}] of Object.entries(room.members)) {
          member.hidden = false
        }
        poolRoom(getRoomForSocket(socket))
    })

    socket.on('clearTable', () => {
      const room = getRoomForSocket(socket) 
      for(const [_, {member}] of Object.entries(room.members)) {
        member.card = null
      }
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
    for (const [_, room] of Object.entries(rooms)) {
        // poolRoom(room)
    }
}, 1000)

function poolRoom(room:IRoom) {
    if(room?.members == null) return

    const memberSockets = Object.entries(room.members)
    const members = memberSockets
        .map(([id, mSocket]) => ({
            id,
            ...mSocket.member
        }))
    for (const [_, socket] of memberSockets) {
        socket.emit('pool', {
            id: room.id,
            deck: room.deck,
            members,
        })
    }
}

function getRoomForSocket(socket:ISocket) {
    return rooms[socket.roomId]
}

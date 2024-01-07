// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import express, {Request, Response} from 'express'
import path from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'
import logger from './logger'

import {
  rooms, 
  ISocket ,
  IRoom,
  RoomManager,
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
    logger.info(`Server running on ${PORT}`)
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

io.on('connection', (_socket) => {
    const socket = _socket as ISocket
    logger.info('A user has connected');

    socket.member = {
        name: "",
        card: null,
        hidden: true
    }

    const roomManager = new RoomManager(socket)

    socket.on('join', (roomId:string) => {
        roomManager.joinRoom(roomId)
        poolRoom(getRoomForSocket(socket))
    })

    socket.on('changeName', (name:string) => {
        roomManager.changeName(name)
        poolRoom(getRoomForSocket(socket))
    })

    socket.on('pickCard', (index:number) => {
        socket.member.hidden = true;
        socket.member.card = index;
        poolRoom(getRoomForSocket(socket))
    })

    socket.on('flipCard', () => {
        socket.member.hidden = !socket.member.hidden;
        poolRoom(getRoomForSocket(socket))
    })

    socket.on('flipAll', () => {
        roomManager.flipAll()
        poolRoom(getRoomForSocket(socket))
    })

    socket.on('clearTable', () => {
      const room = getRoomForSocket(socket) 
      roomManager.clearTableOnRoom(room)
      poolRoom(getRoomForSocket(socket))
    })

    socket.on('changeDeck', (newDeckIndex: number) => {
        roomManager.changeDeck(newDeckIndex)
        poolRoom(roomManager.getRoom()) // Stuff like this is why I should move it to the roomManager
    })


    socket.on('pool', (roomId) => {
        io.emit('state', rooms[roomId])
    })

    socket.on('disconnect', (reason) => {
        roomManager.removeFromRoom(reason)
    })
});

setInterval(() => {
    //sort that out
    for (const [_, room] of Object.entries(rooms)) {
        poolRoom(room)
    }
}, 1000)

// TODO: move this to the roomManager/roomService thing
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
            ...room,
            members,
        })
    }
}

function getRoomForSocket(socket:ISocket) {
    return rooms[socket.roomId]
}

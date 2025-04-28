/* eslint-disable no-console */
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { Server } from 'socket.io'
import logger from './backend/logger'
import { ISocket, InMemoryRoomManager, rooms } from './backend/roomManager'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || '3000'
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port: +port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url!, true)
      // const { pathname, query } = parsedUrl

      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })

  const io = new Server(httpServer, {
    pingTimeout: 60000,
    connectTimeout: 2 * 60 * 1000,
  })

  io.on('connection', (_socket) => {
    const socket = _socket as ISocket
    logger.info('A user has connected');

    if(socket.recovered) {
      console.log('Recovered connection')
    } else {
      socket.member = {
        id: socket.id,
        name: "",
        card: null,
        hidden: true
      }
    }

    const roomManager = new InMemoryRoomManager(socket)

    socket.on('join', async (roomId: string) => {
      const room = await roomManager.joinRoom(roomId)
      roomManager.pollRoom(room)
    })

    socket.on('changeName', (name: string) => {
      roomManager.changeName(name)
      roomManager.pollRoom(roomManager.getRoomForSocket(socket))
    })

    socket.on('pickCard', (index: number) => {
      socket.member.hidden = true;
      socket.member.card = index;
      roomManager.pollRoom(roomManager.getRoomForSocket(socket))
    })

    socket.on('flipCard', () => {
      socket.member.hidden = !socket.member.hidden;
      roomManager.pollRoom(roomManager.getRoomForSocket(socket))
    })

    socket.on('flipAll', () => {
      roomManager.flipAll()
      roomManager.pollRoom(roomManager.getRoomForSocket(socket))
    })

    socket.on('clearTable', () => {
      const room = roomManager.getRoomForSocket(socket)
      roomManager.clearTableOnRoom(room)
      roomManager.pollRoom(roomManager.getRoomForSocket(socket))
    })

    socket.on('changeDeck', (newDeckIndex: number) => {
      roomManager.changeDeck(newDeckIndex)
      roomManager.pollRoom(roomManager.getRoom()) // Stuff like this is why I should move it to the roomManager
    })


    socket.on('poll', (roomId) => {
      io.emit('state', rooms[roomId])
    })

    socket.on('disconnect', (reason) => {
      roomManager.removeFromRoom(reason)
    })
  })

  httpServer
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })

})
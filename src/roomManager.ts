import { Socket } from 'socket.io'
import { IDeck, DECK_LIST } from './decks'

interface IMember {
  name: string,
  card: number | null,
  hidden: boolean
}

type MemberMap = {
  [key: string]: ISocket
}

export interface IRoom {
  id: string,
  members: MemberMap,
  availableDecks: IDeck[]
  selectedDeck: number
}

type RoomMap = {
  [key: string]: IRoom
}

export interface ISocket extends Socket {
  member: IMember
  roomId: string
}

export const rooms: RoomMap = {}

export async function joinRoom(roomId: string, socket: ISocket) {
  console.log(`${socket.id} is joining ${roomId}`)
  await socket.join(roomId)
  socket.roomId = roomId
  console.log(`${socket.id} has joined ${roomId}`)
  const room = rooms[roomId]
  room.members[socket.id] = socket
}

export function removeFromRoom(socket: ISocket) {
  const room = rooms[socket.roomId]
  if (room?.members) {
    delete room.members[socket.id]
  }
}

export function createRoom(id: string): IRoom {
  console.log(`Creating room ${id}`)
  return {
    id,
    members: {},
    availableDecks: DECK_LIST,
    selectedDeck: 0,
  }
}

export function clearTableOnRoom(room: IRoom) {
    for(const [_, {member}] of Object.entries(room.members)) {
      member.card = null
    }
}
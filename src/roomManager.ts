import {Socket} from 'socket.io'

interface IMember {
  name: string,
  card: number | null,
  hidden: boolean
}

type MemberMap = {
  [key:string]: ISocket
}

export interface IRoom {
  id:string,
  members: MemberMap,
  deck: number[]

}
type RoomMap = {
  [key:string]: IRoom
}

export interface ISocket extends Socket {
  member:IMember
  roomId: string
} 

export const rooms: RoomMap = {}

export async function joinRoom(roomId:string, socket:ISocket) {
    console.log(`${socket.id} is joining ${roomId}`)
    await socket.join(roomId)
    socket.roomId = roomId
    console.log(`${socket.id} has joined ${roomId}`)
    const room = rooms[roomId]
    room.members[socket.id] = socket
}

export function removeFromRoom(socket:ISocket) {
    const room = rooms[socket.roomId]
    if (room?.members) {
        delete room.members[socket.id]
    }
}


export function createRoom(id:string):IRoom {
    console.log(`Creating room ${id}`)
    return {
        id,
        members: {},
        deck: [1, 2, 3, 5, 8, 13, 21, 52]
    }
}
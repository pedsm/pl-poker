import { Logger } from 'pino'
import { Socket } from 'socket.io'
import { Deck, DECK_LIST } from './decks'
import logger from './logger'
import { TrackingService, MixpanelTrackingService, TrackingEvents } from './trackingService'

interface Member {
  id: string;
  name: string;
  card: number | null;
  hidden: boolean;
}

export interface ISocket extends Socket {
  member: Member;
  roomId: string;
}

type MemberMap = {
  [key: string]: ISocket;
}

export interface Room {
  id: string;
  members: MemberMap;
  availableDecks: Deck[];
  selectedDeck: number;
}

export interface FrontendRoom {
  id: string;
  members: Member[];
  availableDecks: Deck[];
  selectedDeck: number;
}

type RoomMap = {
  [key: string]: Room;
}


export const rooms: RoomMap = {}

interface RoomManager {
  joinRoom(roomId: string, socket: ISocket): Promise<Room>;
  removeFromRoom(reason: string): void;
  clearTableOnRoom(room: Room): void;
  changeDeck(newDeckIndex: number): void;
  flipAll(): void;
  pollRoom(room: Room): void;
  getRoomForSocket(socket: ISocket): Room;
}
export class InMemoryRoomManager implements RoomManager {
  trackingService: TrackingService
  socket: ISocket
  logger: Logger
  private readonly ip: string

  constructor(socket: ISocket) {
    this.trackingService = new MixpanelTrackingService()
    this.socket = socket
    this.ip = socket.handshake.headers['x-forwarded-for'] as string || socket.conn.remoteAddress.split(":")[3] as string
    this.logger = logger.child({
      id: socket.id
    })
  }

  getRoomForSocket(socket: ISocket): Room {
      return rooms[socket.roomId]
  }

  async joinRoom(roomId: string): Promise<Room> {
    const { id } = this.socket
    if (rooms[roomId] == null) {
        rooms[roomId] = this.createRoom(roomId)
    }

    await this.socket.join(roomId)
    this.socket.roomId = roomId

    this.logger.info(`${id} has joined ${roomId}`)
    this.trackingService.trackEvent(TrackingEvents.ROOM_JOINED, this.getPropsForTracking())

    const room = rooms[roomId]
    room.members[id] = this.socket
    return room
  }

  removeFromRoom(reason: string) {
    const { roomId, id } = this.socket
    const room = rooms[roomId]
    logger.info(`${id} has disconnected, ${reason}`)
    if (room?.members) {
      delete room.members[id]
      this.trackingService.trackEvent(TrackingEvents.ROOM_LEFT, {
        ...this.getPropsForTracking(),
        leavingReason: reason,
      })
    }
  }

  changeName(name: string) {
    this.socket.member.name = name
    if(name == '') {
        this.socket.member.hidden = true;
        this.socket.member.card = null;
    }
    const { id } = this.socket
    this.trackingService.trackEvent(TrackingEvents.CHANGE_NAME, this.getPropsForTracking())
    this.trackingService.setNameForUser(id, name)
  }

  private createRoom(id: string): Room {
    this.logger.info(`Creating room ${id}`)
    this.trackingService.trackEvent(TrackingEvents.ROOM_CREATED, this.getPropsForTracking())

    return {
      id,
      members: {},
      availableDecks: DECK_LIST,
      selectedDeck: 0,
    }
  }

  flipAll(): void {
    const room = this.getRoom()
    for(const [_, {member}] of Object.entries(room.members)) {
      member.hidden = false
    }
    this.trackingService.trackEvent(TrackingEvents.FLIP_ALL, this.getPropsForTracking())
  }

  changeDeck(newDeckIndex: number): void {
    const room = this.getRoom()
    this.clearTableOnRoom(room)
    room.selectedDeck = newDeckIndex

    const deckName = room.availableDecks[newDeckIndex].name
    this.notifyDeckChange(room, deckName)
    this.trackingService.trackEvent(TrackingEvents.CHANGE_DECK, {
      ...this.getPropsForTracking(),
      deckName,
    })
    this.trackingService.trackRoom(room.id, {
      deckName,
    })
  }

  clearTableOnRoom(room: Room) {
    this.trackingService.trackEvent(TrackingEvents.CLEAR_TABLE, this.getPropsForTracking())
    for (const [_, { member }] of Object.entries(room.members)) {
      member.card = null
    }
  }

  private notifyDeckChange(room: Room, deckName: string) {
    const members = Object.entries(this.getRoom().members)
    members.forEach(([_, socket]) => {
      socket.emit('notify', {
        msg: `Deck changed to ${deckName}`
      })
    })
  }

  private getPropsForTracking() {
    const { id, roomId } = this.socket
    return {
      distinct_id: id,
      roomId,
      ip: this.ip
    }
  }

  pollRoom(room: Room): void {
    if(room?.members == null) return

    const memberSockets = Object.entries(room.members)
    const members: Member[] = memberSockets
        .map(([id, mSocket]) => ({
            ...mSocket.member,
            id,
        } as Member))
    for (const [_, socket] of memberSockets) {
        socket.emit('poll', {
            ...room,
            members,
        })
    }
  }

  getRoom() {
      return rooms[this.socket.roomId]
  }

}

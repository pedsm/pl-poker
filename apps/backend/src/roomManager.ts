import { Logger } from 'pino'
import { Socket } from 'socket.io'
import { IDeck, DECK_LIST } from './decks'
import logger from './logger'
import { ITrackingService, MixpanelTrackingService, TrackingEvents } from './trackingService'

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

interface IRoomManager {
  joinRoom(roomId: string, socket: ISocket): Promise<void>
  removeFromRoom(reason: string): void
  clearTableOnRoom(room: IRoom): void
  changeDeck(newDeckIndex: number): void
  flipAll(): void
}

export class RoomManager implements IRoomManager {
  trackingService: ITrackingService
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

  async joinRoom(roomId: string) {
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

  private createRoom(id: string): IRoom {
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
    this.trackingService.trackEvent(TrackingEvents.CHANGE_DECK, {
      ...this.getPropsForTracking(),
      deckName,
    })
    this.trackingService.trackRoom(room.id, {
      deckName,
    })
  }

  clearTableOnRoom(room: IRoom) {
    this.trackingService.trackEvent(TrackingEvents.CLEAR_TABLE, this.getPropsForTracking())
    for (const [_, { member }] of Object.entries(room.members)) {
      member.card = null
    }
  }

  private getPropsForTracking() {
    const { id, roomId } = this.socket
    return {
      distinct_id: id,
      roomId,
      ip: this.ip
    }
  }

  getRoom() {
      return rooms[this.socket.roomId]
  }

}

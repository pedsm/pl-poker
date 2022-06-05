import Vue from 'vue'
import Vuex from 'vuex'
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

import config from './config'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        room: null as any
    },
    mutations: {
        socket_pool(state, room) {
            state.room = room
        }
    },
    getters: {
      deck(state) {
        if(state.room) {
          const { availableDecks, selectedDeck } = state.room
          return availableDecks[selectedDeck].cards
        }
        return []
      },
      room(state) {
        return state.room
      },
      members(state) {
        if(state.room?.members) {
          return state.room.members
        }
        return []
      },
      availableDecks(state) {
        if(state.room?.availableDecks) {
          return state.room.availableDecks
        }
        return []
      }
    }
})

const socketConnection = SocketIO.io(config.API_URL, {
  withCredentials: false,
})

Vue.use(new VueSocketIO({
  debug: true, // TODO change this later
  connection: socketConnection,
  vuex: {
    store,
    actionPrefix: 'socket_',
    mutationPrefix: 'socket_'
  }
}))


export default store;
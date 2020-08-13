import Vue from 'vue'
import Vuex from 'vuex'
import VueSocketIO from 'vue-socket.io'

import config from './config'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        room: null
    },
    mutations: {
        socket_pool(state, room) {
            state.room = room
        }
    },
    getters: {
      deck(state) {
        if(state.room) {
          return state.room.deck
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
      }
    }
})

Vue.use(new VueSocketIO({
  debug: false,
  connection: config.API_URL,
  vuex: {
    store,
    actionPrefix: 'socket_',
    mutationPrefix: 'socket_'
  }
}))


export default store;
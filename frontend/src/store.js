"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var vuex_1 = __importDefault(require("vuex"));
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var vue_socket_io_1 = __importDefault(require("vue-socket.io"));
var config_1 = __importDefault(require("./config"));
vue_1.default.use(vuex_1.default);
var store = new vuex_1.default.Store({
    state: {
        room: null
    },
    mutations: {
        socket_pool: function (state, room) {
            state.room = room;
        }
    },
    getters: {
        deck: function (state) {
            if (state.room) {
                return state.room.deck;
            }
            return [];
        },
        room: function (state) {
            return state.room;
        },
        members: function (state) {
            var _a;
            if ((_a = state.room) === null || _a === void 0 ? void 0 : _a.members) {
                return state.room.members;
            }
            return [];
        }
    }
});
var socketConnection = socket_io_client_1.default.io(config_1.default.API_URL, {
    withCredentials: false,
});
vue_1.default.use(new vue_socket_io_1.default({
    debug: true,
    connection: socketConnection,
    vuex: {
        store: store,
        actionPrefix: 'socket_',
        mutationPrefix: 'socket_'
    }
}));
exports.default = store;

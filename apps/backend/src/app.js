"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express_1 = __importDefault(require("express"));
// const express = require('express');
var path_1 = __importDefault(require("path"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var roomManager_1 = require("./roomManager");
var app = (0, express_1.default)();
var http = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(http, {
    cors: {
        origin: '*',
        credentials: false
    },
    allowEIO3: true
});
var PORT = process.env.PORT;
http.listen(PORT, function () {
    console.log("Server running on " + PORT);
});
app.use(express_1.default.static('dist'));
app.get('/health', function (_, res) {
    res.send({
        clientCount: Object.keys(io.sockets.sockets).length,
        roomCount: Object.keys(roomManager_1.rooms).length
    });
});
function serveVue(req, res) {
    res.sendFile(path_1.default.join(__dirname, '../dist/index.html'));
}
app.get('/', serveVue);
app.get('/r/*', serveVue);
io.on('connection', function (socket) {
    console.log('A user has connected');
    socket.member = {
        name: "",
        card: null,
        hidden: true
    };
    socket.on('join', function (roomId) {
        if (roomManager_1.rooms[roomId] == null) {
            roomManager_1.rooms[roomId] = (0, roomManager_1.createRoom)(roomId);
        }
        (0, roomManager_1.joinRoom)(roomId, socket);
    });
    socket.on('changeName', function (name) {
        socket.member.name = name;
        if (name == '') {
            socket.member.hidden = true;
            socket.member.card = null;
        }
        poolRoom(getRoomForSocket(socket));
    });
    socket.on('pickCard', function (index) {
        socket.member.hidden = true;
        socket.member.card = index;
        poolRoom(getRoomForSocket(socket));
    });
    socket.on('flipCard', function () {
        socket.member.hidden = !socket.member.hidden;
        poolRoom(getRoomForSocket(socket));
    });
    socket.on('flipAll', function () {
        var room = getRoomForSocket(socket);
        for (var _i = 0, _a = Object.entries(room.members); _i < _a.length; _i++) {
            var _b = _a[_i], _ = _b[0], member = _b[1].member;
            member.hidden = false;
        }
        poolRoom(getRoomForSocket(socket));
    });
    socket.on('pool', function (roomId) {
        io.emit('state', roomManager_1.rooms[roomId]);
    });
    socket.on('disconnect', function (reason) {
        console.log(socket.id + " has disconected, " + reason);
        (0, roomManager_1.removeFromRoom)(socket);
    });
});
setInterval(function () {
    //sort that out
    for (var _i = 0, _a = Object.entries(roomManager_1.rooms); _i < _a.length; _i++) {
        var _b = _a[_i], _ = _b[0], room = _b[1];
        poolRoom(room);
    }
}, 1000);
function poolRoom(room) {
    if ((room === null || room === void 0 ? void 0 : room.members) == null)
        return;
    var memberSockets = Object.entries(room.members);
    var members = memberSockets
        .map(function (_a) {
        var id = _a[0], mSocket = _a[1];
        return (__assign({ id: id }, mSocket.member));
    });
    for (var _i = 0, memberSockets_1 = memberSockets; _i < memberSockets_1.length; _i++) {
        var _a = memberSockets_1[_i], _ = _a[0], socket = _a[1];
        socket.emit('pool', {
            id: room.id,
            deck: room.deck,
            members: members,
        });
    }
}
function getRoomForSocket(socket) {
    return roomManager_1.rooms[socket.roomId];
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const users = {};
const userRooms = {};
// const peer = new Peer();
class SocketService {
    constructor() {
        console.log("Init socket service...");
        this._io = new socket_io_1.Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
    }
    initListeners() {
        const io = this.io;
        io.on("connect", (socket) => {
            console.log(`New Socket Connected : id: ${socket.id}`);
            console.log(users);
            console.log(userRooms);
            const username = socket.handshake.query.username;
            if (typeof username === "string") {
                users[username] = socket.id;
            }
            socket.on("join-room", (roomId, userId) => {
                // console.log(roomname);
                // if (userRooms[roomname]) {
                //   userRooms[roomname].push(username);
                // } else {
                //   userRooms[roomname] = [];
                //   userRooms[roomname].push(username);
                // }
                socket.join(roomId);
                // io.to(roomname).emit("online:users:room", userRooms);
                socket.broadcast.to(roomId).emit('user-connected', userId);
            });
        });
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;

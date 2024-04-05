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
            const username = socket.handshake.query.username;
            if (typeof username === "string") {
                users[username] = socket.id;
            }
            socket.on("join-room", (roomId, userId) => {
                socket.join(roomId);
                if (!userRooms[roomId])
                    userRooms[roomId] = [];
                userRooms[roomId].push(userId);
                io.emit("online:users", userRooms);
                io.to(roomId).emit("user-connected", userId);
            });
            socket.on("event:players:changed", (data, roomId, myId) => {
                const players = JSON.parse(data);
                const newPlayers = players.filter((player) => player.user !== myId);
                io.to(roomId).emit("event:players:changed:reply", newPlayers);
            });
            socket.on("event:user:leave", (myId, roomId) => {
                socket.join(roomId);
                userRooms[roomId] = userRooms[roomId].filter((userId) => userId !== myId);
                io.emit("online:users", userRooms);
                socket.to(roomId).emit("event:user:leave:reply", myId);
            });
            socket.on("online:Users", () => {
                io.emit("online:users", userRooms);
            });
        });
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;

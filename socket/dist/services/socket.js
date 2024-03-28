"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const users = {};
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
            socket.on("join:room", (data) => {
                const { roomname } = JSON.parse(data);
                console.log(roomname);
                socket.join(roomname);
            });
        });
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;

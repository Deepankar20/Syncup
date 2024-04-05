import { Server } from "socket.io";
import Peer from "peerjs";

const users: any = {};
const userRooms: any = {};

// const peer = new Peer();

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init socket service...");

    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  public initListeners() {
    const io = this.io;

    io.on("connect", (socket) => {
      console.log(`New Socket Connected : id: ${socket.id}`);

      const username = socket.handshake.query.username;

      if (typeof username === "string") {
        users[username] = socket.id;
      }

      socket.on("join-room", (roomId, userId) => {
        socket.join(roomId);
        if (!userRooms[roomId]) userRooms[roomId] = [];

        userRooms[roomId].push(userId);

        io.emit("online:users", userRooms);

        io.to(roomId).emit("user-connected", userId);
      });

      socket.on("event:players:changed", (data, roomId, myId) => {
        const players = JSON.parse(data);

        const newPlayers = players.filter(
          (player: any) => player.user !== myId
        );

        io.to(roomId).emit("event:players:changed:reply", newPlayers);
      });

      socket.on("event:user:leave", (myId, roomId) => {
        socket.join(roomId);
        userRooms[roomId] = userRooms[roomId].filter(
          (userId: string) => userId !== myId
        );
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

export default SocketService;

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
      console.log(users);
      console.log(userRooms);

      const username = socket.handshake.query.username;

      if (typeof username === "string") {
        users[username] = socket.id;
      }

      socket.on("join-room", (roomId, userId) => {
        socket.join(roomId);
        io.to(roomId).emit("user-connected", userId);
      });

      socket.on("event:players:changed", (data, roomId, myId) => {
        const players = JSON.parse(data);
        console.log(players);
        

       const newPlayers = players.filter((player:any) => player.user !== myId);

        io.to(roomId).emit("event:players:changed:reply", newPlayers);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;

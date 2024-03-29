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

      socket.on("join:room", (data) => {
        const { roomname, username } = data;
        console.log(roomname);
        if (userRooms[roomname]) {
          userRooms[roomname].push(username);
        } else {
          userRooms[roomname] = [];
          userRooms[roomname].push(username);
        }
        socket.join(roomname);
        io.to(roomname).emit("online:users:room", userRooms);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;

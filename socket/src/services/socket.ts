import { Server } from "socket.io";
const users: any = {};

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

export default SocketService;

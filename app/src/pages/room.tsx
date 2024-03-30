import { useSocket } from "@/context/SocketProvider";
import React from "react";

function Room() {
  const { joinRoom } = useSocket();
  return (
    <div>
      room
      <button>join</button>
    </div>
  );
}

export default Room;

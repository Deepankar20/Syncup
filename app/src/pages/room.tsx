import { useSocket } from "@/context/SocketProvider";
import React from "react";

function Room() {
  const { joinRoom } = useSocket();
  return (
    <div>
      room
      <button
        onClick={() =>
          joinRoom({
            username: localStorage.getItem("username") as string,
            roomname: "room",
          })
        }
      >
        join
      </button>
    </div>
  );
}

export default Room;

"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
  joinRoom: (data: IData) => any;
}

interface IData {
  username: string;
  roomname: string;
}

interface SocketProviderProps {
  children?: React.ReactNode;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("state is ubdefined");

  return state;
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();

  const joinRoom: ISocketContext["joinRoom"] = useCallback(
    (data: IData) => {
      if (socket) {
        console.log(socket);
        socket.emit("join:room", JSON.stringify(data));
      }
    },
    [socket],
  );

  useEffect(() => {
    const username = localStorage.getItem("username");

    const _socket = io("http://localhost:8000", { query: { username } });

    setSocket((prev) => _socket);

    return () => {
      _socket.disconnect();
      setSocket(undefined);
    };
  },[]);

  return (
    <SocketContext.Provider value={{ joinRoom }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

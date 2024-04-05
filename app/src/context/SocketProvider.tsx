"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";

interface ISocketContext {
  joinRoom: (data: IData) => any;
  socket: any;
  onlineUser: any;
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
  if (!state) throw new Error("state is undefined");

  return state;
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [onlineUser, setOnlineUser] = useState();

  const [players, setPlayers] = useState();
  const [users, setUsers] = useState();

  const joinRoom: ISocketContext["joinRoom"] = useCallback(
    (data: IData) => {
      if (socket) {
        console.log(socket);
        // socket.emit("join:room", data);
      }
    },
    [socket],
  );

  const onlineUsers = useCallback(
    (data: any) => {
      setOnlineUser(data);
    },
    [socket],
  );

  useEffect(() => {
    const username = localStorage.getItem("username");
    const _socket = io("http://localhost:8000", { query: { username } });

    _socket.on("online:users", onlineUsers);

    setSocket((prev) => _socket);

    return () => {
      _socket.disconnect();
      _socket.off("online:users", onlineUsers);

      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ joinRoom, socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

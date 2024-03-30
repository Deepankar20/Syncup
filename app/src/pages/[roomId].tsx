import { useSocket } from "@/context/SocketProvider";
import useMediaStream from "@/hooks/useMediaStream";
import usePeer from "@/hooks/usePeer";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Room = () => {
  const { roomId } = useRouter().query;
  const { peer, myId } = usePeer();
  const { socket } = useSocket();
  const { stream } = useMediaStream();
  const [users, setUsers] = useState({});
  const [players, setPlayers] = useState({});

  console.log(players);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser: any) => {
      console.log(`user connected in room with userId ${newUser}`);
      setPlayers((prev) => ({
        ...prev,
        [newUser]: {
          url: stream,
          muted: true,
          playing: true,
        },
      }));

      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream: any) => {
        console.log(`incoming stream from ${newUser}`);
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [newUser]: call,
        }));
      });
    };
    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, setPlayers, socket, stream]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on("call", (call: any) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream: any) => {
        console.log(`incoming stream from ${callerId}`);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [callerId]: call,
        }));
      });
    });
  }, [peer, setPlayers, stream]);

  return (
    <div>
      {roomId}

      {Object.keys(players).map((playerId) => {
        //@ts-ignore
        const { url, muted, playing } = players[playerId];
        console.log("hi");

        return (
          <ReactPlayer
            url={url}
            muted={muted}
            playing={playing}
            width="30%"
            height="30%"
          />
        );
      })}
    </div>
  );
};

export default Room;

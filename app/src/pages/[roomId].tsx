import { useSocket } from "@/context/SocketProvider";
import useMediaStream from "@/hooks/useMediaStream";
import usePeer from "@/hooks/usePeer";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface players {
  url: string;
  muted: boolean;
  playing: boolean;
  user: string;
}

const Room = () => {
  const { roomId } = useRouter().query;
  const { peer, myId } = usePeer();
  const { socket } = useSocket();
  const { stream } = useMediaStream();
  const [users, setUsers] = useState({});
  const [players, setPlayers] = useState<players[]>([]);
  const [newUser, setNewUser] = useState();
  const [_callerId, setCallerId] = useState();
  const [playersToMap, setPlayersToMap] = useState<players[]>();

  const userSet = new Set();

  function filterUniqueObjects(array: players[], property: any) {
    return array.filter(
      (obj: any, index: any, self: any) =>
        index === self.findIndex((t: any) => t[property] === obj[property]),
    );
  }

  useEffect(() => {
    socket?.emit(
      "event:players:changed",
      JSON.stringify(players),
      roomId,
      myId,
    );
  }, []);

  useEffect(() => {
    if (!stream) return;
    setPlayers((prev) => [
      ...prev,
      {
        url: stream,
        muted: true,
        playing: true,
        user: myId,
      },
    ]);
  }, [stream, peer, socket, setPlayers]);

  useEffect(() => {
    if (!socket || !peer || !stream) return;

    const handleUserConnected = (newUser: any) => {
      console.log(`user connected in ${roomId} with userId ${newUser}`);
      setNewUser(newUser);

      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream: any) => {
        console.log(`incoming stream from ${newUser}`);

        setPlayers((prev) => [
          ...prev,
          {
            url: incomingStream,
            muted: true,
            playing: true,
            user: newUser,
          },
        ]);

        setUsers((prev) => ({
          ...prev,
          [newUser]: call,
        }));
      });
    };

    // const handleUserChanged = (players: players[]) => {
    //   console.log("kuch toh hua players array mein", players);
    //   setPlayers(players);
    // };
    socket.on("user-connected", handleUserConnected);
    // socket.on("event:players:changed:reply", handleUserChanged);

    return () => {
      socket.off("user-connected", handleUserConnected);
      // socket.off("event:players:changed:reply", handleUserChanged);

      setPlayers((prev) => players.filter((player) => player.user !== newUser));
    };
  }, [stream, peer, setPlayers, socket]);

  useEffect(() => {
    if (!peer || !stream) return;
    console.log("players :", players);
    peer.on("call", (call: any) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream: any) => {
        console.log(`incoming stream from ${callerId}`);
        setCallerId(callerId);

        setPlayers((prev) => [
          ...prev,
          {
            url: incomingStream,
            muted: true,
            playing: true,
            user: callerId,
          },
        ]);

        setUsers((prev) => ({
          ...prev,
          [callerId]: call,
        }));
      });
    });

    return () => {
      setPlayers((prev) => []);
    };
  }, [stream, peer, setPlayers, socket]);

  return (
    <div className="grid grid-cols-4 gap-3">
      {players &&
        players.map((player, id) => {
          try {
            const { url, muted, playing, user } = player;

            if (userSet.has(user)) return;

            if (!userSet.has(user)) {
              userSet.add(user);
            }

            if (!url) return;
            if (user === myId) return;

            return (
              <div className="border border-blue-500 ">
                <ReactPlayer
                  url={url}
                  muted={muted}
                  playing={playing}
                  width="100%"
                  height="100%"
                  key={id}
                />

                <span>{user}</span>
              </div>
            );
          } catch (error) {
            console.log(error);
          }
        })}
    </div>
  );
};

export default Room;

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
  const [mounted, setMounted] = useState(false);

  const userSet = new Set();
  const router = useRouter();

  const leaveRoom = () => {
    socket.emit("event:user:leave", myId, roomId);
    console.log("leaving room", roomId);

    stream?.getVideoTracks()[0]?.stop();

    router.push("/");
  };

  function filterUniqueObjects(array: players[], property: any) {
    return array.filter(
      (obj: any, index: any, self: any) =>
        index === self.findIndex((t: any) => t[property] === obj[property]),
    );
  }

  useEffect(() => {
    if (mounted) {
      leaveRoom();
    } else {
      setMounted((_prev) => true);
    }
  }, []);

  useEffect(() => {
    if (!stream) return;
    //@ts-ignore
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

    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);

      // setPlayers((prev) => players.filter((player) => player.user !== newUser));
    };
  }, [stream, peer, setPlayers, socket]);

  useEffect(() => {
    if (!peer || !stream) return;

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

  useEffect(() => {
    if (!socket) return;

    const handleUserLeave = (userId: players["user"]) => {
      //@ts-ignore
      users[userId]?.close();

      const newPlayers = players.filter((player) => player.user !== userId);
      setPlayers((_prev) => newPlayers);
    };

    socket.on("event:user:leave:reply", handleUserLeave);
  }, [players, setPlayers, socket, users]);

  return (
    <div className="grid grid-cols-4 gap-3">
      {/* <div>{screen && <ReactPlayer url={screen} playing={true} />}</div> */}

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

            console.log(url);

            return (
              <div className="border border-blue-500">
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

      {peer && <button onClick={leaveRoom}>leave room</button>}
    </div>
  );
};

export default Room;

import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import RoomTable from "@/components/RoomTable";
import Card from "@/components/Card";
import { SearchBar } from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketProvider";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const [rooms, setRooms] = useState([]);
  console.log(rooms);
  

  const getAllRooms = api.room.getAllRooms.useMutation({
    onSuccess: (data) => {
      if (data.code === 201) {
        console.log(data.message);
        //@ts-ignore
        setRooms(data?.data);
      }
    },
  });

  useEffect(()=>{

    getAllRooms.mutate();

  },[])

  // useEffect(()=>{
  //   useSocket().socket.emit("online:Users");
  // },[])

  return (
    <div className="flex h-screen w-screen overflow-y-scroll bg-slate-900 text-gray-300">
      {/* Component Start */}
      <div className="flex w-16 flex-col items-center overflow-auto border-r border-gray-300 pb-4">
        <a
          className={`flex h-16 w-full flex-shrink-0 items-center justify-center ${""} bg-gray-900`}
          href="#"
        >
          <svg
            className="h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </a>
        <a
          className="mt-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-blue-700 hover:bg-gray-300"
          href="/"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </a>
        <a
          className="mt-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded hover:bg-gray-300"
          href="createRoom"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </a>
        {/* Add more anchor tags as needed */}
      </div>

      <div className="flex flex-grow flex-col">
        {/* Add page content */}
        <SearchBar />

        {/* <RoomTable /> */}
        <div className="grid grid-cols-3 gap-4">
          {rooms.map((room) => {
            //@ts-ignore
            return <Card room={room}/>;
          })}
        </div>
      </div>
      {/* Component End */}
    </div>
  );
}

import { useSocket } from "@/context/SocketProvider";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Card = ({ room }: any) => {
  const techstack = JSON.parse(room.techstack);
  const router = useRouter();
  const { onlineUser } = useSocket();

  const [online, setOnline] = useState();

  useEffect(() => {
    if (onlineUser) {
      setOnline(onlineUser[room.id]?.length);
    }
  }, [onlineUser]);

  const handleClick = () => {
    router.push(`/room/${room.id}`);
  };

  return (
    <div
      className="mx-auto max-w-md overflow-hidden rounded-lg bg-slate-800 shadow hover:cursor-pointer"
      onClick={handleClick}
    >
      <img
        src="https://assets-global.website-files.com/6344c9cef89d6f2270a38908/65725709c91402ab52b1c2b9_Best%207%2B%20Coding%20Languages%20for%20a%20SaaS%20Tech%20Stack%202023%20Guide.webp"
        className="aspect-video w-full object-cover"
        alt=""
      />
      <div className="p-3">
        <p className="text-primary-500 mb-1 text-sm">
          {room.createdBy}• <time>{room.createdAt.toDateString()}</time>
        </p>
        <h3 className="text-xl font-medium text-white">{room.name}</h3>
        <p className="mt-1 text-gray-500">{room.description}</p>
        <div className="mt-4 flex justify-between">
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
              {techstack[0]}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
              {techstack[1]}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
              {techstack[2] && techstack[2]}
            </span>
          </div>

          <div>
            <span>{online ? `${online} online` : "0 online"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

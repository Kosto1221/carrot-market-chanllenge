"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon as SolidChatBubbleOvalLeftEllipsisIcon,
  PlusIcon as SolidPlusIcon,
  GlobeAsiaAustraliaIcon as SolidGlobeAsiaAustraliaIcon,
  UserGroupIcon as SolidUserGroupIcon,
} from "@heroicons/react/24/solid";
import {
  UserIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatBubbleOvalLeftEllipsisIcon,
  PlusIcon as OutlinePlusIcon,
  GlobeAsiaAustraliaIcon as OutlineGlobeAsiaAustraliaIcon,
  UserGroupIcon as OutlineUserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface TabBarProps {
  avatar: string | null;
  username: string;
}

export default function TabBar({ avatar, username }: TabBarProps) {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-xl  grid grid-cols-5   py-5 *:text-amber-50 bg-amber-500">
      <Link href="/" className="flex flex-col items-center gap-px">
        {pathname === "/" ? (
          <SolidGlobeAsiaAustraliaIcon className="w-7 h-7" />
        ) : (
          <OutlineGlobeAsiaAustraliaIcon className="w-7 h-7" />
        )}
      </Link>
      <Link href="/users" className="flex flex-col items-center gap-px">
        {pathname === "/users" ? (
          <SolidUserGroupIcon className="w-7 h-7" />
        ) : (
          <OutlineUserGroupIcon className="w-7 h-7" />
        )}
      </Link>
      <Link href="/tweets/add" className="flex flex-col items-center gap-px">
        {pathname === "/tweets/add" ? (
          <SolidPlusIcon className="w-7 h-7" />
        ) : (
          <OutlinePlusIcon className="w-7 h-7" />
        )}
      </Link>
      <Link href="/chats" className="flex flex-col items-center gap-px">
        {pathname === "/chats" ? (
          <SolidChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
        ) : (
          <OutlineChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
        )}
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        <div
          className={`relative w-7 h-7 rounded-full overflow-hidden  flex justify-center items-center ${
            pathname === "/profile" ? "border-2 border-yellow-400" : ""
          }`}
        >
          {avatar !== null ? (
            <Image src={`${avatar}/avatar`} alt={username} fill />
          ) : (
            <UserIcon className="size-7 m-auto text-gray-500" />
          )}
        </div>
      </Link>
    </div>
  );
}

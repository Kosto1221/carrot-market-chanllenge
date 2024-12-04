import { formatToTimeAgo } from "@/lib/utils";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { create } from "domain";
import Image from "next/image";
import Link from "next/link";

interface ListTweetProps {
  id: number;
  title: string;
  description: string;
  Likes: object[];
  created_at: Date;
  photo: string | null;
  user: {
    username: string;
    avatar: string | null;
  };
}

export default function ListTweet({
  id,
  title,
  photo,
  description,
  Likes,
  created_at,
  user,
}: ListTweetProps) {
  return (
    <Link
      href={`/tweets/${id}`}
      className="flex  justify-between h-48 bg-white rounded-md border border-neutral-100 shadow-sm p-5 w-full gap-4"
    >
      <div className="flex flex-col justify-between w-3/5">
        <div className="flex gap-2 items-center">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            {user.avatar !== null ? (
              <Image src={user.avatar} alt={user.username} fill />
            ) : (
              <UserIcon className="size-10 m-auto text-gray-500" />
            )}
          </div>
          <div>
            {user.username}
            <div className="text-xs text-neutral-500">
              {formatToTimeAgo(created_at.toString())}
            </div>
          </div>
        </div>
        <div className="flex flex-col  *:text-neutral-500 ">
          <div className="text-lg font-semibold">{title}</div>
          <div className=" break-words line-clamp-2">{description}</div>
        </div>
        <div className="flex items-center text-sm gap-4">
          <div className="flex items-center gap-1">
            <HeartIcon className="size-5" />
            <div className="relative top-[-1px]">12</div>
          </div>
          <div className="flex items-center gap-1">
            <ChatBubbleOvalLeftIcon className="size-5" />
            <div className="relative top-[-1px]">77</div>
          </div>
        </div>
      </div>
      {photo ? (
        <div className="relative w-28 h-full rounded-md overflow-hidden border border-neutral-100 ">
          <Image
            fill
            src={`${photo}/avatar`}
            className="object-cover"
            alt={title}
          />
        </div>
      ) : null}
    </Link>
  );
}

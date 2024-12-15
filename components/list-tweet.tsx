import { formatToTimeAgo } from "@/lib/utils";
import {
  ChatBubbleOvalLeftIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface ListTweetProps {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  photo: string | null;
  views: number;
  user: {
    username: string;
    avatar: string | null;
  };
  _count: {
    likes: number;
    responses: number;
  };
}

export default function ListTweet({
  id,
  title,
  photo,
  description,
  created_at,
  user,
  views,
  _count: { likes, responses },
}: ListTweetProps) {
  return (
    <Link
      href={`/tweets/${id}`}
      className="flex justify-between h-52 bg-amber-50 rounded-md border border-neutral-100 shadow-sm p-5 w-full gap-4"
    >
      <div className="flex flex-col justify-between flex-1 break-all gap-2">
        <div className="flex gap-2 items-center">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border flex justify-center">
            {user.avatar !== null ? (
              <Image src={`${user.avatar}/avatar`} alt={user.username} fill />
            ) : (
              <UserIcon className="size-9 m-auto text-gray-500" />
            )}
          </div>
          <div>
            {user.username}
            <div className="text-xs text-neutral-500">
              {formatToTimeAgo(created_at.toString())}
            </div>
          </div>
        </div>
        <div className="flex flex-col  *:text-neutral-500 leading-tight gap-1">
          <div className="font-extrabold text-base line-clamp-2">{title}</div>
          <div className="line-clamp-2 text-sm">{description}</div>
        </div>
        <div className="flex items-center text-xs gap-4">
          <div className="flex items-center gap-1">
            <EyeIcon className="size-4" />
            <div className="relative top-[-1px]">{views}</div>
          </div>
          <div className="flex items-center gap-1">
            <HeartIcon className="size-4" />
            <div className="relative top-[-1px]">{likes}</div>
          </div>
          <div className="flex items-center gap-1">
            <ChatBubbleOvalLeftIcon className="size-4" />
            <div className="relative top-[-1px]">{responses}</div>
          </div>
        </div>
      </div>
      {photo ? (
        <div className="relative w-28 h-full rounded-md overflow-hidden border border-neutral-100 ">
          <Image
            fill
            src={`${photo}/public`}
            className="object-cover"
            alt={title}
          />
        </div>
      ) : null}
    </Link>
  );
}

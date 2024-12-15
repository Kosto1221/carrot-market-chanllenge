import { formatToTimeAgo } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface ListUserProps {
  id: number;
  avatar: string | null;
  created_at: Date;
  username: string;
  tweets: any;
  subscriptions: any;
  subscribers: any;
}

export default function ListUser({
  id,
  avatar,
  created_at,
  username,
}: ListUserProps) {
  return (
    <Link
      href={`/users/${id}`}
      className="flex justify-between h-20 bg-amber-50 rounded-md border border-neutral-100 shadow-sm p-5 w-full gap-4"
    >
      <div className="flex flex-col justify-between flex-1 break-all gap-2">
        <div className="flex gap-2 items-center">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border flex justify-center">
            {avatar !== null ? (
              <Image src={`${avatar}/avatar`} alt={username} fill />
            ) : (
              <UserIcon className="size-10 m-auto text-gray-500" />
            )}
          </div>
          <div>
            {username}
            <div className="text-xs text-neutral-500">
              {formatToTimeAgo(created_at.toString())}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

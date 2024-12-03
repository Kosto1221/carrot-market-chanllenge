import db from "@/lib/db";
import getSession from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatToTimeAgo } from "@/lib/utils";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function onReturn() {
  "use server";
  redirect("/");
}

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return tweet;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }
  const isOwner = await getIsOwner(tweet.userId);
  return (
    <div className="min-h-screen mb-16">
      <div className="flex justify-between items-center p-5">
        <div className="flex gap-2 items-center">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            {tweet.user.avatar !== null ? (
              <Image src={tweet.user.avatar} alt={tweet.user.username} fill />
            ) : (
              <UserIcon className="size-10 m-auto text-gray-500" />
            )}
          </div>
          <div>
            {tweet.user.username}
            <div className="text-xs text-neutral-500">
              {formatToTimeAgo(tweet.created_at.toString())}
            </div>
          </div>
        </div>
        <button onClick={onReturn}>
          <XCircleIcon className="size-10 text-neutral-500 font-bold" />
        </button>
      </div>

      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-2">{tweet.title}</h1>
        <div className="text-wrap break-words">{tweet.description}</div>
      </div>
      {tweet.photo ? (
        <div className="relative aspect-square">
          <Image
            className="object-cover"
            fill
            src={tweet.photo}
            alt={tweet.title}
          />
        </div>
      ) : null}
    </div>
  );
}

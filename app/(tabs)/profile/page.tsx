import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import getSession from "@/lib/session";
import {
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { redirect } from "next/navigation";
import getUser from "./actions";
import Header from "@/components/header";
import TweetList from "@/components/tweet-list";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

async function getInitialTweets(userId?: number) {
  const tweets = await db.tweet.findMany({
    where: userId ? { userId } : {},
    select: {
      description: true,
      photo: true,
      created_at: true,
      id: true,
      title: true,
      views: true,
      user: {
        select: {
          username: true,
          avatar: true,
          _count: {
            select: {
              subscriptions: true,
              subscribers: true,
              likes: true,
            },
          },
        },
      },
      _count: {
        select: {
          responses: true,
          likes: true,
        },
      },
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Profile() {
  const user = await getUser();
  const initialTweets = await getInitialTweets(user.id);
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/welcome");
  };
  const GoEdit = async () => {
    "use server";
    redirect(`/users/${user.id}/edit`);
  };
  return (
    <div className="min-h-screen pb-16 bg-neutral-50 bg-gradient-to-l from-amber-500 via-amber-400 to-amber-300">
      <Header text="Profile">
        <button onClick={GoEdit}>
          <PencilSquareIcon className="h-7 w-7" />
        </button>
        <button onClick={logOut}>
          <ArrowRightStartOnRectangleIcon className="h-7 w-7" />
        </button>
      </Header>
      <div className="flex flex-col pt-20 p-5 gap-3 h-full">
        <div className="flex gap-4">
          <div className="relative bg-white w-28 aspect-[1/1.2] rounded-lg overflow-hidden flex items-center justify-center  border-neutral-100 box-content  shadow-sm">
            {user.avatar ? (
              <Image
                src={`${user.avatar}/public`}
                alt={user.username}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <UserIcon className="h-20 w-20 text-gray-500" />
            )}
          </div>
          <div className="flex flex-col justify-evenly">
            <div className="text-2xl font-semibold">{user.username}</div>
            <div>{user.email}</div>
            <div className="space-x-2 text-xs">
              <span>likes ({initialTweets[0].user._count.likes})</span>
              <span>
                following ({initialTweets[0].user._count.subscriptions})
              </span>
              <span>follower ({initialTweets[0].user._count.subscribers})</span>
            </div>
          </div>
        </div>
        {user.bio ? (
          <div className="bg-amber-50 h-20 rounded-lg border-neutral-100 shadow-sm p-4">
            {user.bio}
          </div>
        ) : null}
        <div className="">
          <TweetList initialTweets={initialTweets} userId={user.id} />
        </div>
      </div>
    </div>
  );
}

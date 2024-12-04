import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      description: true,
      photo: true,
      Likes: true,
      created_at: true,
      id: true,
      title: true,
      user: {
        select: {
          username: true,
          avatar: true,
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

export default async function Tweets() {
  const initialTweets = await getInitialTweets();
  return (
    <div className="min-h-screen mb-16 max-w-xl">
      <div className="p-5 fixed flex justify-between items-center w-full max-w-xl bg-neutral-50 z-10 text-neutral-500">
        <span className="text-lg font-black">TWEETS</span>
        <Link href="/tweets/add">
          <PencilSquareIcon className="h-7 w-7" />
        </Link>
      </div>
      <div className="pt-12">
        <TweetList initialTweets={initialTweets} />
      </div>
    </div>
  );
}

import Header from "@/components/header";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { BookmarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getInitialTweets(userId?: number, query?: string) {
  const tweets = await db.tweet.findMany({
    where: {
      ...(userId ? { userId } : {}),
      ...(query
        ? {
            OR: [
              { title: { contains: query } },
              { description: { contains: query } },
            ],
          }
        : {}),
    },
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

export default async function Tweets() {
  const initialTweets = await getInitialTweets();
  return (
    <div className="pb-16 min-h-screen bg-gradient-to-l from-amber-500 via-amber-400 to-amber-300">
      <Header text="Tweets">
        <Link href="/search">
          <MagnifyingGlassIcon className="h-7 w-7 text-white" />
        </Link>
        <BookmarkIcon className="h-7 w-7" />
      </Header>
      <div className="pt-20 p-5">
        <TweetList initialTweets={initialTweets} />
      </div>
    </div>
  );
}

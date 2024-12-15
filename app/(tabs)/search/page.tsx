import Header from "@/components/header";
import Search from "@/components/search";
import db from "@/lib/db";
import TweetList from "@/components/tweet-list";
import { Prisma } from "@prisma/client";

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

export default async function SearchPage(props: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const initialTweets = await getInitialTweets(undefined, query);
  return (
    <div className="pb-16 min-h-screen bg-gradient-to-l from-amber-500 via-amber-400 to-amber-300">
      <Header>
        <Search placeholder="Search" />
      </Header>
      <div className="pt-24 p-5 min-h-screen flex w-full flex-1 justify-center flex-shrink-0 flex-grow">
        {query && initialTweets.length > 0 ? (
          <TweetList
            key={query}
            initialTweets={initialTweets}
            userId={undefined}
            query={query}
          />
        ) : (
          <div className="flex items-center justify-center flex-1">
            <div className="font-extrabold text-2xl">Not Found</div>
          </div>
        )}
      </div>
    </div>
  );
}

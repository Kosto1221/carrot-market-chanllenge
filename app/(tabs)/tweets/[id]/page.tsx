import db from "@/lib/db";
import getSession from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatToTimeAgo } from "@/lib/utils";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import ResponseModal from "@/components/response-modal";
import { unstable_cache as nextCache } from "next/cache";
import LikeButton from "@/components/like-button";
import Header from "@/components/header";

// async function onReturn() {
//   "use server";
//   redirect("/");
// }

async function getTweet(id: number) {
  const tweet = await db.tweet.update({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          responses: true,
        },
      },
    },
  });
  return tweet;
}

async function getResponses(tweetId: number) {
  return await db.response.findMany({
    where: { tweetId },
    orderBy: {
      created_at: "desc",
    },
    include: {
      user: {
        select: { username: true },
      },
    },
  });
}

const getCachedTweet = nextCache(getTweet, ["tweet-detail"], {
  tags: ["tweet-detail"],
  revalidate: 60,
});

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId!);
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
  const tweet = await getCachedTweet(id);
  if (!tweet) {
    return notFound();
  }

  const { likeCount, isLiked } = await getCachedLikeStatus(id);

  const responses = await getResponses(id);
  return (
    <div className="min-h-screen pb-20 bg-gradient-to-l from-amber-500 via-amber-400 to-amber-300">
      <Header />
      <div className="pt-16 px-4">
        {tweet.photo ? (
          <div className="relative aspect-square mx-2 mt-3 rounded-lg overflow-hidden">
            <Image
              className="object-cover"
              fill
              src={`${tweet.photo}/public`}
              alt={tweet.title}
            />
          </div>
        ) : null}
        <div className="flex justify-between items-center p-3 m-2 bg-amber-50 rounded-md">
          <div className="flex gap-2 items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              {tweet.user.avatar !== null ? (
                <Image
                  src={`${tweet.user.avatar}/avatar`}
                  alt={tweet.user.username}
                  fill
                />
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
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <LikeButton
                isLiked={isLiked}
                likeCount={likeCount}
                tweetId={id}
              />
            </div>
            <div className="border-[1px] border-neutral-500 opacity-50" />
            <button>
              <BookmarkIcon className="size-6 text-neutral-500 " />
            </button>
          </div>
        </div>
        <div className="p-3 bg-amber-50 m-2 rounded-md">
          <h1 className="text-2xl font-semibold mb-2 text-wrap break-all">
            {tweet.title}
          </h1>
          <div className="text-wrap break-all">{tweet.description}</div>
        </div>
        <ResponseModal responses={responses} tweetId={id}>
          <button className="flex flex-col p-4 gap-1 rounded-md bg-amber-50 justify-start w-[97%] mx-auto text-xs">
            <div className="space-x-1">
              <span>댓글</span>
              <span>{tweet._count.responses}</span>
            </div>
            <div>댓글쓰기...</div>
          </button>
        </ResponseModal>
      </div>
    </div>
  );
}

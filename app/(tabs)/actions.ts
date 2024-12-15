"use server";

import db from "@/lib/db";

export async function getMoreTweets(
  page: number,
  userId?: number,
  query?: string
) {
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
      id: true,
      title: true,
      description: true,
      likes: true,
      created_at: true,
      photo: true,
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

    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

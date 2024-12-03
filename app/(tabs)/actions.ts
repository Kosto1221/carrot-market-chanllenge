"use server";

import db from "@/lib/db";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      Likes: true,
      created_at: true,
      photo: true,
      user: {
        select: {
          username: true,
          avatar: true,
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

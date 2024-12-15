import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

export default async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export async function getMoreTweets(page: number, userId?: number) {
  const tweets = await db.tweet.findMany({
    where: userId ? { userId } : {},
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
          email: true,
          _count: {
            select: {
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

    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

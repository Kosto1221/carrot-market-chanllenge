"use server";

import db from "@/lib/db";

export async function getMoreUsers(page: number) {
  const users = await db.user.findMany({
    select: {
      username: true,
      avatar: true,
      created_at: true,
      id: true,
      tweets: true,
      subscriptions: true,
      subscribers: true,
    },

    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return users;
}

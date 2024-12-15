"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export async function likeTweet(tweetId: number) {
  const session = await getSession();
  await db.like.create({
    data: {
      tweetId,
      userId: session.id!,
    },
  });
  revalidateTag(`like-status-${tweetId}`);
}

export async function dislikeTweet(tweetId: number) {
  const session = await getSession();
  await db.like.delete({
    where: {
      id: {
        tweetId,
        userId: session.id!,
      },
    },
  });
  revalidateTag(`like-status-${tweetId}`);
}

// const passwordRegex = new RegExp(/.*\d.*/);

// const checkEmail = (email: string) => email.includes("@zod.com");

// const checkPasswords = ({
//   password,
//   confirm_password,
// }: {
//   password: string;
//   confirm_password: string;
// }) => password === confirm_password;

const payloadSchema = z.string().min(10).max(2000);

export async function respondTweet(state: unknown, formData: FormData) {
  const payload = formData.get("payload");
  const tweetId = formData.get("tweetId");

  const result = payloadSchema.safeParse(payload);

  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();
  if (session.id) {
    await db.response.create({
      data: {
        payload: result.data,
        userId: session.id,
        tweetId: Number(tweetId),
      },
    });

    // revalidateTag(`responses-${tweetId}`);
  }
}

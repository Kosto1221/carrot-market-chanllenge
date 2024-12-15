"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import bcrypt from "bcrypt";

const passwordRegex = new RegExp(/.*\d.*/);

const checkEmail = (email: string) => email.includes("@zod.com");

// const checkPasswords = ({
//   password,
//   confirm_password,
// }: {
//   password: string;
//   confirm_password: string;
// }) => password === confirm_password;

const formSchema = z
  .object({
    avatar: z.string().nullable().optional(),
    username: z
      .string()
      .min(5, "Username should be at least 5 characters long")
      .max(15)
      .trim()
      .nullable()
      .optional(),
    email: z
      .string()
      .email("Invalid email format")
      .refine(checkEmail, "Only @zod.com emails are allowed")
      .nullable()
      .optional(),
    bio: z.string().max(200).nullable().optional(),
    password: z
      .string()
      .nullable()
      .optional()
      .refine(
        (password) => !password || password.length >= 10,
        "Password should be at least 10 characters long"
      )
      .refine(
        (password) => !password || passwordRegex.test(password),
        "Password must include at least one uppercase, lowercase, digit, and special character"
      ),
    confirm_password: z
      .string()
      .nullable()
      .optional()
      .refine(
        (confirm_password) =>
          !confirm_password || confirm_password.length >= 10,
        "Password should be at least 10 characters long"
      )
      .refine(
        (confirm_password) =>
          !confirm_password || passwordRegex.test(confirm_password),
        "Password must include at least one uppercase, lowercase, digit, and special character"
      ),
  })
  .superRefine(async (data, ctx) => {
    if (data.username) {
      const existingUser = await db.user.findUnique({
        where: { username: data.username },
      });
      if (existingUser) {
        ctx.addIssue({
          code: "custom",
          message: "This username is already taken",
          path: ["username"],
        });
      }
    }
    if (data.email) {
      const existingUser = await db.user.findUnique({
        where: { email: data.email },
      });
      if (existingUser) {
        ctx.addIssue({
          code: "custom",
          message: "This email is already taken",
          path: ["email"],
        });
      }
    }
    if (
      data.password &&
      data.confirm_password &&
      data.password !== data.confirm_password
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }
  });

export async function editUser(userId: number, formData: FormData) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  const data = {
    username: formData.get("username"),
    avatar: formData.get("avatar"),
    email: formData.get("email"),
    bio: formData.get("bio"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const updateData: any = {};

      if (result.data.username) updateData.username = result.data.username;
      if (result.data.avatar) updateData.avatar = result.data.avatar;
      if (result.data.email) updateData.email = result.data.email;
      if (result.data.bio) updateData.bio = result.data.bio;
      if (result.data.password) {
        const hashedPassword = await bcrypt.hash(result.data.password, 10);
        updateData.password = hashedPassword;
      }

      const editedUser = await db.user.update({
        where: {
          id: userId,
        },
        data: updateData,
        select: {
          id: true,
        },
      });

      redirect(`/users/${editedUser.id}`);
    }
  }
}

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

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.IMAGES_ACCOUNT}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.IMAGES_API}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

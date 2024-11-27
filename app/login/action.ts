"use server";

import { z } from "zod";

const passwordRegex = new RegExp(/.*\d.*/);

const checkEmail = (email: string) => email.includes("@zod.com");

const formSchema = z.object({
  email: z.string().refine(checkEmail, "Only @zod.com emails are allowed"),
  username: z
    .string()
    .min(5, "Username should be at least 5 characters long")
    .max(15)
    .trim(),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long")
    .trim()
    .regex(
      passwordRegex,
      "Password should contain at least one number (0123456789)"
    ),
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
}

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export default async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionContent>(cookieStore, {
    cookieName: "juicy-orange",
    password: process.env.COOKIE_PASSWORD!,
  });
}
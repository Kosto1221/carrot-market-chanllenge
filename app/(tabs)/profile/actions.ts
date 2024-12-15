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

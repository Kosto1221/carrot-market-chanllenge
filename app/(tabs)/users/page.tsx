import Header from "@/components/header";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import {
  BookmarkIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Bars2Icon,
  Bars3Icon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import UserList from "@/components/user-list";

async function getInitialUsers() {
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
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return users;
}

export type InitialUsers = Prisma.PromiseReturnType<typeof getInitialUsers>;

export default async function Users() {
  const initialUsers = await getInitialUsers();
  return (
    <div className="pb-16 min-h-screen bg-gradient-to-l from-amber-500 via-amber-400 to-amber-300 ">
      <Header text="Users">
        <BookmarkIcon className="h-7 w-7" />
      </Header>
      <div className="pt-16">
        <UserList initialUsers={initialUsers} />
      </div>
    </div>
  );
}

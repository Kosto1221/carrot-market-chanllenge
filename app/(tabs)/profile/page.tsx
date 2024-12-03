import db from "@/lib/db";
import getSession from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

async function getUser() {
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

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/welcome");
  };
  return (
    <div className="flex flex-col gap-3 w-full h-screen">
      <div className="h-1/6 bg-gray-700 relative">
        <div className="absolute bg-orange-50 h-28 w-28 rounded-full overflow-hidden left-10 -bottom-1/3 flex items-center justify-center">
          {user.avatar !== null ? (
            <Image src={user.avatar} alt={user.username} fill />
          ) : (
            <UserIcon className="size-20 m-auto text-gray-500" />
          )}
        </div>
      </div>
      <div className="pt-20 p-5 space-y-6">
        <div className="text-2xl font-semibold">{user.username}</div>
        <div className="w-full bg-white rounded-md">{user.bio}</div>
        <div>Join in {user.created_at.toDateString()}</div>
        <form action={logOut}>
          <button>Log out</button>
        </form>
      </div>
    </div>
  );
}

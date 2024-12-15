"use client";

import { InitialUsers } from "@/app/(tabs)/users/page";
import { useEffect, useRef, useState } from "react";
import { getMoreUsers } from "@/app/(tabs)/users/actions";
import ListUser from "./list-user";
import { Spinner } from "./spinner";

interface UserListProps {
  initialUsers: InitialUsers;
  userId?: number;
}

export default function UserList({ initialUsers }: UserListProps) {
  const [users, setUsers] = useState(initialUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newusers = await getMoreUsers(page + 1);
          if (newusers.length !== 0) {
            setPage((prev) => prev + 1);
            setUsers((prev) => [...prev, ...newusers]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);
  return (
    <div className="p-5 flex flex-col gap-3 ">
      {users.map((tweet) => (
        <ListUser key={tweet.id} {...tweet} />
      ))}
      {!isLastPage ? (
        <span
          ref={trigger}
          style={{
            marginTop: `${page}vh`,
          }}
          className="mb-96 mx-auto"
        >
          <Spinner />
        </span>
      ) : null}
    </div>
  );
}

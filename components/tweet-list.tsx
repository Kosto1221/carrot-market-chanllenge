"use client";

import { InitialTweets } from "@/app/(tabs)/page";
import ListTweet from "./list-tweet";
import { useEffect, useRef, useState } from "react";
import { getMoreTweets } from "@/app/(tabs)/actions";
import { Spinner } from "./spinner";

interface TweetListProps {
  initialTweets: InitialTweets;
  userId?: number;
  query?: string;
}

export default function TweetList({
  initialTweets,
  userId,
  query,
}: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
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
          const newTweets = await getMoreTweets(page + 1, userId, query);
          if (newTweets.length !== 0) {
            setPage((prev) => prev + 1);
            setTweets((prev) => [...prev, ...newTweets]);
          } else {
            setIsLastPage(true);
          }
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
  }, [page, query, userId]);
  return (
    <div className="flex flex-col gap-3">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
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

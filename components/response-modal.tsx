"use client";

import { useActionState, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatToTimeAgo } from "@/lib/utils";
import { respondTweet } from "@/app/(tabs)/tweets/[id]/actions";

export default function ResponseModal({
  children,
  responses,
  tweetId,
}: {
  children: React.ReactNode;
  responses: Array<{
    id: number;
    payload: string;
    created_at: Date;
    user: { username: string };
  }>;
  tweetId: number;
}) {
  const [state, dispatch] = useActionState(respondTweet, null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-center w-full">
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="max-w-xl w-[96%] bg-amber-50 p-5 rounded-t-lg z-50 absolute -bottom-16"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold">Comments</h2>
                <ul className="mt-2 space-y-2 overflow-y-scroll max-h-80">
                  {responses.map((response) => (
                    <li
                      key={response.id}
                      className="p-2 border rounded-md space-y-2"
                    >
                      <div className="text-xs font-semibold space-x-1">
                        <span>{response.user.username}</span>
                        <span>・</span>
                        <span>
                          {formatToTimeAgo(response.created_at.toString())}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">
                        {response.payload}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <form action={dispatch}>
                <textarea
                  name="payload"
                  className="w-full h-24 border rounded-md p-2 focus:outline-none focus:ring-2"
                  placeholder="댓글을 입력하세요..."
                />
                {state?.formErrors}
                <input name="tweetId" defaultValue={tweetId} hidden />
                <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600">
                  댓글 작성
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

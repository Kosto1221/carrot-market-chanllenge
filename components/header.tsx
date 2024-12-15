"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

interface HeaderProps {
  text?: string;
  children?: ReactNode;
}

export default function Header({ text, children }: HeaderProps) {
  const router = useRouter();
  return (
    <div className="p-5 fixed flex justify-between items-center w-full max-w-xl bg-amber-500 z-10 text-amber-50 gap-3">
      {text ? (
        <span className="font-bold text-xl">{text}</span>
      ) : (
        <button type="button" onClick={() => router.back()}>
          <ChevronLeftIcon className="h-7 w-7 -ml-[5px]" />
        </button>
      )}
      <div className="flex gap-2 flex-1 place-content-end">{children}</div>
    </div>
  );
}

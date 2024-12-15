"use client";

import { useFormStatus } from "react-dom";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({ text, className, ...props }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      {...props} // 나머지 버튼 속성 적용
      disabled={pending || props.disabled} // 기존 disabled 상태와 병합
      className={`primary-btn h-12 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed ${className}`}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}

"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useActionState } from "react";
import { logIn } from "./action";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/solid";

export default function LogIn() {
  const [state, dispatch] = useActionState(logIn, null);

  return (
    <div className="flex flex-col justify-center gap-3 py-8 px-6 w-full min-h-screen  bg-gradient-to-l from-amber-500 via-amber-400 to-amber-300">
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors?.email}
          icon={<EnvelopeIcon className="w-5 h-5" />}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={10}
          errors={state?.fieldErrors?.password}
          icon={<KeyIcon className="w-5 h-5" />}
        />
        <Button text="Log in" />
      </form>
    </div>
  );
}

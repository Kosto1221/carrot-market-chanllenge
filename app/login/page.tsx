"use client";

import Image from "next/image";
import Button from "@/components/button";
import Input from "@/components/input";
import { useActionState } from "react";
import { createAccount } from "./action";
import Alert from "@/components/alert";
import { EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/24/solid";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function LogIn() {
  const [state, dispatch] = useActionState(createAccount, null);
  return (
    <div className="flex flex-col gap-3 py-8 px-6 mt-48">
      <div className="flex justify-center items-center mb-5">
        <Image src="/orange.png" alt="Orange" width={70} height={70} />
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
          icon={<EnvelopeIcon className="w-5 h-5" />}
        />
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          minLength={5}
          maxLength={15}
          errors={state?.fieldErrors.username}
          icon={<UserIcon className="w-5 h-5" />}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={10}
          errors={state?.fieldErrors.password}
          icon={<KeyIcon className="w-5 h-5" />}
        />
        <Button text="Log in" />
      </form>
      {state?.fieldErrors == null ? (
        <Alert
          text="Welcome back!"
          icon={<ShieldCheckIcon className="w-6 h-6 stroke-2 text-white " />}
        />
      ) : null}
    </div>
  );
}

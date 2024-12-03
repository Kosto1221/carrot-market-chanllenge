"use client";

import Image from "next/image";
import Button from "@/components/button";
import Input from "@/components/input";
import { useActionState } from "react";
import { createAccount } from "./action";
import {
  EnvelopeIcon,
  UserIcon,
  DocumentIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/solid";
import "@/lib/db";

export default function LogIn() {
  const [state, dispatch] = useActionState(createAccount, null);
  return (
    <div className="flex flex-col justify-center gap-3 py-8 px-6 w-full min-h-screen">
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
          icon={<DocumentIcon className="w-5 h-5" />}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Password Confirm"
          required
          errors={state?.fieldErrors.password}
          icon={<DocumentCheckIcon className="w-5 h-5" />}
        />
        <Button text="Create account" />
      </form>
    </div>
  );
}

"use client";

import Image from "next/image";
import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { useActionState } from "react";
import { handleForm } from "./action";
import Alert from "@/components/alert";
import { EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/24/solid";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
export default function LogIn() {
  const [state, dispatch] = useActionState(handleForm, null);
  return (
    <div className="flex flex-col gap-3 py-8 px-6 mt-48">
      <div className="flex justify-center items-center mb-5">
        <Image src="/orange.png" alt="Orange" width={70} height={70} />
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
          icon={<EnvelopeIcon className="w-5 h-5" />}
        />
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={[]}
          icon={<UserIcon className="w-5 h-5" />}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.errors ?? []}
          icon={<KeyIcon className="w-5 h-5" />}
        />
        <FormButton text="Log in" />
      </form>
      {state?.is_user == true ? (
        <Alert
          text="Welcome back!"
          icon={<ShieldCheckIcon className="w-6 h-6 stroke-2 text-white " />}
        />
      ) : null}
    </div>
  );
}

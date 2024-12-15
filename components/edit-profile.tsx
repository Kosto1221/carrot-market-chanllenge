"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getUploadUrl, editUser } from "@/app/(tabs)/users/[id]/edit/actions";
import { useActionState } from "react";
import Header from "./header";

export default function EditProfile({
  params,
  userData,
}: {
  params: { id: string };
  userData: {
    username: string;
    email: string;
    bio: string | null;
    avatar: string | null;
  };
}) {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [photoId, setImageId] = useState("");

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setImageId(id);
    }
  };
  const interceptAction = async (_: any, formData: FormData) => {
    const file = formData.get("avatar");
    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      return;
    }
    const photoUrl = `https://imagedelivery.net/13w4IKmbnBhg4N4SAxj_Sw/${photoId}`;
    formData.set("avatar", photoUrl);
    return editUser(Number(params.id), formData);
  };
  const [state, dispatch] = useActionState(interceptAction, null);

  return (
    <div className="pb-16 min-h-screen h-full flex flex-col bg-gradient-to-l from-amber-500 via-amber-400 to-amber-300">
      <Header />
      <form
        action={dispatch}
        className="p-5 pt-[70px] flex flex-col gap-5 flex-grow"
      >
        <label
          htmlFor="avatar"
          className="border-2  flex items-center justify-center flex-col aspect-square shrink-0 text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover flex-grow"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
                {state?.fieldErrors.avatar}
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          className="hidden"
        />
        <label className="text-xs -mb-4 text-neutral-500" htmlFor="username">
          Username
        </label>
        <Input
          name="username"
          type="text"
          defaultValue={userData.username}
          errors={state?.fieldErrors.username}
        />
        <label className="text-xs -mb-4 text-neutral-500" htmlFor="email">
          Email
        </label>
        <Input
          name="email"
          type="text"
          defaultValue={userData.email}
          errors={state?.fieldErrors.email}
        />
        <label className="text-xs -mb-4 text-neutral-500" htmlFor="bio">
          Bio
        </label>
        <Input
          name="bio"
          type="text"
          placeholder="bio"
          defaultValue={userData.bio || ""}
          errors={state?.fieldErrors.bio}
        />
        <label className="text-xs -mb-4 text-neutral-500" htmlFor="bio">
          Password
        </label>
        <Input name="password" type="password" />
        <label className="text-xs -mb-4 text-neutral-500" htmlFor="bio">
          Confirm password
        </label>
        <Input
          name="confirm_password"
          type="password"
          errors={
            state?.fieldErrors.password || state?.fieldErrors.confirm_password
          }
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}

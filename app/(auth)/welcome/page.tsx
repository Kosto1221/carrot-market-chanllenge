import Link from "next/link";
import "@/lib/db";
import Image from "next/image";
import Slider from "@/components/slider";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 w-full  bg-gradient-to-l from-amber-500 via-amber-400 to-amber-300">
      <div className="my-auto flex flex-col items-center gap-2 *:font-extrabold w-full text-[100px]">
        honey chat
      </div>
      <div className="flex items-center gap-3 w-full mb-20 mt-10">
        <Link
          href="/create-account"
          className="w-full py-2 text-lg h-6 text-white bg-transparent border-white border box-content rounded-full flex justify-center items-center"
        >
          시작하기
        </Link>
        <Link
          href="/login"
          className="w-full py-2 text-lg h-6 bg-yellow-400 rounded-full flex justify-center items-center box-content text-black"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}

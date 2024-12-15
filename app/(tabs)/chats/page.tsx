import Header from "@/components/header";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Chats() {
  return (
    <div className="mb-16 min-h-screen bg-gradient-to-l from-amber-500 via-amber-400 to-amber-300">
      <Header text="Chats">
        <Bars3Icon className="h-7 w-7" />
      </Header>
      <div className="pt-12"></div>
    </div>
  );
}

import { ReactElement } from "react";

interface AlertProps {
  text: string;
  icon?: ReactElement;
}

export default function Alert({ text, icon }: AlertProps) {
  return (
    <div className="w-full bg-green-600 text-white rounded-lg text-center; h-12 flex px-2 gap-2 items-center font-bold">
      {icon && <span className="ml-2">{icon}</span>}
      {text}
    </div>
  );
}

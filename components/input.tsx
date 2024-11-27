import { InputHTMLAttributes, ReactElement } from "react";

interface InputProps {
  errors?: string[];
  name: string;
  icon?: ReactElement;
}

export default function Input({
  errors = [],
  name,
  icon,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 bg-transparent rounded-full w-full h-11 ring-2 focus-within:ring-4 px-2 transition ring-neutral-200 focus-within:ring-orange-500">
        {icon && <span className="ml-2 text-neutral-400">{icon}</span>}
        <input
          className="bg-transparent flex-1 h-full focus:outline-none border-none placeholder:text-neutral-400"
          name={name}
          {...props}
        />
      </div>
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}

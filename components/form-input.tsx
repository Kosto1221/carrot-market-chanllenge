import { ReactElement } from "react";

interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
  name: string;
  icon?: ReactElement;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
  name,
  icon,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 bg-transparent rounded-full w-full h-11 ring-2 focus-within:ring-4 px-2 transition ring-neutral-200 focus-within:ring-orange-500">
        {icon && <span className="ml-2 text-neutral-400">{icon}</span>}
        <input
          className="bg-transparent flex-1 h-full focus:outline-none border-none placeholder:text-neutral-400"
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
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

import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  id: string;
  type: "text" | "email" | "password";
  placeholder?: string;
  inputClassName?: string;
  register: UseFormRegisterReturn;
};

const Input = ({
  id,
  type = "text",
  placeholder,
  inputClassName,
  register,
}: InputProps) => {
  return (
    <input
      id={id}
      type={type}
      {...register}
      placeholder={placeholder}
      className={`block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground ${inputClassName}`}
    />
  );
};

export default Input;

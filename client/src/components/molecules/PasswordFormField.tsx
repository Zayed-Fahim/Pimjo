import { Input, Label } from "@/components/atoms";
import { EyeOff, EyeOn } from "@/constant";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type PasswordFormFieldProps<T extends FieldValues> = {
  showPassword: boolean;
  className?: string;
  labelClassname?: string;
  htmlFor: string;
  text: string;
  type: "text" | "email" | "password";
  name: Path<T>;
  id: string;
  inputClassName?: string;
  placeholder?: string;
  onClick: () => void;
  register: UseFormRegister<T>;
};

const PasswordFormField = <T extends FieldValues>({
  showPassword = false,
  className,
  labelClassname,
  htmlFor,
  text,
  name,
  id,
  inputClassName,
  placeholder,
  onClick,
  register,
}: PasswordFormFieldProps<T>) => {
  return (
    <div
      className={`group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-1 duration-200 focus-within:ring focus-within:ring-sky-300/30 placeholder:bg-transparent ${className}`}
    >
      <Label htmlFor={htmlFor} text={text} labelClassName={labelClassname} />
      <>
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          register={register(name)}
          placeholder={placeholder}
          inputClassName={inputClassName}
        />
        <div className="absolute right-7 top-1/2 translate-x-1/2 -translate-y-1/2">
          {!showPassword ? (
            <EyeOff className="h-5 w-5 cursor-pointer" onClick={onClick} />
          ) : (
            <EyeOn className="h-5 w-5 cursor-pointer" onClick={onClick} />
          )}
        </div>
      </>
    </div>
  );
};

export default PasswordFormField;

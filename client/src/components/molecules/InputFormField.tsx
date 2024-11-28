import { Input, Label } from "@/components/atoms";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type FormFieldProps<T extends FieldValues> = {
  className?: string;
  labelClassname?: string;
  htmlFor: string;
  text: string;
  type: "text" | "email" | "password" | "number" | "datetime-local" | "date";
  name: Path<T>;
  id: string;
  inputClassName?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<T>;
};

const FormField = <T extends FieldValues>({
  className,
  labelClassname,
  htmlFor,
  text,
  type,
  name,
  id,
  inputClassName,
  placeholder,
  register,
}: FormFieldProps<T>) => {
  return (
    <div
      className={`group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-1 duration-200 focus-within:ring focus-within:ring-sky-300/30 ${className}`}
    >
      <Label htmlFor={htmlFor} text={text} labelClassName={labelClassname} />
      <Input
        id={id}
        type={type}
        register={register(name)}
        placeholder={placeholder}
        inputClassName={inputClassName}
      />
    </div>
  );
};

export default FormField;

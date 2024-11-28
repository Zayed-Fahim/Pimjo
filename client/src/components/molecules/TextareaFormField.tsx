import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Label, Textarea } from "@/components/atoms";

type TextareaFormFieldProps<T extends FieldValues> = {
  className?: string;
  labelClassName?: string;
  htmlFor: string;
  text: string;
  name: Path<T>;
  id: string;
  textareaClassName?: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  register: UseFormRegister<T>;
};

const TextareaFormField = <T extends FieldValues>({
  className,
  labelClassName,
  htmlFor,
  text,
  name,
  id,
  textareaClassName,
  placeholder,
  rows = 3,
  register,
}: TextareaFormFieldProps<T>) => {
  return (
    <div
      className={`group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-1 duration-200 focus-within:ring focus-within:ring-sky-300/30 ${className}`}
    >
      <Label
        htmlFor={htmlFor}
        labelClassName={`${labelClassName}`}
        text={text}
      />

      <Textarea
        id={id}
        register={register(name)}
        placeholder={placeholder}
        rows={rows}
        textareaClassName={`block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground resize-none ${textareaClassName}`}
      />
    </div>
  );
};

export default TextareaFormField;

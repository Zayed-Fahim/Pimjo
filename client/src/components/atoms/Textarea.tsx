import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type TextareaProps = {
  id: string;
  placeholder?: string;
  textareaClassName?: string;
  register: UseFormRegisterReturn;
  rows?: number;
  cols?: number;
};

const Textarea = ({
  id,
  placeholder,
  textareaClassName,
  register,
  rows = 4,
  cols,
}: TextareaProps) => {
  return (
    <textarea
      id={id}
      {...register}
      placeholder={placeholder}
      rows={rows}
      cols={cols}
      className={`block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground ${textareaClassName}`}
    />
  );
};

export default Textarea;

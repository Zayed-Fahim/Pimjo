import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Label, Select } from "@/components/atoms";

type SelectOption = {
  value: string;
  label: string;
};

type SelectFormFieldProps<T extends FieldValues> = {
  className?: string;
  labelClassName?: string;
  htmlFor: string;
  text: string;
  name: Path<T>;
  id: string;
  selectClassName?: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  register: UseFormRegister<T>;
};

const SelectFormField = <T extends FieldValues>({
  className,
  labelClassName,
  htmlFor,
  text,
  name,
  id,
  selectClassName,
  placeholder,
  options,
  register,
}: SelectFormFieldProps<T>) => {
  return (
    <div
      className={`group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-1 duration-200 focus-within:ring focus-within:ring-sky-300/30 ${className}`}
    >
      <Label
        htmlFor={htmlFor}
        labelClassName={`${labelClassName}`}
        text={text}
      />
      <Select
        id={id}
        register={register(name)}
        placeholder={placeholder}
        selectClassName={`block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground ${selectClassName}`}
        options={options}
      />
    </div>
  );
};

export default SelectFormField;

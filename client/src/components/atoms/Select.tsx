import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type SelectOption = {
  value: string | number;
  label: string;
};

type SelectProps = {
  id: string;
  options: SelectOption[];
  placeholder?: string;
  selectClassName?: string;
  register: UseFormRegisterReturn;
};

const Select = ({
  id,
  options,
  placeholder = "Select an option",
  selectClassName,
  register,
}: SelectProps) => {
  return (
    <select
      id={id}
      {...register}
      defaultValue=""
      className={`block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground ${selectClassName}`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;

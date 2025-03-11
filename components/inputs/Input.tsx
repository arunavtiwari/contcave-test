import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { MdOutlineCurrencyRupee } from "react-icons/md";

type Props = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: ReturnType<UseFormRegister<FieldValues>>;
  errors: FieldErrors;
};

function Input({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required = true,
  errors,
}: Props) {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <MdOutlineCurrencyRupee
          size={24}
          className="
            text-neutral-700
            absolute
            top-2.5
            left-2
            border-r
            pr-1
            border-neutral-300
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register}
        placeholder={label}
        type={type}
        className={`peer w-full font-light bg-white border-2 rounded-full outline-none transition disabled:opacity-70 disabled:cursor-not-allowed py-2.5 ${formatPrice ? "pl-10" : "pl-4"
          } ${errors[id] ? "border-rose-500" : "border-neutral-300"} ${errors[id] ? "focus:border-rose-500" : "focus:border-black"
          }`}
      />
    </div>
  );
}

export default Input;

import { useState } from "react";
import type { InputHTMLAttributes } from "react";

interface CommonInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  hasError?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

const CommonInput = ({
  placeholder,
  value,
  onChange,
  type = "text",
  hasError = false,
  ...rest 
}: CommonInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = hasError
    ? "#FF0000"
    : isFocused
    ? "#6970F3"
    : "transparent";

  return (
    <div className="w-full py-[0.25rem]">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full p-[1rem] text-[0.875rem] font-suit font-normal bg-[#F3F3F3]
        placeholder:text-[#7F7F7F] placeholder:font-suit placeholder:font-normal
        border-[1px] rounded-[9px] outline-none`}
        style={{ borderColor }}
        {...rest}
      />
    </div>
  );
};

export default CommonInput;

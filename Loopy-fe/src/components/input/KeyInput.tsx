import { useState } from "react";

interface CommonInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  hasError?: boolean;
}

const KeyInput = ({
  placeholder,
  value,
  onChange,
  type = "text",
  hasError = false,
}: CommonInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const dynamicBorderColor = hasError
    ? "border-[#FF0000]"
    : isFocused
    ? "border-[#6970F3]"
    : "border-[#7F7F7F]";

  return (
    <div className="w-full rounded-[9px]">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full p-[1rem] text-[0.875rem] font-suit font-normal 
        placeholder:text-[#7F7F7F] placeholder:font-suit placeholder:font-normal
        border-[0.5px] rounded-[9px] outline-none ${dynamicBorderColor}`}
      />
    </div>
  );
};

export default KeyInput;

import { useState } from "react";

interface CommonInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  hasError?: boolean; 
}

const CommonInput = ({
  placeholder,
  value,
  onChange,
  type = "text",
  hasError = false,
}: CommonInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = hasError
    ? "border-[#FF0000]" 
    : isFocused
    ? "border-[#6970F3]" 
    : "border-none"; 

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
        border-[1px] rounded-[9px] outline-none ${borderColor}`}
      />
    </div>
  );
};

export default CommonInput;

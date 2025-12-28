import { useState } from "react";
import CommonInput from "../../../../../components/input/CommonInput";
import Eye from "../../../../../assets/images/Eye.svg?react";
import EyeOff from "../../../../../assets/images/EyeOff.svg?react";

interface Props {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
}

const PasswordInput = ({ value, placeholder, onChange, hasError }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <CommonInput
        placeholder={placeholder}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        hasError={hasError}
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute top-1/2 right-4 -translate-y-1/2"
      >
        {show ? (
          <Eye className="w-5 h-5 text-[#7F7F7F]" />
        ) : (
          <EyeOff className="w-5 h-5 text-[#7F7F7F]" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;

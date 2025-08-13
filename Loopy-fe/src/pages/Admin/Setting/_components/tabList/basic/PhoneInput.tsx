import { useState } from "react";
import CommonInput from "../../../../../../components/input/CommonInput";

interface PhoneInputProps {
  value: string; 
  onChange: (raw: string) => void;
}

const formatPhone = (input: string) => {
  const nums = input.replace(/\D/g, "").slice(0, 11);
  if (nums.length < 4) return nums;
  if (nums.length < 8) return `${nums.slice(0, 3)}-${nums.slice(3)}`;
  return `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7)}`;
};

const PhoneInput = ({ value, onChange }: PhoneInputProps) => {
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 11); 
    onChange(raw);
    setError(""); 
  };

  const handleBlur = () => {
    if (value.length > 0 && value.length !== 11) {
      setError("휴대폰 번호 11자리를 모두 입력해주세요.");
    } else {
      setError("");
    }
  };

  return (
    <div className="w-full">
      <CommonInput
        type="text"
        maxLength={13}
        placeholder="예) 010-1234-5678"
        value={formatPhone(value)}
        onChange={handleChange}
        onBlur={handleBlur}
        inputMode="numeric"
        hasError={!!error}
      />
      {error && (
        <div className="mt-1 text-xs text-[#FF0000]">{error}</div>
      )}
    </div>
  );
};

export default PhoneInput;

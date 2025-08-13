import CommonInput from "../../../../components/input/CommonInput";

interface PhoneInputProps {
  phone: string;
  onChange: (value: string) => void;
}

const PhoneInput = ({ phone, onChange }: PhoneInputProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
    let formatted = raw;

    if (raw.length >= 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7)}`;
    } else if (raw.length >= 4) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
    }

    onChange(formatted);
  };

  return (
    <CommonInput
      placeholder="전화번호를 입력해주세요"
      value={phone}
      onChange={handlePhoneChange}
    />
  );
};

export default PhoneInput;

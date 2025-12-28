import CommonInput from "../../../../../components/input/CommonInput";

interface EmailInputProps {
  email: string;
  onChange: (value: string, isValid: boolean) => void;
  disabled?: boolean;
}

const EmailInput = ({ email, onChange, disabled }: EmailInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    const isValid = value.includes("@");

    onChange(value, isValid);
  };

  return (
    <CommonInput
      placeholder="이메일을 입력해주세요"
      value={email}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default EmailInput;

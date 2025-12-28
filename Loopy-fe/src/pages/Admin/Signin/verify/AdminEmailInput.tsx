import CommonInput from "../../../../components/input/CommonInput";

interface AdminEmailInputProps {
  email: string;
  onChange: (value: string) => void;
}

const AdminEmailInput = ({ email, onChange }: AdminEmailInputProps) => {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    onChange(value);
  };

  return (
    <CommonInput
      placeholder="이메일을 입력해주세요"
      value={email}
      onChange={handleEmailChange}
    />
  );
};

export default AdminEmailInput;

import CommonInput from "../../../../../components/input/CommonInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const AdminNicknameInput = ({ value, onChange }: Props) => {
  return (
    <>
      <p className="text-[1rem] font-semibold text-[#252525] mt-[1.5rem] mb-[0.5rem]">
        닉네임
      </p>

      <CommonInput
        placeholder="닉네임을 입력해주세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};

export default AdminNicknameInput;

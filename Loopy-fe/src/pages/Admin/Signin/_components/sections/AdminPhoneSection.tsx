import PhoneInput from "../AdminPhoneInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const AdminPhoneSection = ({ value, onChange }: Props) => {
  return (
    <div className="mt-6">
      <p className="mb-2 text-sm font-medium text-[#222222]">
        대표자 전화번호
      </p>

      <PhoneInput
        phone={value}
        onChange={onChange}
      />
    </div>
  );
};

export default AdminPhoneSection;

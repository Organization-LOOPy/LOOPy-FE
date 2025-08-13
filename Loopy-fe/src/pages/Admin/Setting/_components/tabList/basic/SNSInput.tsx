import CommonInput from "../../../../../../components/input/CommonInput";

interface SNSInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SNSInput = ({ value, onChange }: SNSInputProps) => (
  <div className="mb-[8rem]">
    <div className="font-semibold text-[1rem] mb-2">SNS 링크</div>
    <CommonInput
      placeholder="http://www.instagram.com/cozyvillacoffee"
      value={value}
      onChange={onChange}
      type="url"
    />
  </div>
);

export default SNSInput;

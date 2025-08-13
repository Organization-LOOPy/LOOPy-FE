import CheckIcon from "../../../../../assets/images/Check.svg?react";

interface Props {
  lengthValid: boolean;
  comboValid: boolean;
}

const PasswordValidationHint = ({ lengthValid, comboValid }: Props) => {
  return (
    <div className="mt-2 flex flex-col gap-[0.25rem] text-[0.75rem] font-normal">
      <div className={`flex items-center gap-2 ${lengthValid ? "text-[#6970F3]" : "text-[#A8A8A8]"}`}>
        <CheckIcon className="w-3 h-2" />
        <span>공백없이 8자 ~ 20자</span>
      </div>
      <div className={`flex items-center gap-2 ${comboValid ? "text-[#6970F3]" : "text-[#A8A8A8]"}`}>
        <CheckIcon className="w-3 h-2" />
        <span>대소문자, 숫자, 특수문자 1개 이상 포함</span>
      </div>
    </div>
  );
};

export default PasswordValidationHint;

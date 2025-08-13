import CommonInput from "../../../../components/input/CommonInput";

interface VerifyCodeInputProps {
  value: string;
  onChange: (val: string) => void;
  hasError: boolean;
  onResend: () => void;
}

const VerifyCodeInput = ({
  value,
  onChange,
  hasError,
  onResend,
}: VerifyCodeInputProps) => {
  return (
    <>
      <div className="flex justify-between items-center mt-[1rem] mb-[0.5rem]">
        <p className="text-[1rem] font-semibold text-[#252525]">인증번호</p>
        <button
          className="text-[0.75rem] font-semibold text-[#252525]"
          onClick={onResend}
        >
          인증번호 재요청
        </button>
      </div>
      <CommonInput
        placeholder="인증번호를 입력해주세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        hasError={hasError}
      />
      {hasError && (
        <p className="text-[0.75rem] text-[#FF0000] mt-[0.625rem]">
          인증번호가 일치하지 않습니다
        </p>
      )}
    </>
  );
};

export default VerifyCodeInput;

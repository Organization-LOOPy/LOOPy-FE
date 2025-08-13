import CommonInput from "../../../../../components/input/CommonInput";
import CommonButton from "../../../../../components/button/CommonButton";
import { isEmailFormValid } from "../../../../../utils/validation";
import { usePasswordValidation } from "../../../../../hooks/usePasswordValidation";
import { useKeyboardOpen } from "../../../../../hooks/useKeyboardOpen";
import type { FormData } from "../../../../../types/form";
import PasswordInput from "./PasswordInput";
import PasswordValidationHint from "./PasswordHint";

interface StepEmailProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
}

const StepEmail = ({ formData, setFormData, onNext }: StepEmailProps) => {
  const isKeyboardOpen = useKeyboardOpen();
  const { lengthValid, comboValid, passwordMatch } = usePasswordValidation(
    formData.password,
    formData.confirmPassword
  );

  const isValid = isEmailFormValid(
    formData.email,
    formData.password,
    formData.confirmPassword,
    formData.nickname,
    lengthValid,
    comboValid
  );

  const handleClick = () => {
    if (!isValid) return;
    onNext();
  };

  return (
    <div>
      <p className="text-[1rem] font-semibold text-[#252525] mt-[1rem] mb-[0.5rem]">이메일</p>
      <CommonInput
        placeholder="이메일을 입력해주세요"
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
      />

      <p className="text-[1rem] font-semibold text-[#252525] mt-[1rem] mb-[0.5rem]">비밀번호</p>
      <PasswordInput
        placeholder="비밀번호를 입력해주세요"
        value={formData.password}
        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
      />
      <PasswordValidationHint lengthValid={lengthValid} comboValid={comboValid} />

      <p className="text-[1rem] font-semibold text-[#252525] mt-[1.25rem] mb-[0.5rem]">비밀번호 확인</p>
      <PasswordInput
        placeholder="한번 더 비밀번호를 입력해주세요"
        value={formData.confirmPassword}
        onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
        hasError={!passwordMatch && formData.confirmPassword !== ""}
      />
      {!passwordMatch && formData.confirmPassword && (
        <p className="text-[#FF0000] text-[0.75rem] font-normal">비밀번호가 일치하지 않습니다</p>
      )}

      <p className="text-[1rem] font-semibold text-[#252525] mt-[1rem] mb-[0.5rem]">닉네임</p>
      <CommonInput
        placeholder="닉네임을 입력해주세요"
        value={formData.nickname}
        onChange={(e) => setFormData((prev) => ({ ...prev, nickname: e.target.value }))}
      />

      <div
        className={`absolute left-0 w-full px-[1.5rem] transition-all duration-300 ${
          isKeyboardOpen ? "bottom-[4rem]" : "bottom-[2rem]"
        }`}
      >
        <CommonButton
          text="다음으로 넘어가기"
          onClick={handleClick}
          className={`w-full ${
            isValid ? "bg-[#6970F3] text-white" : "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
          }`}
          disabled={!isValid}
        />
      </div>
    </div>
  );
};

export default StepEmail;

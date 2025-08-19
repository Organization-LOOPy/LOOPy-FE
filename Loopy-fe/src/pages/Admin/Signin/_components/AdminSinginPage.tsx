import { useState } from "react";
import { usePasswordValidation } from "../../../../hooks/usePasswordValidation";
import { useKeyboardOpen } from "../../../../hooks/useKeyboardOpen";
import CommonButton from "../../../../components/button/CommonButton";
import AdminPasswordInput from "../_components/AdminPasswordInput";
import PasswordValidationHint from "../../../User/Signin/_components/StepSignin/PasswordHint";
import type { FormData } from "../../../../types/form";
import AgreementItem from "../../../User/Signin/_components/AgreementItem";
import type { AgreementKey } from "../../../../types/agreement";
import CommonHeader from "../../../../components/header/CommonHeader";
import CommonInput from "../../../../components/input/CommonInput";
import AdminAgreementDetailView from "./AdminAgreementDetailView";

interface AdminSigninPageProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onBack: () => void; 
}

const AdminSigninPage = ({ formData, setFormData, onNext, onBack }: AdminSigninPageProps) => {
  const isKeyboardOpen = useKeyboardOpen();
  const [agreementDetailKey, setAgreementDetailKey] = useState<AgreementKey | null>(null);

  const { email, password, confirmPassword, nickname, agreeTerms, agreePrivacy, agreelocation } = formData;
  const { lengthValid, comboValid, passwordMatch } = usePasswordValidation(password, confirmPassword);

  const isValid =
    !!email &&
    !!password &&
    !!nickname && 
    !!confirmPassword &&
    !!agreeTerms &&
    !!agreePrivacy &&
    !!agreelocation &&
    lengthValid &&
    comboValid &&
    passwordMatch;

  const handleSubmit = () => {
    if (!isValid) return;
    onNext();
  };

  if (agreementDetailKey) {
    return (
      <div className="min-h-screen w-full bg-white flex flex-col font-suit">
        <CommonHeader
          title="회원가입"
          onBack={() => setAgreementDetailKey(null)}
        />
        <AdminAgreementDetailView agreementKey={agreementDetailKey} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-suit">
      <CommonHeader title="회원가입" onBack={onBack} />
      <div className="flex flex-col items-center relative flex-1 mt-[1.5rem]">
        <div className="w-full max-w-[34rem] flex flex-col items-center justify-center">
          <div className="w-full flex flex-col mb-[1.5rem]">
            <p className="text-[1rem] font-semibold text-[#252525] mb-[0.75rem]">이메일</p>
            <div className="mb-[1.5rem]">
              <CommonInput
                placeholder="이메일을 입력해주세요"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <p className="text-[1rem] font-semibold text-[#252525] mb-[0.75rem]">비밀번호</p>
            <div className="mb-[1.5rem]">
              <AdminPasswordInput
                placeholder="비밀번호를 입력해주세요"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              />
              <PasswordValidationHint
                lengthValid={lengthValid}
                comboValid={comboValid}
              />
            </div>

            <p className="text-[1rem] font-semibold text-[#252525] mb-[0.75rem]">비밀번호 확인</p>
            <div className="mb-[1.5rem]">
              <AdminPasswordInput
                placeholder="한번 더 비밀번호를 입력해주세요"
                value={formData.confirmPassword}
                onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                hasError={formData.confirmPassword !== "" && !passwordMatch}
              />
              {!passwordMatch && formData.confirmPassword !== "" && (
                <p className="text-[#FF0000] text-[0.75rem] font-normal">비밀번호가 일치하지 않습니다</p>
              )}
            </div>

            <p className="text-[1rem] font-semibold text-[#252525] mb-[0.75rem]">닉네임</p>
            <div className="mb-[1.5rem]">
              <CommonInput
                placeholder="닉네임을 입력해주세요"
                value={formData.nickname}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    nickname: e.target.value,
                  }))
                }
              />
            </div>

            <div className="h-[0.5px] w-full bg-[#DFDFDF] mb-[0.75rem]" />
            <div className="flex flex-col mb-[2rem]">
              <div className="-mb-[0.5rem]">
                <AgreementItem
                  label="서비스 이용약관"
                  checked={!!formData.agreeTerms}
                  onClick={() => setFormData((prev) => ({ ...prev, agreeTerms: !prev.agreeTerms }))}
                  onArrowClick={() => setAgreementDetailKey("terms")}
                />
              </div>

              <div className="-my-[0.5rem]">
                <AgreementItem
                  label="개인정보 수집 및 이용 동의"
                  checked={!!formData.agreePrivacy}
                  onClick={() => setFormData((prev) => ({ ...prev, agreePrivacy: !prev.agreePrivacy }))}
                  onArrowClick={() => setAgreementDetailKey("privacy")}
                />
              </div>
              <div className="-mt-[0.5rem]">
                <AgreementItem
                  label="위치기반 서비스 이용약관 동의"
                  checked={!!formData.agreelocation}
                  onClick={() => setFormData((prev) => ({ ...prev, agreelocation: !prev.agreelocation }))}
                  onArrowClick={() => setAgreementDetailKey("location")}
                />
              </div>
            </div>
          </div>

          <div
            className={`absolute left-1/2 translate-x-[-50%] w-full max-w-[34rem] flex flex-col items-center transition-all duration-300 ${
              isKeyboardOpen ? "bottom-[4rem]" : "bottom-[2rem]"
            }`}
          >
            <CommonButton
              text="다음으로 넘어가기"
              onClick={handleSubmit}
              disabled={!isValid}
              className={`w-full ${
                isValid
                  ? "bg-[#6970F3] text-white"
                  : "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSigninPage;

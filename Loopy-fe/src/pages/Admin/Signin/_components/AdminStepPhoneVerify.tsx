import { useEffect } from "react";
import AdminPhoneInput from "./AdminPhoneInput";
import AdminVerifyCodeInput from "./AdminVerifyCodeInput";
import AdminSignupButton from "./AdminSignupButton.tsx";
import { useKeyboardOpen } from "../../../../hooks/useKeyboardOpen";
import { usePhoneVerification } from "../../../../hooks/usePhoneVerification";
import type { FormData } from "../../../../types/form";
import { mapFormDataToSignupRequest } from "../../../../utils/mapper.ts";
import CommonHeader from "../../../../components/header/CommonHeader";

interface AdminStepPhoneVerifyProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onBack: () => void;
}

const AdminStepPhoneVerify = ({
  formData,
  setFormData,
  onNext,
  onBack,
}: AdminStepPhoneVerifyProps) => {
  const isKeyboardOpen = useKeyboardOpen();

  const {
    isRequested,
    verifyError,
    isPhoneValid,
    requestCode,
    setVerifyError,
    isVerified,
    validateCode,
  } = usePhoneVerification(formData.phoneNumber, formData.verifyCode);

  useEffect(() => {
    if (formData.verifyCode.length === 6) {
      validateCode();
    }
  }, [formData.verifyCode, validateCode]);

  const handlePhoneChange = (phoneNumber: string) =>
    setFormData((prev) => ({ ...prev, phoneNumber }));

  const handleVerifyCodeChange = (code: string) => {
    setVerifyError(false);
    setFormData((prev) => ({ ...prev, verifyCode: code }));
  };

  const signupData = {
    ...mapFormDataToSignupRequest(formData),
    role: "CUSTOMER" as const,
  };

  return (
    <div className="relative min-h-screen w-full bg-white font-suit">
      <CommonHeader title="회원가입" onBack={onBack} />

      <div className="w-full max-w-[34rem] mx-auto pt-[1.5rem] flex flex-col justify-center font-suit">
        <p className="text-[1rem] font-semibold text-[#252525] mb-[0.5rem]">전화번호</p>
        <div className="flex gap-2 items-center">
          <div className="flex-[3]">
            <AdminPhoneInput
              phone={formData.phoneNumber}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="flex-[1]">
            <button
              className={`text-[0.875rem] font-semibold px-[1.5rem] py-[1rem] rounded-[9px] w-full ${
                isPhoneValid
                  ? "bg-[#6970F3] text-white"
                  : "bg-[#DFDFDF] text-[#7F7F7F] pointer-events-none"
              }`}
              onClick={requestCode}
            >
              인증번호 받기
            </button>
          </div>
        </div>

        {isRequested && (
          <AdminVerifyCodeInput
            value={formData.verifyCode}
            onChange={handleVerifyCodeChange}
            hasError={verifyError}
            onResend={requestCode}
          />
        )}
      </div>

      <div className="absolute left-0 w-full px-[1.5rem] transition-all duration-300 bottom-0">
        <div className="mx-auto w-full">
          <AdminSignupButton
            signupData={signupData}
            isFormValid={isVerified}
            isKeyboardOpen={isKeyboardOpen}
            onNext={onNext}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminStepPhoneVerify;

import PhoneInput from "../verify/PhoneInput";
import VerifyCodeInput from "../verify/VeryfyCodeInput";
import SignupButton from "../verify/SignupButton";
import { useKeyboardOpen } from "../../../../../hooks/useKeyboardOpen";
import { usePhoneVerification } from "../../../../../hooks/usePhoneVerification";
import { mapFormDataToSignupRequest } from "../../../../../utils/mapper";
import type { FormData } from "../../../../../types/form";
import { useEffect } from "react";

interface StepPhoneVerifyProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const StepPhoneVerify = ({ formData, setFormData }: StepPhoneVerifyProps) => {
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

  const handlePhoneChange = (phoneNumber: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber }));
  };

  const handleVerifyCodeChange = (code: string) => {
    setVerifyError(false);
    setFormData((prev) => ({ ...prev, verifyCode: code }));
  };

  const signupData = {
    ...mapFormDataToSignupRequest(formData),
    role: "CUSTOMER" as const,
  };

  return (
    <div className="pt-[1.5rem]">
      <p className="text-[1rem] font-semibold text-[#252525] mb-[0.5rem]">전화번호</p>
      <div className="flex gap-2">
        <div className="flex-1 w-full">
          <PhoneInput phoneNumber={formData.phoneNumber} onChange={handlePhoneChange} />
        </div>
        <div className="py-[0.25rem]">
          <button
            className={`text-[0.875rem] w-full font-semibold px-[1.5rem] py-[1rem] rounded-[9px] ${
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
        <VerifyCodeInput
          value={formData.verifyCode}
          onChange={handleVerifyCodeChange}
          hasError={verifyError}
          onResend={requestCode}
        />
      )}

      <SignupButton
        signupData={signupData}
        isFormValid={isVerified} 
        isKeyboardOpen={isKeyboardOpen}
      />
    </div>
  );
};

export default StepPhoneVerify;

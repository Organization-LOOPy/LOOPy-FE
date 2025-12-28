import VerifyCodeInput from "../verify/VeryfyCodeInput";
import SignupButton from "../verify/SignupButton";
import EmailInput from "../verify/EmailInput";
import { useKeyboardOpen } from "../../../../../hooks/useKeyboardOpen";
import { useEmailVerification } from "../../../../../hooks/mutation/signin/useEmailVerification";
import { mapFormDataToSignupRequest } from "../../../../../utils/mapper";
import type { FormData } from "../../../../../types/form";
import { useEffect } from "react";

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const StepEmailVerify = ({ formData, setFormData }: Props) => {
  const isKeyboardOpen = useKeyboardOpen();

  const {
    isRequested, isVerified, verifyError,
    setVerifyError, sendCode, validateCode, 
  } = useEmailVerification(formData.email, formData.verifyCode);

  useEffect(() => {
    if (formData.verifyCode.length === 6) {
      validateCode();
    }
  }, [formData.verifyCode, validateCode]);

  const handleEmailChange = (value: string) => {
    setFormData((prev) => ({ ...prev, email: value }));
  };

  const handleVerifyCodeChange = (code: string) => {
    setVerifyError(false); 
    setFormData((prev) => ({ ...prev, verifyCode: code }));
  };

  const signupData = {
    ...mapFormDataToSignupRequest(formData),
    role: "CUSTOMER" as const,
  };

  const isEmailValid =
    formData.email.includes("@") &&
    !formData.email.startsWith("@") &&
    !formData.email.endsWith("@");

  return (
    <div className="pt-[1.5rem]">
      <p className="text-[1rem] font-semibold text-[#252525] mb-[0.5rem]">
        이메일
      </p>

      <div className="flex gap-2">
        <div className="flex-1 w-full">
          <EmailInput
            email={formData.email}
            onChange={handleEmailChange}
          />
        </div>

        <div className="py-[0.25rem]">
          <button
            onClick={sendCode}
            disabled={!isEmailValid}
            className={`text-[0.875rem] w-full font-semibold px-[1.5rem] py-[1rem] rounded-[9px] ${
              isEmailValid
                ? "bg-[#6970F3] text-white"
                : "bg-[#DFDFDF] text-[#7F7F7F]"
            }`}
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
          onResend={sendCode}
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

export default StepEmailVerify;

import { useEffect } from "react";
import { useEmailVerification } from "../../../../../hooks/mutation/signin/useEmailVerification";
import AdminEmailInput from "../../verify/AdminEmailInput";
import AdminVerifyCodeInput from "../AdminVerifyCodeInput";
import type { FormData } from "../../../../../types/form";

interface Props {
  email: string;
  verifyCode: string;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onVerified: (verified: boolean) => void;
}

const AdminEmailVerifySection = ({
  email,
  verifyCode,
  setFormData,
  onVerified,
}: Props) => {
  const {
    isRequested,
    isVerified,
    verifyError,
    setVerifyError,
    sendCode,
    validateCode,
  } = useEmailVerification(email, verifyCode);

  useEffect(() => {
    if (verifyCode.length === 6) {
      validateCode();
    }
  }, [verifyCode, validateCode]);

  useEffect(() => {
    onVerified(isVerified);
  }, [isVerified, onVerified]);

  const isEmailValid =
    email.includes("@") &&
    !email.startsWith("@") &&
    !email.endsWith("@");

  return (
    <>
      <p className="text-[1rem] font-semibold text-[#252525] mb-[0.5rem]">
        이메일
      </p>

      <div className="flex items-center gap-2 mb-[1.25rem]">
        <div className="flex-1">
          <AdminEmailInput
            email={email}
            onChange={(email) =>
              setFormData((prev) => ({ ...prev, email }))
            }
          />
        </div>

        <button
          onClick={sendCode}
          disabled={!isEmailValid || isVerified}
          className={`text-[0.875rem] font-semibold px-[1.5rem] h-[3.25rem] rounded-[9px] ${
            isEmailValid && !isVerified
              ? "bg-[#6970F3] text-white"
              : "bg-[#DFDFDF] text-[#7F7F7F]"
          }`}
        >
          {isVerified ? "인증 완료" : "인증번호 받기"}
        </button>
      </div>

      {isRequested && !isVerified && (
        <AdminVerifyCodeInput
          value={verifyCode}
          onChange={(code) => {
            setVerifyError(false);
            setFormData((prev) => ({ ...prev, verifyCode: code }));
          }}
          hasError={verifyError}
          onResend={sendCode}
        />
      )}
    </>
  );
};

export default AdminEmailVerifySection;

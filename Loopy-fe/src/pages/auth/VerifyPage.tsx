import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../components/header/CommonHeader";
import EmailInput from "../User/Signin/_components/verify/EmailInput";
import VerifyCodeInput from "../Admin/Signin/_components/AdminVerifyCodeInput";
import { useEmailVerification } from "../../hooks/mutation/signin/useEmailVerification";
import { useKeyboardOpen } from "../../hooks/useKeyboardOpen";
import CommonButton from "../../components/button/CommonButton";

const VerifyPage = () => {
  const navigate = useNavigate();
  const isKeyboardOpen = useKeyboardOpen();

  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const {
    isRequested,
    verifyError,
    sendCode,
    setVerifyError,
    isVerified,
    validateCode,
  } = useEmailVerification(email, verifyCode);

  useEffect(() => {
    if (verifyCode.length === 6) {
      validateCode();
    }
  }, [verifyCode, validateCode]);

  const handleBack = () => navigate(-1);

  const isEmailValid =
    email.includes("@") &&
    !email.startsWith("@") &&
    !email.endsWith("@");

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <CommonHeader title="이메일 인증" onBack={handleBack} />

      <main className="flex-1 pt-6">
        <p className="text-[1rem] font-semibold text-[#252525] mb-2">
          이메일
        </p>

        <div className="flex gap-2 items-center justify-center">
          <div className="flex-1">
            <EmailInput email={email} onChange={setEmail} />
          </div>

          <button
            disabled={!isEmailValid}
            onClick={sendCode}
            className={`text-[0.875rem] font-semibold px-4 h-[3.375rem] py-2 rounded-[9px] ${
              isEmailValid
                ? "bg-[#6970F3] text-white"
                : "bg-[#DFDFDF] text-[#7F7F7F]"
            }`}
          >
            인증번호 받기
          </button>
        </div>

        {isRequested && (
          <div className="mt-4">
            <VerifyCodeInput
              value={verifyCode}
              onChange={(code) => {
                setVerifyError(false);
                setVerifyCode(code);
              }}
              hasError={verifyError}
              onResend={sendCode}
            />
          </div>
        )}
      </main>

      <div
        className={`absolute left-0 w-full px-[1.5rem] transition-all duration-300 ${
          isKeyboardOpen ? "bottom-[4rem]" : "bottom-[2rem]"
        }`}
      >
        <CommonButton
          text="이메일 인증 완료"
          onClick={() => navigate("/home", { replace: true })}
          className={`w-full ${
            isVerified
              ? "bg-[#6970F3] text-white"
              : "bg-[#CCCCCC] text-[#7F7F7F]"
          }`}
          disabled={!isVerified}
        />
      </div>
    </div>
  );
};

export default VerifyPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../components/header/CommonHeader";
import PhoneInput from "../Admin/Signin/_components/AdminPhoneInput";
import VerifyCodeInput from "../Admin/Signin/_components/AdminVerifyCodeInput";
import { usePhoneVerification } from "../../hooks/usePhoneVerification";
import { useNotifyPhoneVerified } from "../../hooks/mutation/verify/useNotifyPhoneVerified";
import { useKeyboardOpen } from "../../hooks/useKeyboardOpen";
import CommonButton from "../../components/button/CommonButton";

const VerifyPage = () => {
  const navigate = useNavigate();
  const isKeyboardOpen = useKeyboardOpen();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const {
    isRequested,
    verifyError,
    isPhoneValid,
    requestCode,
    setVerifyError,
    isVerified,
    validateCode,
  } = usePhoneVerification(phoneNumber, verifyCode);

  const { mutate: notifyPhoneVerified, isPending } = useNotifyPhoneVerified(
    () => navigate("/onboarding", { replace: true }),
    (err) => {
      console.error("전화번호 인증 완료 통보 실패", err);
    }
  );

  useEffect(() => {
    if (verifyCode.length === 6) {
      validateCode();
    }
  }, [verifyCode, validateCode]);

  const handleBack = () => navigate(-1);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <CommonHeader title="전화번호 인증" onBack={handleBack} />

      <main className="flex-1 pt-6">
        <p className="text-[1rem] font-semibold text-[#252525] mb-2">전화번호</p>
        <div className="flex gap-2 items-center justify-center">
          <div className="flex-1">
            <PhoneInput phone={phoneNumber} onChange={setPhoneNumber} />
          </div>
          <button
            className={`text-[0.875rem] font-semibold px-4 h-[3.375rem] py-2 rounded-[9px] ${
              isPhoneValid
                ? "bg-[#6970F3] text-white"
                : "bg-[#DFDFDF] text-[#7F7F7F] pointer-events-none"
            }`}
            onClick={requestCode}
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
              onResend={requestCode}
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
          text="전화번호 인증 완료"
          onClick={() => notifyPhoneVerified({ phoneNumber })}
          className={`w-full ${
          isVerified ? "bg-[#6970F3] text-white" : "bg-[#CCCCCC] text-[#7F7F7F]"
          }`}
          disabled={!isVerified || isPending}
        />
      </div>
    </div>
  );
};

export default VerifyPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../components/header/CommonHeader";
import PhoneInput from "../Admin/Signin/_components/AdminPhoneInput";
import VerifyCodeInput from "../Admin/Signin/_components/AdminVerifyCodeInput";
import { usePhoneVerification } from "../../hooks/usePhoneVerification";
import { useSavePhone } from "../../hooks/mutation/verify/useSavePhone";
import { useKeyboardOpen } from "../../hooks/useKeyboardOpen";
import CommonButton from "../../components/button/CommonButton";
import { useQueryClient } from "@tanstack/react-query";

const VerifyPage = () => {
  const navigate = useNavigate();
  const isKeyboardOpen = useKeyboardOpen();

  const [phoneNumber, setPhoneNumber] = useState("");
  
  const [verifyCode, setVerifyCode] = useState("");

  const {
    isRequested,
    verifyError,
    isPhoneValid,
    sendCode,
    cooldown,
    setVerifyError,
    isVerified,
    validateCode,
  } = usePhoneVerification(phoneNumber, verifyCode);

  const queryClient = useQueryClient();

  const { mutateAsync: savePhone } = useSavePhone();

  const handleSavePhone = async () => {
    try {
      await savePhone({ phoneNumber: normalizePhone(phoneNumber) }); 
      await queryClient.invalidateQueries({ queryKey: ["isDummyPhone"] }); 
      localStorage.setItem("phoneVerified", "true");
      navigate("/home", { replace: true });
    } catch (err) {
      console.error("전화번호 저장 실패", err);
    }
  };

  useEffect(() => {
    if (verifyCode.length === 6) {
      validateCode();
    }
  }, [verifyCode, validateCode]);

  const handleBack = () => navigate(-1);

  const normalizePhone = (num: string) => {
    if (num.startsWith("+82")) {
      return "0" + num.slice(3);
    }
    return num;
  };

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
            disabled={!isPhoneValid || cooldown > 0}
            onClick={sendCode}
            className={`text-[0.875rem] font-semibold px-4 h-[3.375rem] py-2 rounded-[9px] ${
              isPhoneValid && cooldown === 0
                ? "bg-[#6970F3] text-white"
                : "bg-[#DFDFDF] text-[#7F7F7F]"
            }`}
          >
            {cooldown > 0 ? `재전송 (${cooldown}s)` : "인증번호 받기"}
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
              cooldown={cooldown}
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
          onClick={handleSavePhone}
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

import { useState } from "react";

/**
 * 임시 이메일 인증 훅
 * - email: 인증 요청용
 * - verifyCode: 사용자가 입력한 코드
 */
export const useEmailVerification = (
  email: string,
  verifyCode: string
) => {
  // ===== 상태 =====
  const [isRequested, setIsRequested] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyError, setVerifyError] = useState(false); 
  const [serverCode, setServerCode] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ===== 임시 API =====
  const requestEmailVerifyCode = async (email: string): Promise<number> => {
    console.log("📨 이메일 인증 요청:", email);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(123456); // 임시 인증번호
      }, 500);
    });
  };

  // ===== 인증번호 요청 =====
  const sendCode = async () => {
    if (!email) return;

    setIsLoading(true);

    const code = await requestEmailVerifyCode(email);
    setServerCode(code);

    setIsRequested(true);
    setIsVerified(false);
    setVerifyError(false); 

    setIsLoading(false);
  };

  // ===== 인증번호 검증 =====
  const validateCode = () => {
    if (!serverCode) return;

    if (Number(verifyCode) === serverCode) {
      setIsVerified(true);
      setVerifyError(false);
    } else {
      setIsVerified(false);
      setVerifyError(true);
    }
  };

  return {
    isRequested,
    isVerified,
    verifyError,
    isLoading,

    sendCode,
    validateCode,
    setVerifyError, 
  };
};

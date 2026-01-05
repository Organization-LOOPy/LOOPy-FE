import { useCallback, useState } from "react";
import { requestEmailVerification, verifyEmailCode } from "../../../apis/auth/verifyEmail/api";

export const useEmailVerification = (email: string, code: string) => {
  const [isRequested, setIsRequested] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyError, setVerifyError] = useState(false);

  /** 인증번호 요청 */
  const sendCode = useCallback(async () => {
    if (!email) return;

    try {
      await requestEmailVerification({ email });
      setIsRequested(true);
      setVerifyError(false);
    } catch {
      setVerifyError(true);
    }
  }, [email]);

  /** 인증번호 검증 */
  const validateCode = useCallback(async () => {
    if (code.length !== 6) return;

    try {
      const res = await verifyEmailCode({ email, code });
      if (res.success) {
        setIsVerified(true);
        setVerifyError(false);
      } else {
        setVerifyError(true);
        setIsVerified(false);
      }
    } catch {
      setVerifyError(true);
      setIsVerified(false);
    }
  }, [email, code]);

  return {
    isRequested,
    isVerified,
    verifyError,
    setVerifyError,
    sendCode,
    validateCode,
  };
};

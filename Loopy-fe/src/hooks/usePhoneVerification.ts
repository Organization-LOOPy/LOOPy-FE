import { useCallback, useMemo, useRef, useState } from "react";
import { auth } from "../firebase/firebase-config";
import { signInWithPhoneNumber } from "firebase/auth";
import debounce from "lodash.debounce";
import { initializeRecaptcha } from "../firebase/initRecaptcha";

declare global {
  interface Window {
    recaptchaVerifier?: any; 
  }
}

export const usePhoneVerification = (
  phone: string,
  verifyCode: string
) => {
  const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
  const codeRegex = /^\d{4,6}$/;

  const [isRequested, setIsRequested] = useState(false);
  const [verifyError, setVerifyError] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  const [isVerified, setIsVerified] = useState(false);

  const isPhoneValid = useMemo(() => phoneRegex.test(phone.trim()), [phone]);
  const isCodeValid = useMemo(
    () => codeRegex.test(verifyCode.trim()) && !verifyError,
    [verifyCode, verifyError]
  );

  const isRequestingRef = useRef(false);
  const phoneRef = useRef(phone);
  phoneRef.current = phone;

  const sendCode = useCallback(async () => {
    const currentPhone = phoneRef.current;

    if (!phoneRegex.test(currentPhone.trim()) || isRequestingRef.current) return;
    isRequestingRef.current = true;

    const formatted = "+82" + currentPhone.replace(/-/g, "").slice(1);

    try {
      await initializeRecaptcha(); 

      const token = await window.recaptchaVerifier!.verify();
      console.log("reCAPTCHA 토큰:", token);

      const result = await signInWithPhoneNumber(
        auth,
        formatted,
        window.recaptchaVerifier!
      );

      setConfirmationResult(result);
      setIsRequested(true);
    } catch (err) {
      console.error("Firebase 인증 요청 실패:", err);
      alert("인증번호 전송 실패");
    } finally {
      isRequestingRef.current = false;
    }
  }, []);

  const requestCode = useCallback(debounce(() => {
    sendCode();
  }, 1000), [sendCode]);

  const validateCode = useCallback(async () => {
    try {
      const result = await confirmationResult.confirm(verifyCode);
      setVerifyError(false);
      setFirebaseUser(result.user);
      setIsVerified(true); 
      return true;
    } catch (error) {
      setVerifyError(true);
      setIsVerified(false); 
      return false;
    }
  }, [confirmationResult, verifyCode]);

  return {
    isRequested,
    verifyError,
    isPhoneValid,
    isCodeValid,
    requestCode,
    validateCode,
    setVerifyError,
    setIsRequested,
    firebaseUser,
    isVerified,
  };
};

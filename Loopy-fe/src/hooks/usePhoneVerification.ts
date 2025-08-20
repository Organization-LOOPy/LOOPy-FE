import { useCallback, useMemo, useRef, useState } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { ensureRecaptcha, resetRecaptcha } from "../firebase/initRecaptcha";

export const usePhoneVerification = (phone: string, verifyCode: string) => {
  const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
  const codeRegex = /^\d{4,6}$/;

  const [isRequested, setIsRequested] = useState(false);
  const [verifyError, setVerifyError] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const backoffRef = useRef(30);

  const startCooldown = useCallback(() => {
    let remain = backoffRef.current;
    setCooldown(remain);

    const interval = setInterval(() => {
      remain -= 1;
      setCooldown(remain);
      if (remain <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    backoffRef.current = Math.min(backoffRef.current * 2, 300);
  }, []);

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
    if (!isPhoneValid || isRequestingRef.current || cooldown > 0) return;

    isRequestingRef.current = true;
    const formatted = "+82" + currentPhone.replace(/-/g, "").slice(1);

    try {
      const verifier = ensureRecaptcha(); 
      const result = await signInWithPhoneNumber(auth, formatted, verifier);
      setConfirmationResult(result);
      setIsRequested(true);
      setVerifyError(false);
      backoffRef.current = 30; 
    } catch (err: any) {
      const code = String(err?.code || "");
      const msg = String(err?.message || "");
      console.error("phone signIn failed:", code, msg, err);

      if (
        code.includes("auth/too-many-requests") ||
        msg.includes("TOO_MANY_ATTEMPTS_TRY_LATER") ||
        code.includes("auth/quota-exceeded")
      ) {
        await resetRecaptcha();
        startCooldown();
      } else {
        await resetRecaptcha();
      }
    } finally {
      isRequestingRef.current = false;
    }
  }, [cooldown, isPhoneValid, startCooldown]);

  const validateCode = useCallback(async () => {
    if (!confirmationResult) return false;
    try {
      const result = await confirmationResult.confirm(verifyCode);
      setVerifyError(false);
      setFirebaseUser(result.user);
      setIsVerified(true);
      return true;
    } catch (error: any) {
      setVerifyError(true);
      setIsVerified(false);
      await resetRecaptcha();
      return false;
    }
  }, [confirmationResult, verifyCode]);

  return {
    isRequested,
    verifyError,
    isPhoneValid,
    isCodeValid,
    sendCode,  
    validateCode,
    setVerifyError,
    setIsRequested,
    firebaseUser,
    isVerified,
    cooldown,
  };
};

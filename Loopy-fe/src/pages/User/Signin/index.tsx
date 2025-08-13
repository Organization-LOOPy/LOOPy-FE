import { useNavigate } from "react-router-dom";
import { useFunnel } from "../../../hooks/Funnel/useFunnel";
import type { SignupStep } from "../../../types/signupSteps.ts";
import StepEmail from "./_components/StepSignin/StepEmail";
import StepVerify from "./_components/StepSignin/StepVerify";
import AgreementPage from "./_components/AgreementPage";
import CommonHeader from "../../../components/header/CommonHeader";
import { useState } from "react";
import type { FormData } from "../../../types/form.ts";

const SignupPage = () => {
  const navigate = useNavigate();
  const { step, go, back } = useFunnel<SignupStep>("agreement");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phoneNumber: "",
    verifyCode: "",
    role: "CUSTOMER",
    allowKakaoAlert: false,
    agreeTerms: false,
    agreePrivacy: false,
    agreemarketing: false,
    agreelocation: false,
  });

  const goToHome = () => navigate("/");

  return (
    <div>
      {step !== "agreement" && (
        <CommonHeader title="회원가입" onBack={back("agreement")} />
      )}

      {step === "agreement" && (
        <AgreementPage
          formData={formData}
          setFormData={setFormData}
          onNext={() => go("email")}
          onBack={goToHome}
        />
      )}
      {step === "email" && (
        <StepEmail
          formData={formData}
          setFormData={setFormData}
          onNext={() => go("verify")}
        />
      )}
      {step === "verify" && (
        <StepVerify
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default SignupPage;

import { useNavigate } from "react-router-dom";
import { useFunnel } from "../../../hooks/Funnel/useFunnel";
import type { SignupStep } from "../../../types/signupSteps";
import AgreementPage from "./_components/AgreementPage";
import StepBasicInfo from "./_components/StepSignup/StepBasicInfo";
import StepPhoneInput from "./_components/StepSignup/StepPhoneInput";
import StepEmailVerify from "./_components/StepSignup/StepEmailVerify";
import CommonHeader from "../../../components/header/CommonHeader";
import { useState } from "react";
import type { FormData } from "../../../types/form";

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

  return (
    <div>
      {step !== "agreement" && (
        <CommonHeader title="회원가입" onBack={back("agreement")} />
      )}

      {step === "agreement" && (
        <AgreementPage
          formData={formData}
          setFormData={setFormData}
          onNext={() => go("basic")}
          onBack={() => navigate("/")}
        />
      )}

      {step === "basic" && (
        <StepBasicInfo
          formData={formData}
          setFormData={setFormData}
          onNext={() => go("phone")}
        />
      )}

      {step === "phone" && (
        <StepPhoneInput
          formData={formData}
          setFormData={setFormData}
          onNext={() => go("emailVerify")}
        />
      )}

      {step === "emailVerify" && (
        <StepEmailVerify
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default SignupPage;

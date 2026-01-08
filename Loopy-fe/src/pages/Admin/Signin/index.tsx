import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSigninPage from "./_components/AdminSinginPage";
import AdminSignupSuccess from "./_components/AdminSignupSuccess";
import type { FormData } from "../../../types/form";
import { useSignup } from "../../../hooks/mutation/signin/useSignup";
import type { SignupRequest } from "../../../apis/auth/signin/type";
import AdminProfilePage from "./_components/AdminProfilePage";

const AdminSigninPageIndex = () => {
  const [step, setStep] = useState<"account" | "profile" | "success">("account");
  const navigate = useNavigate();
  const { mutate: signupMutate } = useSignup();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phoneNumber: "",
    allowKakaoAlert: true,
    verifyCode: "",
    agreeTerms: false,
    agreePrivacy: false,
    agreemarketing: true,
    agreelocation: false,
    role: "OWNER",
  });

  const handleSignup = () => {
    const payload: SignupRequest = {
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      phoneNumber: formData.phoneNumber,
      role: formData.role,
      allowKakaoAlert: formData.allowKakaoAlert,
      agreements: {
        termsAgreed: formData.agreeTerms,
        privacyPolicyAgreed: formData.agreePrivacy,
        marketingAgreed: formData.agreemarketing,
        locationPermission: formData.agreelocation,
      },
    };

    signupMutate(payload, {
      onSuccess: () => setStep("success"),
      onError: (err) => console.error("회원가입 실패:", err),
    });
  };

  return (
    <div className="w-full min-h-screen bg-white flex justify-center">
      {step === "account" && (
        <AdminSigninPage
          formData={formData}
          setFormData={setFormData}
          onNext={() => setStep("profile")}
          onBack={() => navigate("/admin")}
        />
      )}

      {step === "profile" && (
        <AdminProfilePage
          formData={formData}
          setFormData={setFormData}
          onNext={handleSignup}
          onBack={() => setStep("account")}
        />
      )}

      {step === "success" && <AdminSignupSuccess />}
    </div>
  );
};

export default AdminSigninPageIndex;
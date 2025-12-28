import { useState } from "react";
import AdminSigninPage from "./_components/AdminSinginPage";
import AdminSignupSuccess from "./_components/AdminSignupSuccess.tsx";
import type { FormData } from "../../../types/form";
import { useNavigate } from "react-router-dom";

const AdminSigninPageIndex = () => {
  const [step, setStep] = useState<"account" | "email" | "success">("account");
  const navigate = useNavigate();

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

  const handleSignupSuccess = () => setStep("success");

  return (
    <div className="w-full min-h-screen bg-white flex justify-center">
      {step === "account" && (
        <AdminSigninPage
          formData={formData}
          setFormData={setFormData}
          onNext={handleSignupSuccess}
          onBack={() => navigate("/admin")}
        />
      )}

      {step === "success" && <AdminSignupSuccess />}
    </div>
  );
};

export default AdminSigninPageIndex;

import { useState } from "react";
import { useKeyboardOpen } from "../../../../hooks/useKeyboardOpen";
import CommonButton from "../../../../components/button/CommonButton";
import CommonHeader from "../../../../components/header/CommonHeader";
import AdminAgreementDetailView from "./AdminAgreementDetailView";
import AdminEmailVerifySection from "./sections/AdminEmailVerifySection";
import AdminPasswordSection from "./sections/AdminPasswordSection";
import AdminAgreementSection from "./sections/AdminAgreementSection";
import type { FormData } from "../../../../types/form";
import type { AgreementKey } from "../../../../types/agreement";

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onBack: () => void;
}

const AGREEMENT_TITLE_MAP: Record<AgreementKey, string> = {
  terms: "서비스 이용 약관",
  privacy: "개인정보 수집 및 이용 동의",
  location: "위치기반 서비스 이용약관 동의",
  marketing: "마케팅 정보 수신 동의",
};

const AdminSigninPage = ({ formData, setFormData, onNext, onBack }: Props) => {
  const isKeyboardOpen = useKeyboardOpen();
  const [agreementDetailKey, setAgreementDetailKey] =
    useState<AgreementKey | null>(null);

  const [emailVerified, setEmailVerified] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const isValid =
    emailVerified &&
    passwordValid &&
    formData.agreeTerms &&
    formData.agreePrivacy &&
    formData.agreelocation;

  if (agreementDetailKey) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <CommonHeader
          title={AGREEMENT_TITLE_MAP[agreementDetailKey]}
          onBack={() => setAgreementDetailKey(null)}
        />
        <AdminAgreementDetailView agreementKey={agreementDetailKey} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-suit">
      <CommonHeader title="회원가입" onBack={onBack} />

      <div className="flex-1 pt-[1.5rem] pb-[8rem] max-w-[34rem] mx-auto w-full">
        <AdminEmailVerifySection
          email={formData.email}
          verifyCode={formData.verifyCode}
          setFormData={setFormData}
          onVerified={setEmailVerified}
        />

        <AdminPasswordSection
          password={formData.password}
          confirmPassword={formData.confirmPassword}
          setFormData={setFormData}
          onValidityChange={setPasswordValid}
        />

        <AdminAgreementSection
          agreeTerms={formData.agreeTerms}
          agreePrivacy={formData.agreePrivacy}
          agreelocation={formData.agreelocation}
          onToggle={(key) =>
            setFormData((p) => ({ ...p, [key]: !p[key] }))
          }
          onOpenDetail={setAgreementDetailKey}
        />
      </div>

      <div
        className={`absolute left-1/2 translate-x-[-50%] w-full max-w-[34rem] flex flex-col items-center transition-all duration-300 ${
          isKeyboardOpen ? "bottom-[4rem]" : "bottom-[2rem]"
        }`}
      >
        <CommonButton
          text="다음으로 넘어가기"
          onClick={onNext}
          disabled={!isValid}
          className={`w-full ${
            isValid
              ? "bg-[#6970F3] text-white"
              : "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
          }`}
        />
      </div>
    </div>
  );
};

export default AdminSigninPage;

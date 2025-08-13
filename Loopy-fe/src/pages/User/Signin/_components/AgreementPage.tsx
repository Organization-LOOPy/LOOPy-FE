import { useState } from "react";
import CommonHeader from "../../../../components/header/CommonHeader";
import AgreementListView from "./AgreementListView";
import UserAgreementDetailView from "./UserAgreementDetailView";
import type { AgreementKey } from "../../../../types/agreement";
import type { FormData } from "../../../../types/form";

interface AgreementPageProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onBack: () => void;
}

const AgreementPage = ({ formData, setFormData, onNext, onBack }: AgreementPageProps) => {
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedAgreementKey, setSelectedAgreementKey] = useState<AgreementKey | null>(null);

  const agreements = {
    terms: formData.agreeTerms,
    privacy: formData.agreePrivacy,
    location: formData.agreelocation,
    marketing: formData.agreemarketing,
  };

  const isAllRequiredChecked =
    agreements.terms && agreements.privacy && agreements.location;

  const agreementKeyToFormKey = (key: AgreementKey): keyof FormData => {
    switch (key) {
      case "terms":
        return "agreeTerms";
      case "privacy":
        return "agreePrivacy";
      case "location":
        return "agreelocation";
      case "marketing":
        return "agreemarketing";
    }
  };

  const handleToggle = (key: AgreementKey) => {
    const formKey = agreementKeyToFormKey(key);
    setFormData(prev => ({
      ...prev,
      [formKey]: !prev[formKey],
    }));
  };

  const handleToggleAll = () => {
    const allChecked = Object.values(agreements).every(Boolean);
    const next = !allChecked;

    setFormData(prev => ({
      ...prev,
      agreeTerms: next,
      agreePrivacy: next,
      agreelocation: next,
      agreemarketing: next,
    }));
  };

  const handleShowDetail = (key: AgreementKey) => {
    setSelectedAgreementKey(key);
    setView("detail");
  };

  const handleBackToList = () => {
    setSelectedAgreementKey(null);
    setView("list");
  };

  const getTitle = (key: AgreementKey) => {
    switch (key) {
      case "terms":
        return "서비스 이용 약관";
      case "privacy":
        return "개인정보 수집 및 이용 동의";
      case "location":
        return "위치기반 서비스 이용약관 동의";
      case "marketing":
        return "마케팅 정보 활용 동의";
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col font-suit">
      {view === "list" && (
        <>
          <CommonHeader title="서비스 이용 동의" onBack={onBack} />
          <AgreementListView
            agreements={agreements}
            onToggle={handleToggle}
            onToggleAll={handleToggleAll}
            onShowDetail={handleShowDetail}
            isAllRequiredChecked={isAllRequiredChecked}
            onNext={onNext}
          />
        </>
      )}

      {view === "detail" && selectedAgreementKey && (
        <>
          <CommonHeader
            title={getTitle(selectedAgreementKey)}
            onBack={handleBackToList}
          />
          <UserAgreementDetailView agreementKey={selectedAgreementKey} />
        </>
      )}
    </div>
  );
};

export default AgreementPage;

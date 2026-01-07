import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CommonHeader from "../../../components/header/CommonHeader";
import StepProgress from "./_components/StepProgress";
import Step1DocumentGuide from "./_steps/Step1DocumentGuide";
import Step2BasicInfo from "./_steps/Step2BasicInfo";
import Step3BusinessInfo from "./_steps/Step3BusinessInfo";
import Step4Menu from "./_steps/Step4Menu";
import Step5Stamp from "./_steps/Step5Stamp";
import AdminRegisterContentLayout from "../../../layouts/AdminRegisterContetntLayout";
import { fetchAdminCafe } from "../../../apis/admin/cafeStatus/api";

const stepLabels = [
  "필요 서류 안내",
  "기본정보 입력",
  "운영정보 입력",
  "메뉴 등록",
  "스탬프 등록",
];
const LAST_STEP_INDEX = stepLabels.length - 1;

export default function AdminRegisterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [hasCafe, setHasCafe] = useState<boolean | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const checkCafe = async () => {
      try {
        const info = await fetchAdminCafe();
        setHasCafe(!!info.data?.cafeId);
      } catch {
        setHasCafe(false);
      }
    };

    checkCafe();
  }, []);

  const stepFromParams = useMemo(() => {
    const raw = searchParams.get("step");
    const n = Number(raw);

    let s = Number.isFinite(n) ? n : 0;
    if (s < 0) s = 0;
    if (s > LAST_STEP_INDEX) s = LAST_STEP_INDEX;

    // 이미 카페가 있으면 step 0 접근 X
    if (hasCafe && s === 0) {
      return 1;
    }

    return s;
  }, [searchParams, hasCafe]);

  useEffect(() => {
    if (hasCafe === null) return;

    setStep(stepFromParams);
    window.scrollTo(0, 0);
  }, [stepFromParams, hasCafe]);

  const goToStep = (next: number) => {
    let safe = next;
    if (safe < 0) safe = 0;
    if (safe > LAST_STEP_INDEX) safe = LAST_STEP_INDEX;

    if (hasCafe && safe === 0) {
      safe = 1;
    }

    setStep(safe);
    setSearchParams({ step: String(safe) });
  };

  const handleNext = () => {
    if (step < LAST_STEP_INDEX) {
      goToStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 0) {
      navigate("/admin");
      return;
    }

    if (step === 1) {
      navigate(-1);
    } else {
      goToStep(step - 1);
    }
  };

  const renderStep = () => {
    const props = {
      onNext: handleNext,
      onBack: handleBack,
      setValid: () => {},
    };

    switch (step) {
      case 0:
        return <Step1DocumentGuide {...props} />;
      case 1:
        return <Step2BasicInfo {...props} />;
      case 2:
        return <Step3BusinessInfo {...props} />;
      case 3:
        return <Step4Menu {...props} />;
      case 4:
        return <Step5Stamp {...props} />;
      default:
        return null;
    }
  };

  if (hasCafe === null) return null;

  return (
    <div className="w-full min-h-screen bg-white font-suit">
      <div className="fixed top-0 left-0 w-full bg-white z-50">
        <div className="ml-[1.5rem]">
          <CommonHeader onBack={handleBack} title="" />
        </div>
        <StepProgress steps={stepLabels} currentStep={step} />
      </div>

      <AdminRegisterContentLayout>
        {renderStep()}
      </AdminRegisterContentLayout>
    </div>
  );
}

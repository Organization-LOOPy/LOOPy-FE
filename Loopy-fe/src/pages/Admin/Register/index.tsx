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
import { useAdminCafe } from "../../../contexts/AdminContext";

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
  const { activeCafeId } = useAdminCafe();

  //step 계산 로직 - activeCafeId 있으면 Step1(0) 접근 금지
  const stepFromParams = useMemo(() => {
    const raw = searchParams.get("step");
    const n = Number(raw);

    let step = Number.isFinite(n) ? n : 0; // URL의 step 값을 유효한 단계 번호로 정제
    if (step < 0) step = 0;
    if (step > LAST_STEP_INDEX) step = LAST_STEP_INDEX;

    // 이미 카페 있을 경우에는 Step1 건너뛰기
    if (activeCafeId && step === 0) {
      return 1;
    }

    return step;
  }, [searchParams, activeCafeId]);

  const [step, setStep] = useState<number>(() => {
    // 최초 진입 시 기본 step
    return activeCafeId ? 1 : 0;
  });

  const [_isStepValid, setIsStepValid] = useState(false);

  useEffect(() => {
    setStep(stepFromParams);
    setIsStepValid(false);
    window.scrollTo(0, 0);
  }, [stepFromParams]);

  const goToStep = (next: number) => {
    let safe = next; // 임시 변수 - 이동하려는 단계 값을 상태로 넣어도 안전한 값으로 보정
    if (safe < 0) safe = 0;
    if (safe > LAST_STEP_INDEX) safe = LAST_STEP_INDEX;

    if (activeCafeId && safe === 0) {
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
      setValid: setIsStepValid,
      cafeId: activeCafeId,
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
